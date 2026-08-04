import { useEffect } from "react";
import { site } from "@/content/site";
import type { Meta } from "@/content/pages";
import { procedimentos } from "@/content/pages";
import {
  chavesDaRota,
  cidadesAtendidas,
  todasAsChaves,
  variantesDeMarca,
} from "@/content/palavras-chave";

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
 * Coordenadas do trecho da Rua Cinco de Julho no Jardim Pau Preto / Centro
 * (OpenStreetMap; o CEP 13330-220 resolve para "Centro" na base dos Correios).
 * É precisão de RUA, não de porta.
 * TODO: substituir pelo pin exato do Perfil da Empresa no Google quando existir.
 */
export const coordenadas = { latitude: -23.0859283, longitude: -47.2179317 };

/** Um único @id para a clínica em todas as páginas — consolida a entidade. */
const ID_CLINICA = `${site.origin}/#clinica`;
const ID_PESSOA = `${site.origin}/#leticia-marcondes`;
const ID_SITE = `${site.origin}/#site`;

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
  hasMap: site.address.mapsUrl,
  areaServed: cidadesAtendidas.map((cidade) => ({
    "@type": "City",
    name: cidade,
    addressRegion: "SP",
    addressCountry: "BR",
  })),
  knowsAbout: todasAsChaves,
  sameAs: [site.instagram],
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

export const faqSchema = (itens: { pergunta: string; resposta: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "pt-BR",
  about: { "@id": ID_CLINICA },
  mainEntity: itens.map((item) => ({
    "@type": "Question",
    name: item.pergunta,
    acceptedAnswer: { "@type": "Answer", text: item.resposta },
  })),
});

export const servicoSchema = (
  nome: string,
  descricao: string,
  path: string,
  duvida?: { titulo: string; texto: string; pergunta?: string },
) => {
  const partes: unknown[] = [
    {
      "@type": "MedicalProcedure",
      "@id": `${urlDaRota(path)}#procedimento`,
      name: nome,
      description: descricao,
      url: urlDaRota(path),
      procedureType: "https://schema.org/TherapeuticProcedure",
      bodyLocation: "Boca",
      provider: { "@id": ID_CLINICA },
      keywords: chavesDaRota(path).join(", "),
    },
    dentistSchema,
  ];
  // Os blocos "dúvida comum" das páginas de procedimento respondem a uma pergunta
  // real de busca — marcá-los como Question os torna elegíveis a resposta direta.
  if (duvida) {
    partes.push({
      "@type": "FAQPage",
      "@id": `${urlDaRota(path)}#duvida`,
      mainEntity: [
        {
          "@type": "Question",
          name: duvida.pergunta ?? duvida.titulo,
          acceptedAnswer: { "@type": "Answer", text: duvida.texto },
        },
      ],
    });
  }
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
