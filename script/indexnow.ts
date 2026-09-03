import { readFile } from "fs/promises";
import path from "path";

/**
 * Avisa Bing, Yandex e Seznam de que as URLs mudaram (protocolo IndexNow).
 *
 * Por que importa aqui: a busca do ChatGPT é servida pelo índice do Bing. Um
 * domínio novo pode levar semanas até o Bing passar sozinho, e enquanto ele não
 * passa a clínica não existe para o ChatGPT — por melhor que o HTML esteja. O
 * IndexNow encurta isso de semanas para horas, e é o único canal de submissão
 * que aceita chamada direta, sem painel e sem login.
 *
 * O Google NÃO usa IndexNow: lá o caminho é o Search Console (ver SEO.md).
 *
 * Uso, depois de publicar:  npx tsx script/indexnow.ts
 */

const CHAVE = "a57df01247021f1eeb82d0a22806cca7";
const HOST = "lemarcodontologia.com.br";

async function avisar() {
  // O sitemap recém-gerado é a lista boa: nasce das rotas registradas, então
  // nunca avisa uma URL que o build não produziu.
  const sitemap = await readFile(
    path.resolve(process.cwd(), "dist/public/sitemap.xml"),
    "utf-8",
  );
  const urls = (sitemap.match(/<loc>[^<]+<\/loc>/g) ?? []).map((tag) =>
    tag.replace(/<\/?loc>/g, ""),
  );

  if (!urls.length) {
    throw new Error("Nenhuma URL no sitemap. Rode `npm run build` antes.");
  }

  // A chave precisa estar acessível em https://HOST/CHAVE.txt — o serviço busca
  // esse arquivo para confirmar que quem avisou controla mesmo o domínio.
  const urlDaChave = `https://${HOST}/${CHAVE}.txt`;
  const conferindo = await fetch(urlDaChave);
  const conteudo = conferindo.ok ? (await conferindo.text()).trim() : "";
  if (conteudo !== CHAVE) {
    throw new Error(
      `A chave nao esta publicada em ${urlDaChave} (recebido: ${conferindo.status}). ` +
        `Publique o dist/ atualizado antes de avisar.`,
    );
  }

  const resposta = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: CHAVE,
      keyLocation: urlDaChave,
      urlList: urls,
    }),
  });

  // 200 e 202 são os dois "aceito"; 202 quer dizer "recebido, chave em validação".
  if (resposta.status !== 200 && resposta.status !== 202) {
    throw new Error(`IndexNow respondeu ${resposta.status}: ${await resposta.text()}`);
  }
  console.log(`IndexNow: ${urls.length} URLs enviadas (HTTP ${resposta.status})`);
}

avisar().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
