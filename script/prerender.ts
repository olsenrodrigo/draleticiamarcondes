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

  const { renderizarRota, caminhos, origem, llmsTxt } = (await import(
    path.join(TEMP, "entry-ssr.mjs")
  )) as {
    renderizarRota: (p: string) => { corpo: string; cabeca: string };
    caminhos: string[];
    origem: string;
    llmsTxt: string;
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

  await gerarSitemap(caminhos, origem);
  await writeFile(path.join(PUBLICO, "llms.txt"), llmsTxt, "utf-8");
  await rm(TEMP, { recursive: true, force: true });
  console.log(`pre-renderizadas ${caminhos.length} rotas + sitemap.xml + llms.txt`);
}

async function gerarSitemap(caminhos: string[], origem: string) {
  const hoje = new Date().toISOString().slice(0, 10);
  const prioridade = (r: string) =>
    r === "/" ? "1.0" : ["/reabilitacao-oral", "/dentista-em-indaiatuba"].includes(r) ? "0.9" : "0.8";

  const urls = caminhos
    .map(
      (r) =>
        `  <url>\n    <loc>${origem}${r === "/" ? "" : r}</loc>\n` +
        `    <lastmod>${hoje}</lastmod>\n    <priority>${prioridade(r)}</priority>\n  </url>`,
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
