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
import { site } from "@/content/site";
import {
  dentistSchema,
  faqSchema,
  grafo,
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
 */
export const rotas: Rota[] = [
  {
    ...home.meta,
    path: home.path,
    jsonLd: grafo(dentistSchema, siteSchema),
  },
  {
    ...sobre.meta,
    path: sobre.path,
    jsonLd: grafo(
      dentistSchema,
      pessoaSchema,
      trilhaSchema([{ path: sobre.path, nome: "Sobre" }]),
    ),
  },
  {
    ...reabilitacao.meta,
    path: reabilitacao.path,
    jsonLd: grafo(
      servicoSchema("Reabilitação Oral", reabilitacao.meta.description, reabilitacao.path),
      trilhaSchema([{ path: reabilitacao.path, nome: "Reabilitação Oral" }]),
    ),
  },
  ...procedimentos.map((p) => ({
    ...p.meta,
    path: p.path,
    jsonLd: grafo(
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
    jsonLd: grafo(
      dentistSchema,
      trilhaSchema([{ path: diferenciais.path, nome: "Diferenciais" }]),
    ),
  },
  {
    ...indaiatuba.meta,
    path: indaiatuba.path,
    jsonLd: grafo(
      dentistSchema,
      trilhaSchema([{ path: indaiatuba.path, nome: "Dentista em Indaiatuba" }]),
    ),
  },
  {
    ...faq.meta,
    path: faq.path,
    jsonLd: grafo(
      faqSchema(faq.itens),
      trilhaSchema([{ path: faq.path, nome: "Perguntas frequentes" }]),
    ),
  },
  {
    ...contato.meta,
    path: contato.path,
    jsonLd: grafo(dentistSchema, trilhaSchema([{ path: contato.path, nome: "Contato" }])),
  },
  // Só entra quando a clínica autorizar os depoimentos: aí a rota passa a ser
  // pré-renderizada, entra no sitemap e para de cair no 404 do servidor.
  ...(site.showTestimonials
    ? [
        {
          ...depoimentos.meta,
          path: depoimentos.path,
          jsonLd: grafo(
            dentistSchema,
            trilhaSchema([{ path: depoimentos.path, nome: "Depoimentos" }]),
          ),
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
