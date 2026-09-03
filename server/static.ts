import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Sem isto o express.static manda `max-age=0` em tudo — inclusive nos arquivos
  // de /assets, que já trazem hash de conteúdo no nome e nunca mudam sem mudar
  // de nome. O efeito é o visitante rebaixar 500 KB de JS/CSS a cada página, o
  // que aparece direto no LCP/INP e, por tabela, no Core Web Vitals.
  const UM_ANO = 31536000;
  const UMA_SEMANA = 604800;
  const UMA_HORA = 3600;

  app.use(
    express.static(distPath, {
      etag: true,
      lastModified: true,
      setHeaders: (res, caminho) => {
        if (caminho.includes(`${path.sep}assets${path.sep}`)) {
          // nome com hash: pode ficar guardado para sempre
          res.setHeader("Cache-Control", `public, max-age=${UM_ANO}, immutable`);
        } else if (/\.html$/.test(caminho)) {
          // o HTML é o que carrega os hashes novos: sempre revalidar
          res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
        } else if (/\.(png|jpg|jpeg|svg|webp|avif|ico|woff2?)$/.test(caminho)) {
          // favicon, opengraph.jpg e afins: nome fixo, conteúdo estável
          res.setHeader("Cache-Control", `public, max-age=${UMA_SEMANA}`);
        } else {
          // robots.txt, sitemap.xml, llms.txt: precisam propagar rápido
          res.setHeader("Cache-Control", `public, max-age=${UMA_HORA}`);
        }
      },
    }),
  );

  // Cada rota tem um HTML pré-renderizado (`/sobre` -> `sobre.html`). Servir esse
  // arquivo mantém a URL limpa, sem a barra final que o express.static
  // acrescentaria se as páginas fossem diretórios — e entrega o HTML pronto para
  // crawlers que não executam JavaScript.
  app.get("/{*path}", (req, res) => {
    const rota = req.path.replace(/^\/+|\/+$/g, "");
    if (rota) {
      const estatico = path.resolve(distPath, `${rota}.html`);
      if (estatico.startsWith(distPath) && fs.existsSync(estatico)) {
        res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
        return res.sendFile(estatico);
      }
    }
    // Rota desconhecida: a SPA assume e renderiza a página 404 — mas o status
    // precisa ser 404 de verdade, senão o Google trata como "soft 404" e
    // mantém a URL no índice. Toda rota indexável tem HTML próprio e cai no
    // ramo acima; se uma rota nova responder 404 aqui, falta registrá-la em
    // `client/src/content/rotas.ts`.
    res.status(404).sendFile(path.resolve(distPath, "index.html"));
  });
}
