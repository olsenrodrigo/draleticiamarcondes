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

  app.use(express.static(distPath));

  // Cada rota tem um HTML pré-renderizado (`/sobre` -> `sobre.html`). Servir esse
  // arquivo mantém a URL limpa, sem a barra final que o express.static
  // acrescentaria se as páginas fossem diretórios — e entrega o HTML pronto para
  // crawlers que não executam JavaScript.
  app.get("/{*path}", (req, res) => {
    const rota = req.path.replace(/^\/+|\/+$/g, "");
    if (rota) {
      const estatico = path.resolve(distPath, `${rota}.html`);
      if (estatico.startsWith(distPath) && fs.existsSync(estatico)) {
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
