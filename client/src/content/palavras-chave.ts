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

/**
 * Uma palavra-chave primária por rota — sem canibalizar entre páginas.
 *
 * Os quatro alvos prioritários da clínica têm dono exclusivo:
 *   odontologia Indaiatuba        -> /                        (a clínica como entidade)
 *   dentista Indaiatuba           -> /dentista-em-indaiatuba   (busca local, "perto de mim")
 *   reabilitação oral Indaiatuba  -> /reabilitacao-oral        (página-pilar)
 *   odontologia estética Indaiatuba -> /odontologia-estetica   (página de serviço)
 *
 * Antes, "/" e "/dentista-em-indaiatuba" declaravam a MESMA primária — as duas
 * páginas competiam entre si pelo mesmo termo e o Google escolhia sozinho qual
 * mostrar (normalmente a errada). Termo repetido entre rotas aqui é bug, não estilo.
 */
export const alvosPorRota: AlvoDaRota[] = [
  {
    path: "/",
    primaria: "odontologia Indaiatuba",
    secundarias: [
      "odontologia em Indaiatuba",
      "clínica odontológica Indaiatuba",
      "clínica odontológica em Indaiatuba",
      "consultório odontológico Indaiatuba",
      "clínica odontológica particular Indaiatuba",
      "Lemarc Odontologia",
      "Lemarc Odontologia Indaiatuba",
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
      "reabilitação oral em Indaiatuba",
      "reabilitação oral interior de São Paulo",
      "reabilitação bucal Indaiatuba",
      "reabilitação oral completa",
      "dentista especialista em reabilitação oral Indaiatuba",
      "recuperar dentes perdidos Indaiatuba",
      "planejamento odontológico completo Indaiatuba",
      "reabilitação oral sobre implantes Indaiatuba",
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
      "odontologia estética em Indaiatuba",
      "estética dental Indaiatuba",
      "clínica de estética dental Indaiatuba",
      "harmonização do sorriso Indaiatuba",
      "dentista estético Indaiatuba",
      "transformação do sorriso Indaiatuba",
      "dentista especialista em estética Indaiatuba",
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
    primaria: "dentista Indaiatuba",
    secundarias: [
      "dentista em Indaiatuba",
      "dentista em Indaiatuba SP",
      "dentista perto de mim Indaiatuba",
      "dentista Indaiatuba e região",
      "dentista particular Indaiatuba",
      ...termosDeBairro,
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

/** Conjunto sem repetição — vai para a propriedade `keywords` do schema. */
export const todasAsChaves = Array.from(
  new Set(alvosPorRota.flatMap((a) => [a.primaria, ...a.secundarias]).concat(termosRegionais)),
);

/**
 * Assuntos que a clínica domina, como TEMAS — não como frases de busca.
 *
 * `knowsAbout` do schema.org espera entidade/tópico ("Reabilitação oral"), não
 * palavra-chave geolocalizada ("reabilitação oral Indaiatuba"). Despejar a lista
 * de keywords ali é keyword stuffing em JSON-LD: o Google ignora e, no limite,
 * desconfia. As keywords continuam existindo — só que na propriedade certa.
 */
export const topicosDaClinica = [
  "Reabilitação oral",
  "Implantodontia",
  "Prótese dentária",
  "Odontologia estética",
  "Dentística",
  "Facetas e lentes de contato dental",
  "Clareamento dental",
  "Endodontia",
  "Ortodontia",
  "Alinhadores transparentes",
  "Cirurgia oral menor",
  "Diagnóstico odontológico",
  "Planejamento odontológico",
];

/**
 * Trava contra canibalização: duas rotas não podem declarar o mesmo termo.
 *
 * Roda no import, então quebra o build (e o `npm run dev`) em vez de deixar o
 * erro chegar silencioso ao Google — que foi exatamente o que aconteceu quando
 * "/" e "/dentista-em-indaiatuba" disputavam "dentista em Indaiatuba".
 */
const donoDoTermo = new Map<string, string>();
for (const alvo of alvosPorRota) {
  for (const termo of [alvo.primaria, ...alvo.secundarias]) {
    const chave = termo.toLowerCase();
    const dono = donoDoTermo.get(chave);
    if (dono && dono !== alvo.path) {
      throw new Error(
        `Canibalização de palavra-chave: "${termo}" está declarado em ${dono} e em ${alvo.path}. ` +
          `Cada termo deve ter uma rota dona só.`,
      );
    }
    donoDoTermo.set(chave, alvo.path);
  }
}
