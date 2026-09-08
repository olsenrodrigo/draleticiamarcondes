import { build as viteBuild } from "vite";
import { readFile, writeFile, rm, mkdir } from "fs/promises";
import path from "path";
import react from "@vitejs/plugin-react";

/**
 * Gera um HTML estático por rota, além de sitemap.xml e llms.txt.
 *
 * Roda depois do build normal do cliente: monta um bundle SSR de
 * `client/src/entry-ssr.tsx`, importa esse bundle no Node e injeta o resultado
 * dentro do `index.html` já produzido pelo Vite (que tem os hashes dos assets).
 */

const RAIZ = process.cwd();
const PUBLICO = path.resolve(RAIZ, "dist/public");
const TEMP = path.resolve(RAIZ, "dist/ssr");

async function bundleSsr() {
  await viteBuild({
    configFile: false,
    logLevel: "warn",
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(RAIZ, "client", "src"),
        "@shared": path.resolve(RAIZ, "shared"),
        "@assets": path.resolve(RAIZ, "attached_assets"),
      },
    },
    build: {
      ssr: path.resolve(RAIZ, "client/src/entry-ssr.tsx"),
      outDir: TEMP,
      emptyOutDir: true,
      copyPublicDir: false,
      rollupOptions: { output: { entryFileNames: "entry-ssr.mjs", format: "es" } },
    },
    // No SSR os imports de imagem viram só a URL final; o CSS não é necessário
    // porque o HTML estático reaproveita a folha de estilo do build do cliente.
    ssr: { noExternal: true },
  });
}

/** `/` -> index.html ; `/sobre` -> sobre.html (URL limpa, sem barra final). */
const arquivoDaRota = (rota: string) =>
  rota === "/" ? "index.html" : `${rota.replace(/^\//, "")}.html`;

export async function gerar() {
  console.log("pre-renderizando rotas...");
  await bundleSsr();

  const { renderizarRota, caminhos, origem, llmsTxt, respostasPorRota } = (await import(
    path.join(TEMP, "entry-ssr.mjs")
  )) as {
    renderizarRota: (p: string) => { corpo: string; cabeca: string };
    caminhos: string[];
    origem: string;
    llmsTxt: string;
    respostasPorRota: Record<string, string[]>;
  };

  const molde = await readFile(path.join(PUBLICO, "index.html"), "utf-8");

  for (const rota of caminhos) {
    const { corpo, cabeca } = renderizarRota(rota);
    let html = molde;

    // troca title/description/canonical/OG do molde pelos da rota
    html = html
      .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
      .replace(/[ \t]*<meta\s+name="description"[\s\S]*?\/>\s*/i, "")
      .replace(/[ \t]*<link\s+rel="canonical"[^>]*>\s*/i, "")
      .replace(/[ \t]*<meta\s+(property="og:|name="twitter:)[\s\S]*?\/>\s*/gi, "")
      .replace("</head>", `  ${cabeca}\n  </head>`);

    // `data-prerender` avisa o main.tsx para hidratar em vez de recriar a árvore
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root" data-prerender="true">${corpo}</div>`,
    );

    const destino = path.join(PUBLICO, arquivoDaRota(rota));
    await mkdir(path.dirname(destino), { recursive: true });
    await writeFile(destino, html, "utf-8");
    console.log(`  ${rota} -> ${path.relative(PUBLICO, destino)}`);
  }

  await conferirRespostas(caminhos, respostasPorRota);
  await gerarSitemap(caminhos, origem);
  await writeFile(path.join(PUBLICO, "llms.txt"), llmsTxt, "utf-8");
  await rm(TEMP, { recursive: true, force: true });
  console.log(`pre-renderizadas ${caminhos.length} rotas + sitemap.xml + llms.txt`);
}

/** Texto visível de um HTML, sem script/style e sem as tags. */
const textoVisivel = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ");

/**
 * Trava de regressão: toda resposta de FAQ tem de estar como texto no HTML.
 *
 * Existiu de verdade — o acordeão do Radix desmontava o conteúdo fechado, e o
 * site publicou 53 pares pergunta/resposta (~2.400 palavras) que nenhum crawler
 * enxergava: para GPTBot, ClaudeBot, PerplexityBot e o crawler de IA do Google
 * as páginas só tinham as perguntas. O JSON-LD escondia o estrago, porque o
 * FAQPage continuava correto enquanto a página visível estava vazia.
 *
 * Comparar o texto renderizado com o conteúdo de origem é o que impede isso de
 * voltar sem ninguém perceber. Falhar o build é proposital: publicar a versão
 * quebrada custa semanas de indexação.
 */
async function conferirRespostas(
  caminhos: string[],
  respostasPorRota: Record<string, string[]>,
) {
  const faltando: string[] = [];
  let conferidas = 0;

  for (const rota of caminhos) {
    const esperadas = respostasPorRota[rota] ?? [];
    if (!esperadas.length) continue;

    const html = await readFile(path.join(PUBLICO, arquivoDaRota(rota)), "utf-8");
    const texto = textoVisivel(html);

    for (const resposta of esperadas) {
      conferidas++;
      // compara pelo começo: basta para detectar conteúdo ausente e não quebra
      // por diferença de espaço ou pontuação no meio de um parágrafo longo
      const trecho = resposta.replace(/\s+/g, " ").slice(0, 60);
      if (!texto.includes(trecho)) faltando.push(`${rota} -> "${trecho}..."`);
    }
  }

  if (faltando.length) {
    throw new Error(
      `${faltando.length} de ${conferidas} respostas de FAQ nao estao no HTML ` +
        `pre-renderizado. Elas ficam invisiveis para buscadores e para motores ` +
        `de IA. Provavel causa: um componente que so renderiza o conteudo apos ` +
        `interacao do usuario.\n  ${faltando.join("\n  ")}`,
    );
  }

  console.log(`  ${conferidas} respostas de FAQ conferidas no HTML`);
}

async function gerarSitemap(caminhos: string[], origem: string) {
  const hoje = new Date().toISOString().slice(0, 10);

  // As quatro rotas-alvo da clínica ficam em 0.9; o resto em 0.8. A prioridade
  // é dica fraca para o Google, mas é lida por outros crawlers e não custa nada
  // manter coerente com `content/palavras-chave.ts`.
  const prioritarias = [
    "/reabilitacao-oral",
    "/odontologia-estetica",
    "/dentista-em-indaiatuba",
  ];
  const prioridade = (r: string) =>
    r === "/" ? "1.0" : prioritarias.includes(r) ? "0.9" : "0.8";

  // Páginas de serviço mudam pouco; a home e a de contato mudam mais.
  const frequencia = (r: string) => (r === "/" || r === "/contato" ? "weekly" : "monthly");

  const urls = caminhos
    .map(
      (r) =>
        `  <url>\n    <loc>${origem}${r}</loc>\n` +
        `    <lastmod>${hoje}</lastmod>\n    <changefreq>${frequencia(r)}</changefreq>\n` +
        `    <priority>${prioridade(r)}</priority>\n  </url>`,
    )
    .join("\n");

  await writeFile(
    path.join(PUBLICO, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    "utf-8",
  );
}

// permite rodar isolado: `npx tsx script/prerender.ts` (depois de um build)
if (process.argv[1]?.endsWith("prerender.ts")) {
  gerar().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
