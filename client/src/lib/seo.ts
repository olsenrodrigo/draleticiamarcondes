import { useEffect } from "react";
import { site } from "@/content/site";
import type { Meta } from "@/content/pages";
import { procedimentos } from "@/content/pages";
import {
  chavesDaRota,
  cidadesAtendidas,
  todasAsChaves,
  topicosDaClinica,
  variantesDeMarca,
} from "@/content/palavras-chave";
import { geoDaRota, type PerguntaGeo } from "@/content/geo";

const ID_JSONLD = "seo-jsonld";

function tag(seletor: string, cria: () => HTMLElement) {
  let el = document.head.querySelector<HTMLElement>(seletor);
  if (!el) {
    el = cria();
    document.head.appendChild(el);
  }
  return el;
}

function meta(atributo: "name" | "property", chave: string, valor: string) {
  const el = tag(`meta[${atributo}="${chave}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute(atributo, chave);
    return m;
  });
  el.setAttribute("content", valor);
}

export const urlDaRota = (path: string) => `${site.origin}${path === "/" ? "" : path}`;

/** Aplica title, description, canonical, Open Graph e JSON-LD da rota atual. */
export function useSeo(dados: Meta & { path: string; jsonLd?: unknown }) {
  const { title, description, path } = dados;
  const jsonLd = dados.jsonLd ? JSON.stringify(dados.jsonLd) : null;

  useEffect(() => {
    const url = urlDaRota(path);
    document.title = title;
    meta("name", "description", description);
    meta("property", "og:title", title);
    meta("property", "og:description", description);
    meta("property", "og:url", url);
    meta("property", "og:type", "website");
    meta("property", "og:locale", "pt_BR");
    meta("property", "og:site_name", site.name);
    meta("property", "og:image", `${site.origin}/opengraph.jpg`);
    meta("name", "twitter:title", title);
    meta("name", "twitter:description", description);

    const chaves = chavesDaRota(path);
    if (chaves.length) meta("name", "keywords", chaves.join(", "));

    const canonical = tag('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.rel = "canonical";
      return l;
    }) as HTMLLinkElement;
    canonical.href = url;
  }, [title, description, path]);

  useEffect(() => {
    document.getElementById(ID_JSONLD)?.remove();
    if (!jsonLd) return;
    const script = document.createElement("script");
    script.id = ID_JSONLD;
    script.type = "application/ld+json";
    script.textContent = jsonLd;
    document.head.appendChild(script);
    return () => script.remove();
  }, [jsonLd]);
}

/* ------------------------------------------------------------------ dados -- */

/**
 * Pin exato do Perfil da Empresa no Google, conferido em 04/09/2026.
 *
 * As coordenadas anteriores vinham do OpenStreetMap e tinham precisão de rua —
 * caíam **422 metros** fora da porta. Em busca local isso não é detalhe: a
 * distância até quem procura é critério de ordenação, e coordenada divergente
 * entre o site e o Perfil enfraquece a associação entre as duas entidades.
 */
export const coordenadas = { latitude: -23.0892152, longitude: -47.2199804 };

/**
 * O Perfil da Empresa no Google da clínica (5,0 ★ / 91 avaliações).
 *
 * Entra no `sameAs` da clínica: é o que diz ao Google, sem ambiguidade, que o
 * site e aquela ficha do Maps são a mesma entidade. Sem isso as duas vivem
 * separadas — a ficha ranqueia no mapa, o site não herda nada da reputação dela.
 *
 * A forma `?cid=` é a estável: não depende de nome nem de coordenada na URL.
 */
export const perfilGoogle = "https://maps.google.com/?cid=13027717339812848473";

/** Um único @id para a clínica em todas as páginas — consolida a entidade. */
const ID_CLINICA = `${site.origin}/#clinica`;
const ID_PESSOA = `${site.origin}/#leticia-marcondes`;
const ID_SITE = `${site.origin}/#site`;

/**
 * Data da última revisão clínica do conteúdo, em `lastReviewed`.
 *
 * Conteúdo de saúde é YMYL ("your money or your life") — o Google pesa quem
 * revisou e quando. Atualizar sempre que a Dra. Letícia revisar os textos;
 * uma data velha aqui é pior do que nenhuma, então não deixar apodrecer.
 */
const DATA_REVISAO = "2026-08-11";

const enderecoPostal = {
  "@type": "PostalAddress",
  streetAddress: "Rua 5 de Julho, 697 - Sala 2, Jardim Pau Preto",
  addressLocality: "Indaiatuba",
  addressRegion: "SP",
  postalCode: "13330-220",
  addressCountry: "BR",
};

/** A clínica atende em dois turnos — declarar assim evita "aberto" no almoço. */
const horarios = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "12:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "14:00",
    closes: "18:00",
  },
];

/**
 * Cada cidade apontando para o próprio verbete — todas as URLs conferidas (200).
 *
 * Sem isso, "Salto" e "Capivari" são só strings ambíguas: existe Salto no Paraná,
 * Capivari em Santa Catarina. Com o `sameAs`, o buscador e os motores generativos
 * sabem de qual município se trata e a clínica entra na área geográfica certa.
 */
const verbeteDaCidade: Record<string, string> = {
  Indaiatuba: "https://pt.wikipedia.org/wiki/Indaiatuba",
  Salto: "https://pt.wikipedia.org/wiki/Salto_(São_Paulo)",
  Itu: "https://pt.wikipedia.org/wiki/Itu",
  "Elias Fausto": "https://pt.wikipedia.org/wiki/Elias_Fausto",
  "Monte Mor": "https://pt.wikipedia.org/wiki/Monte_Mor",
  Capivari: "https://pt.wikipedia.org/wiki/Capivari",
  Campinas: "https://pt.wikipedia.org/wiki/Campinas",
};

export const pessoaSchema = {
  "@type": "Person",
  "@id": ID_PESSOA,
  name: "Letícia Marcondes",
  alternateName: "Dra. Letícia Marcondes",
  jobTitle: "Cirurgiã-Dentista",
  identifier: site.cro,
  url: `${site.origin}/sobre`,
  worksFor: { "@id": ID_CLINICA },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidade Federal de Alfenas (UNIFAL-MG)",
  },
  knowsAbout: [
    "Reabilitação oral",
    "Odontologia estética",
    "Cirurgia oral menor",
    "Prótese dentária",
    "Dentística",
  ],
  sameAs: [site.instagram],
};

/** Entidade da clínica — base do schema de todas as páginas. */
export const dentistSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": ID_CLINICA,
  name: site.name,
  alternateName: variantesDeMarca,
  description:
    "Clínica odontológica em Indaiatuba/SP especializada em reabilitação oral, implantes dentários, próteses e odontologia estética, com diagnóstico detalhado e planejamento individualizado.",
  url: site.origin,
  image: `${site.origin}/opengraph.jpg`,
  logo: `${site.origin}/favicon.png`,
  telephone: `+${site.whatsapp}`,
  email: site.email,
  founder: { "@id": ID_PESSOA },
  employee: { "@id": ID_PESSOA },
  address: enderecoPostal,
  geo: { "@type": "GeoCoordinates", ...coordenadas },
  hasMap: perfilGoogle,
  areaServed: cidadesAtendidas.map((cidade) => ({
    "@type": "City",
    name: cidade,
    addressRegion: "SP",
    addressCountry: "BR",
    ...(verbeteDaCidade[cidade] ? { sameAs: verbeteDaCidade[cidade] } : {}),
  })),
  // `knowsAbout` = tópicos; `keywords` = termos de busca. Trocar os dois de lugar
  // é o erro mais comum de JSON-LD em site de clínica.
  knowsAbout: topicosDaClinica,
  keywords: todasAsChaves.join(", "),
  sameAs: [perfilGoogle, site.instagram],
  medicalSpecialty: [
    "Reabilitação Oral",
    "Implantes Dentários",
    "Odontologia Estética",
    "Ortodontia",
    "Endodontia",
  ],
  availableService: procedimentos.map((p) => ({
    "@type": "MedicalProcedure",
    name: p.card,
    url: urlDaRota(p.path),
  })),
  openingHoursSpecification: horarios,
  paymentAccepted: "Particular",
  currenciesAccepted: "BRL",
  isAcceptingNewPatients: true,
};

export const siteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": ID_SITE,
  url: site.origin,
  name: site.name,
  inLanguage: "pt-BR",
  publisher: { "@id": ID_CLINICA },
};

export const faqSchema = (itens: PerguntaGeo[], path?: string) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  ...(path ? { "@id": `${urlDaRota(path)}#faq` } : {}),
  inLanguage: "pt-BR",
  about: { "@id": ID_CLINICA },
  mainEntity: itens.map((item) => ({
    "@type": "Question",
    name: item.pergunta,
    acceptedAnswer: { "@type": "Answer", text: item.resposta },
  })),
});

/**
 * A página como entidade própria, com quem a revisou e quando.
 *
 * `MedicalWebPage` + `reviewedBy` + `lastReviewed` é o par que sinaliza autoria
 * clínica em conteúdo de saúde. Sem isso, o texto é só texto: o buscador não
 * tem como saber que uma cirurgiã-dentista inscrita no CRO respondeu por ele.
 * O `description` usa o resumo do bloco GEO quando existe — é a frase escrita
 * justamente para ser citada — e cai no meta description quando não existe.
 */
export const paginaSchema = (
  path: string,
  title: string,
  description: string,
  { medica = true }: { medica?: boolean } = {},
) => {
  const url = urlDaRota(path);
  const geo = geoDaRota(path);
  return {
    "@type": medica ? "MedicalWebPage" : "WebPage",
    "@id": `${url}#pagina`,
    url,
    name: title,
    description: geo?.resumo ?? description,
    inLanguage: "pt-BR",
    isPartOf: { "@id": ID_SITE },
    about: { "@id": ID_CLINICA },
    primaryImageOfPage: `${site.origin}/opengraph.jpg`,
    lastReviewed: DATA_REVISAO,
    reviewedBy: { "@id": ID_PESSOA },
    publisher: { "@id": ID_CLINICA },
    ...(medica ? { audience: { "@type": "Patient" } } : {}),
  };
};

export const servicoSchema = (
  nome: string,
  descricao: string,
  path: string,
  duvida?: { titulo: string; texto: string; pergunta?: string },
) => {
  const geo = geoDaRota(path);
  const partes: unknown[] = [
    {
      "@type": "MedicalProcedure",
      "@id": `${urlDaRota(path)}#procedimento`,
      name: nome,
      // O resumo GEO é mais específico e mais citável que o meta description.
      description: geo?.resumo ?? descricao,
      url: urlDaRota(path),
      procedureType: "https://schema.org/TherapeuticProcedure",
      bodyLocation: "Boca",
      provider: { "@id": ID_CLINICA },
      keywords: chavesDaRota(path).join(", "),
    },
    dentistSchema,
  ];

  // As perguntas da página viram um FAQPage só. Vêm de duas origens: o bloco
  // "dúvida comum" da copy aprovada e o FAQ escrito para GEO em `content/geo.ts`.
  // Marcá-las como Question as torna elegíveis a resposta direta na busca e dá
  // aos motores generativos um par pergunta/resposta pronto para citar.
  const perguntas: PerguntaGeo[] = [
    ...(duvida ? [{ pergunta: duvida.pergunta ?? duvida.titulo, resposta: duvida.texto }] : []),
    ...(geo?.faq ?? []),
  ];
  // A mesma pergunta pode chegar pelos dois caminhos (o caso do "pino ou implante").
  const vistas = new Set<string>();
  const unicas = perguntas.filter((p) => {
    const chave = p.pergunta.toLowerCase();
    if (vistas.has(chave)) return false;
    vistas.add(chave);
    return true;
  });
  if (unicas.length) partes.push(faqSchema(unicas, path));

  return grafo(...partes);
};

/** Reflete as migalhas visuais — ajuda o Google a montar a trilha no resultado. */
export const trilhaSchema = (itens: { path: string; nome: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ path: "/", nome: "Início" }, ...itens].map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.nome,
    item: urlDaRota(item.path),
  })),
});

/**
 * Junta vários schemas num @graph só. Achata partes que já são um @graph
 * (`servicoSchema` devolve um) — um nó "@graph dentro de @graph" fica sem
 * @type e os validadores ignoram tudo que estiver dentro dele.
 */
export const grafo = (...partes: unknown[]) => {
  const nos: Record<string, unknown>[] = [];
  const achatar = (parte: unknown) => {
    const { "@context": _ignorado, ...resto } = parte as Record<string, unknown>;
    if (Array.isArray(resto["@graph"])) {
      (resto["@graph"] as unknown[]).forEach(achatar);
      return;
    }
    nos.push(resto);
  };
  partes.forEach(achatar);
  // o mesmo @id pode chegar por caminhos diferentes (a clínica, por exemplo)
  const vistos = new Set<string>();
  const unicos = nos.filter((no) => {
    const id = typeof no["@id"] === "string" ? (no["@id"] as string) : null;
    if (!id) return true;
    if (vistos.has(id)) return false;
    vistos.add(id);
    return true;
  });
  return { "@context": "https://schema.org", "@graph": unicos };
};
