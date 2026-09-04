import principal from "@/assets/images/dra-leticia-principal.jpg";
import recepcao from "@/assets/images/dra-leticia-recepcao.jpg";
import consultorio from "@/assets/images/dra-leticia-consultorio.jpg";
import clinica from "@/assets/images/dra-leticia-clinica.jpg";
import planejamento from "@/assets/images/dra-leticia-planejamento.jpg";
import diagnostico from "@/assets/images/dra-leticia-diagnostico.jpg";

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
    // Aponta para a ficha da clínica no Maps (`?cid=`), e não para uma busca por
    // endereço: quem clica cai no cartão com as 91 avaliações 5,0 — que é o
    // ativo mais forte da clínica — em vez de numa lista de resultados.
    mapsUrl: "https://maps.google.com/?cid=13027717339812848473",
  },
  hours: "Segunda a sexta-feira, das 9h às 12h e das 14h às 18h",

  /** Depoimentos ainda não coletados — a seção fica estruturada, porém oculta. */
  showTestimonials: false,

  ctas: {
    primary: "Agende sua avaliação na Lemarc Odontologia",
    short: "Agendar avaliação",
    whatsapp: "Agendar pelo WhatsApp",
  },

  /** Ensaio fotográfico da clínica (insumos/novos). `principal` abre o hero. */
  fotos: {
    principal: {
      src: principal,
      alt: "Dra. Letícia Marcondes na recepção da Lemarc Odontologia, diante da marca da clínica",
    },
    recepcao: {
      src: recepcao,
      alt: "Dra. Letícia Marcondes recebendo pacientes na recepção da Lemarc Odontologia",
    },
    consultorio: {
      src: consultorio,
      alt: "Dra. Letícia Marcondes ao lado da cadeira odontológica do consultório da Lemarc",
    },
    clinica: {
      src: clinica,
      alt: "Dra. Letícia Marcondes na clínica Lemarc, em Indaiatuba, pronta para atender",
    },
    planejamento: {
      src: planejamento,
      alt: "Dra. Letícia Marcondes preparando o planejamento de um tratamento no computador",
    },
    diagnostico: {
      src: diagnostico,
      alt: "Dra. Letícia Marcondes analisando uma radiografia panorâmica durante o diagnóstico",
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
