/**
 * Mapa de palavras-chave do site — derivado do conteúdo real de `content/pages.ts`.
 *
 * Serve a três coisas ao mesmo tempo:
 *  1. documentar o alvo de cada rota (para quem for editar copy depois);
 *  2. alimentar `knowsAbout` / `areaServed` do schema.org (SEO local + entidade);
 *  3. alimentar o `llms.txt` e o resumo lido por motores generativos (GEO).
 *
 * Regra ao editar: só entram termos que o site realmente sustenta no texto.
 * Nada de serviço que a clínica não oferece e nada que envolva valor monetário.
 */

/** Como a marca aparece escrita por aí — usado em `alternateName` e no llms.txt. */
export const variantesDeMarca = [
  "Lemarc",
  "Le Marc",
  "LeMarc",
  "Lemarc Odontologia",
  "Clínica Lemarc",
  "Clínica Lemarc Odontologia",
  "Lemarc Odontologia Indaiatuba",
  "Odontologia Lemarc",
  "Dra. Letícia Marcondes",
  "Letícia Marcondes dentista",
  "dra.lemarc",
];

/**
 * Cidades atendidas. A copy diz "pacientes de Indaiatuba e região"; as demais são
 * os municípios vizinhos, na faixa de deslocamento natural até a clínica.
 * Ajustar com a clínica se ela preferir restringir.
 */
export const cidadesAtendidas = [
  "Indaiatuba",
  "Salto",
  "Itu",
  "Elias Fausto",
  "Monte Mor",
  "Capivari",
  "Campinas",
];

export const termosRegionais = [
  "odontologia interior de São Paulo",
  "dentista interior de SP",
  "dentista região de Campinas",
  "clínica odontológica região metropolitana de Campinas",
  "reabilitação oral interior de São Paulo",
];

/** Bairros e referências locais que aparecem no site. */
export const termosDeBairro = [
  "dentista Jardim Pau Preto",
  "dentista Centro de Indaiatuba",
  "clínica odontológica Jardim Pau Preto",
  "dentista Rua 5 de Julho Indaiatuba",
];

export type AlvoDaRota = {
  path: string;
  primaria: string;
  secundarias: string[];
};

/** Uma palavra-chave primária por rota — sem canibalizar entre páginas. */
export const alvosPorRota: AlvoDaRota[] = [
  {
    path: "/",
    primaria: "dentista em Indaiatuba",
    secundarias: [
      "clínica odontológica Indaiatuba",
      "odontologia Indaiatuba",
      "Lemarc Odontologia",
      "reabilitação oral Indaiatuba",
      "odontologia estética Indaiatuba",
    ],
  },
  {
    path: "/sobre",
    primaria: "Dra. Letícia Marcondes dentista Indaiatuba",
    secundarias: [
      "Clínica Lemarc Indaiatuba",
      "dentista CRO-SP 139458",
      "equipe odontológica Indaiatuba",
      "cirurgiã-dentista Indaiatuba",
    ],
  },
  {
    path: "/reabilitacao-oral",
    primaria: "reabilitação oral Indaiatuba",
    secundarias: [
      "reabilitação oral interior de São Paulo",
      "reabilitação bucal Indaiatuba",
      "recuperar dentes perdidos Indaiatuba",
      "planejamento odontológico completo Indaiatuba",
    ],
  },
  {
    path: "/implantes-dentarios",
    primaria: "implante dentário Indaiatuba",
    secundarias: [
      "implantes dentários Indaiatuba",
      "substituir dente perdido Indaiatuba",
      "diferença entre pino e implante dentário",
      "implante dentário interior de SP",
    ],
  },
  {
    path: "/proteses-e-coroas",
    primaria: "prótese dentária Indaiatuba",
    secundarias: [
      "coroa dentária Indaiatuba",
      "coroa sobre implante Indaiatuba",
      "prótese sobre dente Indaiatuba",
      "próteses e coroas Indaiatuba",
    ],
  },
  {
    path: "/lentes-de-contato-dental",
    primaria: "lente de contato dental Indaiatuba",
    secundarias: [
      "facetas dentárias Indaiatuba",
      "facetas em cerâmica Indaiatuba",
      "lentes de contato dental interior de SP",
      "faceta de porcelana Indaiatuba",
    ],
  },
  {
    path: "/clareamento-dental",
    primaria: "clareamento dental Indaiatuba",
    secundarias: [
      "clarear os dentes Indaiatuba",
      "clareamento dental seguro Indaiatuba",
      "clareamento dental com avaliação Indaiatuba",
    ],
  },
  {
    path: "/tratamento-de-canal",
    primaria: "tratamento de canal Indaiatuba",
    secundarias: [
      "endodontia Indaiatuba",
      "canal no dente Indaiatuba",
      "pino após tratamento de canal",
      "preservar dente natural Indaiatuba",
    ],
  },
  {
    path: "/ortodontia-e-invisalign",
    primaria: "ortodontia Indaiatuba",
    secundarias: [
      "Invisalign Indaiatuba",
      "alinhador transparente Indaiatuba",
      "aparelho autoligado Indaiatuba",
      "aparelho ortodôntico Indaiatuba",
      "escaneamento intraoral Indaiatuba",
    ],
  },
  {
    path: "/odontologia-estetica",
    primaria: "odontologia estética Indaiatuba",
    secundarias: [
      "estética dental Indaiatuba",
      "harmonização do sorriso Indaiatuba",
      "dentista estético Indaiatuba",
    ],
  },
  {
    path: "/diferenciais",
    primaria: "clínica odontológica com tecnologia em Indaiatuba",
    secundarias: [
      "micromotor elétrico odontologia",
      "fotografia intrabucal na avaliação",
      "lupa cirúrgica odontologia",
      "dentista sem dor Indaiatuba",
    ],
  },
  {
    path: "/dentista-em-indaiatuba",
    primaria: "dentista em Indaiatuba",
    secundarias: [
      ...termosDeBairro,
      "clínica odontológica particular Indaiatuba",
      "dentista Indaiatuba e região",
      "odontologia Indaiatuba",
    ],
  },
  {
    path: "/perguntas-frequentes",
    primaria: "dúvidas sobre implante e reabilitação oral",
    secundarias: [
      "implante dentário dói",
      "quando fazer reabilitação oral",
      "por que a avaliação odontológica é paga",
      "melhor clínica odontológica em Indaiatuba",
    ],
  },
  {
    path: "/contato",
    primaria: "agendar dentista em Indaiatuba",
    secundarias: [
      "Lemarc Odontologia contato",
      "dentista Indaiatuba WhatsApp",
      "marcar avaliação odontológica Indaiatuba",
    ],
  },
];

export const alvoDaRota = (path: string) => alvosPorRota.find((a) => a.path === path);

/** Palavras-chave de uma rota, prontas para `keywords` / `knowsAbout`. */
export const chavesDaRota = (path: string) => {
  const alvo = alvoDaRota(path);
  return alvo ? [alvo.primaria, ...alvo.secundarias] : [];
};

/** Conjunto sem repetição, usado no `knowsAbout` da entidade da clínica. */
export const todasAsChaves = Array.from(
  new Set(alvosPorRota.flatMap((a) => [a.primaria, ...a.secundarias]).concat(termosRegionais)),
);
