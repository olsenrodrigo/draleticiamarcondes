import type { Meta } from "@/content/pages";
import {
  contato,
  depoimentos,
  diferenciais,
  faq,
  home,
  indaiatuba,
  procedimentos,
  reabilitacao,
  sobre,
} from "@/content/pages";
import { perguntasDaRota } from "@/content/geo";
import { site } from "@/content/site";
import {
  dentistSchema,
  faqSchema,
  grafo,
  paginaSchema,
  pessoaSchema,
  servicoSchema,
  siteSchema,
  trilhaSchema,
} from "@/lib/seo";

export type Rota = Meta & { path: string; jsonLd?: unknown };

/**
 * Registro único das rotas indexáveis: é a fonte tanto do `useSeo` de cada
 * página quanto da pré-renderização em `script/prerender.ts`. Manter os dois
 * lendo daqui evita que o HTML estático descole do que a SPA aplica.
 *
 * Toda rota carrega, no mínimo:
 *   - `paginaSchema`  — a página como entidade, com data de revisão e revisor
 *   - a entidade da clínica (direta ou via `servicoSchema`)
 *   - `trilhaSchema`  — migalhas, quando a rota não é a home
 *   - `faqSchema`     — quando a rota tem perguntas em `content/geo.ts`
 */

/** Monta o JSON-LD de uma rota comum (não-procedimento) sem repetir boilerplate. */
const paginaComum = (
  path: string,
  meta: Meta,
  trilha: { path: string; nome: string }[],
  ...extras: unknown[]
) => {
  const perguntas = perguntasDaRota(path);
  return grafo(
    paginaSchema(path, meta.title, meta.description),
    dentistSchema,
    ...(trilha.length ? [trilhaSchema(trilha)] : []),
    ...(perguntas.length ? [faqSchema(perguntas, path)] : []),
    ...extras,
  );
};

export const rotas: Rota[] = [
  {
    ...home.meta,
    path: home.path,
    jsonLd: paginaComum(home.path, home.meta, [], siteSchema, pessoaSchema),
  },
  {
    ...sobre.meta,
    path: sobre.path,
    jsonLd: paginaComum(
      sobre.path,
      sobre.meta,
      [{ path: sobre.path, nome: "Sobre" }],
      pessoaSchema,
    ),
  },
  {
    ...reabilitacao.meta,
    path: reabilitacao.path,
    jsonLd: grafo(
      paginaSchema(reabilitacao.path, reabilitacao.meta.title, reabilitacao.meta.description),
      servicoSchema("Reabilitação Oral", reabilitacao.meta.description, reabilitacao.path),
      trilhaSchema([{ path: reabilitacao.path, nome: "Reabilitação Oral" }]),
    ),
  },
  ...procedimentos.map((p) => ({
    ...p.meta,
    path: p.path,
    jsonLd: grafo(
      paginaSchema(p.path, p.meta.title, p.meta.description),
      servicoSchema(p.card, p.meta.description, p.path, p.destaque),
      trilhaSchema([
        { path: reabilitacao.path, nome: "Reabilitação Oral" },
        { path: p.path, nome: p.nav },
      ]),
    ),
  })),
  {
    ...diferenciais.meta,
    path: diferenciais.path,
    jsonLd: paginaComum(diferenciais.path, diferenciais.meta, [
      { path: diferenciais.path, nome: "Diferenciais" },
    ]),
  },
  {
    ...indaiatuba.meta,
    path: indaiatuba.path,
    jsonLd: paginaComum(indaiatuba.path, indaiatuba.meta, [
      { path: indaiatuba.path, nome: "Dentista em Indaiatuba" },
    ]),
  },
  {
    ...faq.meta,
    path: faq.path,
    jsonLd: grafo(
      paginaSchema(faq.path, faq.meta.title, faq.meta.description),
      faqSchema(faq.itens, faq.path),
      dentistSchema,
      trilhaSchema([{ path: faq.path, nome: "Perguntas frequentes" }]),
    ),
  },
  {
    ...contato.meta,
    path: contato.path,
    jsonLd: paginaComum(contato.path, contato.meta, [{ path: contato.path, nome: "Contato" }]),
  },
  // Só entra quando a clínica autorizar os depoimentos: aí a rota passa a ser
  // pré-renderizada, entra no sitemap e para de cair no 404 do servidor.
  ...(site.showTestimonials
    ? [
        {
          ...depoimentos.meta,
          path: depoimentos.path,
          jsonLd: paginaComum(depoimentos.path, depoimentos.meta, [
            { path: depoimentos.path, nome: "Depoimentos" },
          ]),
        },
      ]
    : []),
];

const porPath = new Map(rotas.map((r) => [r.path, r]));

/** Lança se a rota não estiver registrada — assim uma rota nova não passa batido. */
export const rota = (path: string): Rota => {
  const encontrada = porPath.get(path);
  if (!encontrada) throw new Error(`Rota sem registro de SEO: ${path}`);
  return encontrada;
};
