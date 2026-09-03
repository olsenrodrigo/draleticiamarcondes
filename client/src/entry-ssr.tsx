import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";
import { rotas } from "@/content/rotas";
import { site } from "@/content/site";
import { faq, procedimentos } from "@/content/pages";
import { chavesDaRota, cidadesAtendidas } from "@/content/palavras-chave";
import { fichaClinica, geoDaRota } from "@/content/geo";
import { urlDaRota } from "@/lib/seo";

/**
 * Entrada usada só no build, por `script/prerender.ts`.
 *
 * Motivo: buscadores de IA (GPTBot, ClaudeBot, PerplexityBot…) e vários
 * validadores não executam JavaScript. Sem HTML estático eles veem apenas
 * `<div id="root"></div>` e o site fica invisível para respostas geradas.
 */

const escapar = (texto: string) =>
  texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function renderizarRota(path: string) {
  const dados = rotas.find((r) => r.path === path);
  if (!dados) throw new Error(`Rota sem registro: ${path}`);

  const corpo = renderToString(
    <Router ssrPath={path}>
      <App />
    </Router>,
  );

  const url = urlDaRota(path);
  const chaves = chavesDaRota(path);
  const cabeca = [
    `<title>${escapar(dados.title)}</title>`,
    `<meta name="description" content="${escapar(dados.description)}" />`,
    chaves.length ? `<meta name="keywords" content="${escapar(chaves.join(", "))}" />` : "",
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${escapar(dados.title)}" />`,
    `<meta property="og:description" content="${escapar(dados.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:site_name" content="${escapar(site.name)}" />`,
    `<meta property="og:image" content="${site.origin}/opengraph.jpg" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapar(dados.title)}" />`,
    `<meta name="twitter:description" content="${escapar(dados.description)}" />`,
    `<meta name="twitter:image" content="${site.origin}/opengraph.jpg" />`,
    dados.jsonLd
      ? `<script type="application/ld+json" id="seo-jsonld">${JSON.stringify(dados.jsonLd).replace(/</g, "\\u003c")}</script>`
      : "",
  ]
    .filter(Boolean)
    .join("\n    ");

  return { corpo, cabeca };
}

export const caminhos = rotas.map((r) => r.path);
export const origem = site.origin;

/**
 * Todas as respostas que precisam existir como texto no HTML de cada rota.
 *
 * Serve de gabarito para a conferência do build (`script/prerender.ts`): se um
 * componente voltar a esconder a resposta atrás de JavaScript — como fazia o
 * acordeão do Radix, que desmontava o conteúdo fechado — o build quebra em vez
 * de publicar em silêncio uma página vazia para os buscadores.
 */
export const respostasPorRota: Record<string, string[]> = Object.fromEntries(
  rotas.map((r) => [
    r.path,
    [
      ...(r.path === faq.path ? faq.itens : []),
      ...(geoDaRota(r.path)?.faq ?? []),
    ].map((item) => item.resposta),
  ]),
);

/**
 * `llms.txt` — convenção emergente: um resumo em markdown, sem navegação nem
 * script, que motores generativos conseguem ler direto. Aqui ele é montado a
 * partir do mesmo conteúdo do site, então nunca descola da copy aprovada.
 */
export const llmsTxt = [
  `# ${site.name}`,
  "",
  `> Clínica odontológica em ${site.address.city}/${site.address.state} especializada em`,
  "> reabilitação oral, implantes dentários, próteses e odontologia estética.",
  `> Responsável técnica: ${site.doctor} — ${site.cro}.`,
  "",
  "## Dados da clínica",
  "",
  // A ficha vem do mesmo lugar que a versão visível do site — se um dia
  // divergirem, é bug. NAP inconsistente entre fontes derruba SEO local.
  ...fichaClinica.map((linha) => `- ${linha.rotulo}: ${linha.valor}`),
  `- E-mail: ${site.email}`,
  `- Instagram: ${site.instagram}`,
  `- Site: ${site.origin}`,
  "",
  "## Profissional responsável",
  "",
  `${site.doctor} (${site.cro}), formada em Odontologia pela Universidade Federal de`,
  "Alfenas (UNIFAL-MG) em 2019, cursando especialização em Prótese e Dentística no",
  "São Leopoldo Mandic (Campinas). Recebe e avalia pessoalmente cada paciente,",
  "conduzindo o diagnóstico e o planejamento; os demais especialistas da equipe",
  "executam as etapas de suas áreas: Dr. Rick (implantes), Dra. Juliana",
  "(endodontia) e Dra. Lara (ortodontia e Invisalign).",
  "",
  "## Páginas",
  "",
  // Cada página com o resumo escrito para citação, quando existir — é mais
  // específico e mais útil ao leitor automático do que o meta description.
  ...rotas.flatMap((r) => {
    const resumo = geoDaRota(r.path)?.resumo ?? r.description;
    return [`- [${r.title}](${urlDaRota(r.path)}): ${resumo}`];
  }),
  "",
  "## Tratamentos",
  "",
  ...procedimentos.map((p) => `- ${p.card} (${urlDaRota(p.path)}): ${p.resumo}.`),
  "",
  "## Perguntas frequentes",
  "",
  // Todas as perguntas do site num lugar só: as de tratamento (copy aprovada)
  // e as escritas por página em `content/geo.ts`, sem repetir.
  ...(() => {
    const vistas = new Set<string>();
    const linhas: string[] = [];
    const juntar = (itens: { pergunta: string; resposta: string }[], origem?: string) => {
      for (const item of itens) {
        const chave = item.pergunta.toLowerCase();
        if (vistas.has(chave)) continue;
        vistas.add(chave);
        linhas.push(`### ${item.pergunta}`, "", item.resposta, "");
        if (origem) linhas.push(`Fonte: ${origem}`, "");
      }
    };
    juntar(faq.itens, urlDaRota(faq.path));
    for (const r of rotas) {
      juntar(geoDaRota(r.path)?.faq ?? [], urlDaRota(r.path));
    }
    return linhas;
  })(),
  "## Observações",
  "",
  "- O site não divulga valores de procedimentos: cada caso passa por avaliação",
  "  presencial antes de qualquer indicação ou orçamento.",
  "- A avaliação inicial é paga e inclui exame clínico completo, análise de",
  "  imagens e planejamento inicial do caso.",
  "- A clínica não atende convênios nem planos odontológicos.",
  `- Atendimento com hora marcada, ${site.hours.toLowerCase()}.`,
  `- Cidades atendidas: ${cidadesAtendidas.join(", ")}.`,
].join("\n");
