import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";
import { rotas } from "@/content/rotas";
import { site } from "@/content/site";
import { faq, procedimentos } from "@/content/pages";
import { chavesDaRota, cidadesAtendidas } from "@/content/palavras-chave";
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
  `- Endereço: ${site.address.full}`,
  `- Horário: ${site.hours}`,
  `- WhatsApp: ${site.whatsappDisplay}`,
  `- E-mail: ${site.email}`,
  `- Instagram: ${site.instagram}`,
  "- Atendimento exclusivamente particular (não atende convênio).",
  `- Cidades atendidas: ${cidadesAtendidas.join(", ")}.`,
  "",
  "## Profissional responsável",
  "",
  `${site.doctor} (${site.cro}), formada em Odontologia pela Universidade Federal de`,
  "Alfenas (UNIFAL-MG) em 2019, cursando especialização em Prótese e Dentística no",
  "São Leopoldo Mandic (Campinas). Recebe e avalia pessoalmente cada paciente,",
  "conduzindo o diagnóstico e o planejamento; os demais especialistas da equipe",
  "executam as etapas de suas áreas.",
  "",
  "## Páginas",
  "",
  ...rotas.map((r) => `- [${r.title}](${urlDaRota(r.path)}): ${r.description}`),
  "",
  "## Tratamentos",
  "",
  ...procedimentos.map((p) => `- ${p.card} (${urlDaRota(p.path)}): ${p.resumo}.`),
  "",
  "## Perguntas frequentes",
  "",
  ...faq.itens.flatMap((item) => [`### ${item.pergunta}`, "", item.resposta, ""]),
  "## Observações",
  "",
  "- O site não divulga valores de procedimentos: cada caso passa por avaliação",
  "  presencial antes de qualquer indicação ou orçamento.",
  "- A avaliação inicial é paga e inclui exame clínico completo, análise de",
  "  imagens e planejamento inicial do caso.",
].join("\n");
