import retrato from "@/assets/images/dra-leticia-retrato.jpg";
import atendimento from "@/assets/images/dra-leticia-atendimento.jpg";
import paciente from "@/assets/images/dra-leticia-paciente.jpg";

/** Dados institucionais. Toda a copy exibida vem daqui ou de `content/pages.ts`. */
export const site = {
  name: "Lemarc Odontologia",
  doctor: "Dra. Letícia Marcondes",
  cro: "CRO-SP 139458",
  // TODO: confirmar o domínio definitivo antes de publicar (usado em canonical/sitemap).
  origin: "https://lemarcodontologia.com.br",

  // Número confirmado no Linktree oficial da clínica (WhatsApp Business).
  whatsapp: "551938945273",
  whatsappDisplay: "(19) 3894-5273",
  email: "lemarcodontologia@gmail.com",
  instagram: "https://www.instagram.com/dra.lemarc/",

  address: {
    street: "Rua 5 de Julho, 697 – Sala 2",
    district: "Jardim Pau Preto",
    city: "Indaiatuba",
    state: "SP",
    zip: "13330-220",
    full: "Rua 5 de Julho, 697 – Sala 2, Jardim Pau Preto – Indaiatuba/SP – CEP 13330-220",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Rua+Cinco+de+Julho%2C+697+-+Sala+2+-+Jardim+Pau+Preto%2C+Indaiatuba+-+SP%2C+13330-220",
  },
  hours: "Segunda a sexta-feira, das 9h às 12h e das 14h às 18h",

  /** Depoimentos ainda não coletados — a seção fica estruturada, porém oculta. */
  showTestimonials: false,

  ctas: {
    primary: "Agende sua avaliação na Lemarc Odontologia",
    short: "Agendar avaliação",
    whatsapp: "Agendar pelo WhatsApp",
  },

  fotos: {
    retrato: {
      src: retrato,
      alt: "Dra. Letícia Marcondes, cirurgiã-dentista da Lemarc Odontologia",
    },
    atendimento: {
      src: atendimento,
      alt: "Dra. Letícia Marcondes durante o atendimento de uma paciente no consultório da Lemarc",
    },
    paciente: {
      src: paciente,
      alt: "Dra. Letícia Marcondes com uma paciente infantil na clínica Lemarc, em Indaiatuba",
    },
  },
} as const;

export const whatsappUrl = (mensagem: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;

export const agendarUrl = (contexto?: string) =>
  whatsappUrl(
    contexto
      ? `Olá! Vim pelo site da Lemarc Odontologia e gostaria de agendar uma avaliação — ${contexto}.`
      : "Olá! Vim pelo site da Lemarc Odontologia e gostaria de agendar uma avaliação.",
  );
