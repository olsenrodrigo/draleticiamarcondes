import { useEffect } from "react";
import { site } from "@/content/site";
import type { Meta } from "@/content/pages";

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

/** Aplica title, description, canonical, Open Graph e JSON-LD da rota atual. */
export function useSeo(dados: Meta & { path: string; jsonLd?: unknown }) {
  const { title, description, path } = dados;
  const jsonLd = dados.jsonLd ? JSON.stringify(dados.jsonLd) : null;

  useEffect(() => {
    const url = `${site.origin}${path === "/" ? "" : path}`;
    document.title = title;
    meta("name", "description", description);
    meta("property", "og:title", title);
    meta("property", "og:description", description);
    meta("property", "og:url", url);
    meta("property", "og:type", "website");
    meta("property", "og:site_name", site.name);
    meta("name", "twitter:title", title);
    meta("name", "twitter:description", description);

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

/** Entidade da clínica — usada na home e como base do schema das demais páginas. */
export const dentistSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Lemarc Odontologia",
  url: site.origin,
  image: `${site.origin}/opengraph.jpg`,
  telephone: `+${site.whatsapp}`,
  founder: {
    "@type": "Person",
    name: "Letícia Marcondes",
    jobTitle: "Cirurgiã-Dentista",
    identifier: "CRO-SP 139458",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua 5 de Julho, 697 - Sala 2, Jardim Pau Preto",
    addressLocality: "Indaiatuba",
    addressRegion: "SP",
    postalCode: "13330-220",
    addressCountry: "BR",
  },
  email: site.email,
  sameAs: [site.instagram],
  medicalSpecialty: [
    "Reabilitação Oral",
    "Implantes Dentários",
    "Odontologia Estética",
    "Ortodontia",
    "Endodontia",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  paymentAccepted: "Particular",
};

export const faqSchema = (itens: { pergunta: string; resposta: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: itens.map((item) => ({
    "@type": "Question",
    name: item.pergunta,
    acceptedAnswer: { "@type": "Answer", text: item.resposta },
  })),
});

export const servicoSchema = (nome: string, descricao: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: nome,
  description: descricao,
  url: `${site.origin}${path}`,
  provider: {
    "@type": "Dentist",
    name: site.name,
    address: dentistSchema.address,
  },
});
