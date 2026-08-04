/**
 * Copy do site — transcrita literalmente do documento aprovado pela clínica
 * (`insumos/Copy_Site_Lemarc_Odontologia.md`). Não editar sem alinhar com a Lemarc.
 * Regras do documento: nenhum valor monetário e nenhuma menção a raio-x digital.
 */

export type Meta = { title: string; description: string };

export const home = {
  path: "/",
  h1Eyebrow: "Lemarc Odontologia",
  h1: "Reabilitação Oral e Odontologia Estética em Indaiatuba",
  subheadline:
    "Uma equipe completa, especialista em devolver qualidade de vida através da reabilitação oral.",
  abertura: [
    "Na Lemarc Odontologia, cada tratamento é planejado para recuperar não apenas a estética do sorriso, mas também a função, a segurança e a qualidade de vida dos pacientes.",
    "Localizada em Indaiatuba/SP, nossa clínica reúne a Dra. Letícia Marcondes e uma equipe de especialistas parceiros para oferecer tratamentos odontológicos personalizados, unindo tecnologia, planejamento individualizado e atendimento humanizado em todas as fases da vida.",
  ],
  credenciais: [
    "Dra. Letícia Marcondes — CRO-SP 139458",
    "Formada em Odontologia pela Universidade Federal de Alfenas (UNIFAL-MG), 2019",
    "Cursando especialização em Prótese e Dentística — São Leopoldo Mandic, Campinas",
    "Quase 7 anos de atuação clínica",
  ],
  chamadaFinal: "Seu sorriso merece um tratamento que considera você por completo.",
  meta: {
    title: "Lemarc Odontologia | Dentista em Indaiatuba | Reabilitação Oral",
    description:
      "Clínica odontológica em Indaiatuba especializada em reabilitação oral, implantes dentários e odontologia estética. Recupere seu sorriso com planejamento personalizado.",
  } satisfies Meta,
};

/** Conceito central da marca — vem da Estratégia de Posicionamento Digital. */
export const manifesto = {
  frase: "Reabilitar um sorriso é devolver qualidade de vida.",
  texto:
    "Porque um implante não devolve apenas um dente. Uma reabilitação não devolve apenas um sorriso. Ela devolve segurança, conforto, confiança e liberdade para viver.",
};

export const sobre = {
  path: "/sobre",
  h1: "Uma odontologia planejada para transformar histórias",
  corpo: [
    "A Lemarc Odontologia nasceu com um propósito: oferecer uma odontologia mais completa, baseada em diagnóstico preciso, planejamento estratégico e tratamentos personalizados.",
    "Acreditamos que um sorriso saudável vai muito além da aparência. Ele influencia a alimentação, a comunicação, a autoestima e a confiança para viver melhor.",
    "Por isso, trabalhamos com uma visão de reabilitação oral integrada, avaliando cada caso individualmente para encontrar a melhor solução odontológica.",
  ],
  compromissoTitulo: "Nosso compromisso",
  compromisso: [
    "Diagnóstico detalhado",
    "Planejamento personalizado",
    "Tratamentos seguros e previsíveis",
    "Tecnologia aplicada à odontologia",
    "Atendimento próximo e humanizado",
  ],
  equipeTitulo: "Nossa Equipe",
  equipeIntro:
    "Na Lemarc, cada paciente é recebido e avaliado pessoalmente pela Dra. Letícia, que conduz o diagnóstico inicial e o planejamento de cada caso. A partir daí, contamos com uma rede de especialistas dedicados para garantir que cada etapa do tratamento seja feita por quem mais entende daquela área específica.",
  equipe: [
    {
      nome: "Dra. Letícia Marcondes",
      registro: "CRO-SP 139458",
      texto:
        "Clínica geral, odontologia estética e cirurgia oral menor. Responsável pela avaliação, diagnóstico e planejamento de todos os pacientes da clínica.",
    },
    { nome: "Dr. Rick", registro: "", texto: "Implantes dentários" },
    { nome: "Dra. Juliana", registro: "", texto: "Tratamento de canal (endodontia)" },
    {
      nome: "Dra. Lara",
      registro: "",
      texto:
        "Ortodontia — aparelhos convencionais, autoligados e alinhadores transparentes (Invisalign)",
    },
  ],
  meta: {
    title: "Sobre a Lemarc Odontologia | Clínica em Indaiatuba",
    description:
      "Conheça a Dra. Letícia Marcondes e a equipe de especialistas da Lemarc Odontologia. Diagnóstico preciso, planejamento individualizado e atendimento humanizado em Indaiatuba.",
  } satisfies Meta,
};

export const reabilitacao = {
  path: "/reabilitacao-oral",
  h1: "Reabilitação Oral em Indaiatuba",
  corpo: [
    "A reabilitação oral é uma área da odontologia dedicada a recuperar dentes comprometidos, devolver função mastigatória e reconstruir a harmonia do sorriso.",
    "Pacientes que perderam dentes, possuem desgastes, problemas funcionais ou insatisfação estética podem se beneficiar de um planejamento completo.",
  ],
  consideraTitulo: "Na Lemarc Odontologia, cada tratamento é desenvolvido considerando:",
  considera: [
    "Saúde bucal atual",
    "Necessidades funcionais",
    "Expectativas estéticas",
    "Histórico do paciente",
    "Melhor estratégia de tratamento",
  ],
  fechamento:
    "O objetivo é devolver conforto, segurança e qualidade de vida. Porque um implante não devolve apenas um dente, e uma reabilitação não devolve apenas um sorriso — ela devolve a liberdade de mastigar sem dor, sorrir sem constrangimento e viver com confiança.",
  tratamentosTitulo: "Tratamentos que fazem parte da reabilitação oral",
  cta: "Quero entender qual tratamento é indicado para o meu caso",
  meta: {
    title: "Reabilitação Oral em Indaiatuba | Lemarc Odontologia",
    description:
      "Reabilitação oral completa em Indaiatuba: implantes, próteses, coroas e planejamento individualizado para recuperar função, estética e qualidade de vida.",
  } satisfies Meta,
};

export type Procedimento = {
  path: string;
  nav: string;
  /** Título e resumo usados nos cards da página-pilar. */
  card: string;
  resumo: string;
  icone: "implante" | "coroa" | "faceta" | "clareamento" | "canal" | "ortodontia" | "estetica";
  /** Aparece na lista de cards da página-pilar (a copy define exatamente seis). */
  naPilar: boolean;
  h1: string;
  corpo: string[];
  /** Bloco "dúvida comum". `pergunta` alimenta o schema Question quando o
   *  título exibido não é uma pergunta de busca. */
  destaque?: { titulo: string; texto: string; pergunta?: string };
  cta: string;
  ctaContexto: string;
  meta: Meta;
};

export const procedimentos: Procedimento[] = [
  {
    path: "/implantes-dentarios",
    nav: "Implantes Dentários",
    card: "Implantes Dentários",
    resumo: "substituição de dentes ausentes com segurança e naturalidade",
    icone: "implante",
    naPilar: true,
    h1: "Implantes Dentários em Indaiatuba",
    corpo: [
      "A perda de dentes pode afetar a mastigação, a fala e a autoestima. Os implantes dentários são uma solução moderna para substituir dentes ausentes e recuperar a funcionalidade do sorriso.",
      "Na Lemarc Odontologia, o tratamento é conduzido pelo Dr. Rick, com planejamento individualizado desenvolvido junto à Dra. Letícia para buscar segurança e naturalidade no resultado.",
    ],
    destaque: {
      titulo: "Uma dúvida comum",
      pergunta: "Qual a diferença entre pino e implante dentário?",
      texto:
        "Muitos pacientes usam “pino” e “implante” como sinônimos, mas são coisas diferentes: o pino é utilizado dentro do próprio dente, geralmente após um tratamento de canal, enquanto o implante substitui a raiz de um dente que já foi perdido. Entender essa diferença ajuda a escolher o tratamento certo para cada caso.",
    },
    cta: "Agendar avaliação para implante",
    ctaContexto: "tenho interesse em implante dentário",
    meta: {
      title: "Implante Dentário em Indaiatuba | Lemarc Odontologia",
      description:
        "Implantes dentários com planejamento individualizado em Indaiatuba. Recupere a função e a naturalidade do seu sorriso com segurança.",
    },
  },
  {
    path: "/proteses-e-coroas",
    nav: "Próteses e Coroas",
    card: "Próteses e Coroas",
    resumo: "recuperação de função e estética dental",
    icone: "coroa",
    naPilar: true,
    h1: "Próteses Dentárias em Indaiatuba",
    corpo: [
      "As próteses dentárias podem devolver dentes perdidos, melhorando estética, mastigação e conforto.",
      "Cada caso é avaliado individualmente para indicar a melhor solução: coroa sobre dente, coroa sobre implante, ou prótese mais ampla, conforme a necessidade do paciente.",
    ],
    cta: "Agendar avaliação para prótese",
    ctaContexto: "tenho interesse em prótese dentária",
    meta: {
      title: "Prótese Dentária em Indaiatuba | Lemarc Odontologia",
      description:
        "Próteses e coroas dentárias personalizadas em Indaiatuba, com planejamento individual para devolver estética, mastigação e conforto.",
    },
  },
  {
    path: "/lentes-de-contato-dental",
    nav: "Facetas e Lentes de Contato",
    card: "Facetas e Lentes de Contato Dental",
    resumo: "harmonia e equilíbrio no sorriso",
    icone: "faceta",
    naPilar: true,
    h1: "Lentes de Contato Dental e Facetas em Indaiatuba",
    corpo: [
      "Procedimentos estéticos podem corrigir alterações de formato, tamanho e coloração dos dentes, proporcionando um sorriso mais equilibrado.",
      "O planejamento individual é essencial para resultados naturais — cada caso é avaliado presencialmente antes de qualquer indicação.",
    ],
    cta: "Agendar avaliação para facetas/lentes",
    ctaContexto: "tenho interesse em facetas ou lentes de contato dental",
    meta: {
      title: "Lentes de Contato Dental em Indaiatuba | Lemarc Odontologia",
      description:
        "Facetas e lentes de contato dental em cerâmica, com planejamento individualizado para um sorriso natural e equilibrado em Indaiatuba.",
    },
  },
  {
    path: "/clareamento-dental",
    nav: "Clareamento Dental",
    card: "Clareamento Dental",
    resumo: "mais luminosidade e uniformidade",
    icone: "clareamento",
    naPilar: true,
    h1: "Clareamento Dental em Indaiatuba",
    corpo: [
      "O clareamento dental é um procedimento indicado para pacientes que desejam um sorriso mais iluminado e harmonioso.",
      "A indicação correta depende de uma avaliação odontológica para garantir segurança e melhores resultados.",
    ],
    cta: "Agendar avaliação para clareamento",
    ctaContexto: "tenho interesse em clareamento dental",
    meta: {
      title: "Clareamento Dental em Indaiatuba | Lemarc Odontologia",
      description:
        "Clareamento dental seguro e personalizado em Indaiatuba, com avaliação prévia para garantir o melhor resultado.",
    },
  },
  {
    path: "/tratamento-de-canal",
    nav: "Tratamento de Canal",
    card: "Tratamento de Canal",
    resumo: "preservação do dente natural",
    icone: "canal",
    naPilar: true,
    h1: "Tratamento de Canal em Indaiatuba",
    corpo: [
      "O tratamento de canal é indicado quando a polpa do dente (a parte interna, com nervos e vasos) está comprometida por cárie profunda, infecção ou trauma. O objetivo é eliminar a infecção e preservar o dente natural.",
      "Na Lemarc Odontologia, o tratamento é conduzido pela Dra. Juliana, sempre a partir de um diagnóstico feito pela Dra. Letícia na avaliação inicial.",
    ],
    destaque: {
      titulo: "Pino ou implante depois do canal?",
      texto:
        "Depois de um tratamento de canal, é comum ser necessário reforçar o dente com um pino — uma estrutura colocada dentro do próprio dente para dar suporte a uma coroa. Isso é diferente de um implante, que substitui um dente perdido por completo. Essa dúvida é uma das mais frequentes entre os pacientes, e por isso vale explicar com calma na avaliação.",
    },
    cta: "Agendar avaliação",
    ctaContexto: "tenho interesse em tratamento de canal",
    meta: {
      title: "Tratamento de Canal em Indaiatuba | Lemarc Odontologia",
      description:
        "Tratamento de canal (endodontia) em Indaiatuba, com diagnóstico individualizado para preservar o dente natural com segurança.",
    },
  },
  {
    path: "/ortodontia-e-invisalign",
    nav: "Ortodontia e Invisalign",
    card: "Ortodontia e Invisalign",
    resumo: "alinhamento com conforto e discrição",
    icone: "ortodontia",
    naPilar: true,
    h1: "Ortodontia em Indaiatuba",
    corpo: [
      "Alinhar os dentes vai além da estética: influencia diretamente a mastigação, a fala e a saúde bucal a longo prazo.",
      "Na Lemarc Odontologia, a Dra. Lara conduz os tratamentos ortodônticos, com opções que vão do aparelho convencional e autoligado até os alinhadores transparentes Invisalign, com escaneamento intraoral para um planejamento digital preciso.",
    ],
    cta: "Agendar avaliação ortodôntica",
    ctaContexto: "tenho interesse em ortodontia ou Invisalign",
    meta: {
      title: "Ortodontia e Invisalign em Indaiatuba | Lemarc Odontologia",
      description:
        "Tratamentos ortodônticos em Indaiatuba: aparelhos convencionais, autoligados e alinhadores Invisalign, com planejamento digital individualizado.",
    },
  },
  {
    path: "/odontologia-estetica",
    nav: "Odontologia Estética",
    card: "Odontologia Estética",
    resumo: "harmonia, proporção e naturalidade no sorriso",
    icone: "estetica",
    naPilar: false,
    h1: "Odontologia Estética em Indaiatuba",
    corpo: [
      "Um sorriso bonito também envolve harmonia, proporção e naturalidade.",
      "A odontologia estética busca melhorar aspectos como formato, cor e equilíbrio do sorriso, respeitando as características individuais de cada pessoa.",
    ],
    cta: "Agendar avaliação estética",
    ctaContexto: "tenho interesse em odontologia estética",
    meta: {
      title: "Odontologia Estética em Indaiatuba | Lemarc Odontologia",
      description:
        "Tratamentos estéticos personalizados em Indaiatuba: facetas, clareamento e harmonização do sorriso com resultado natural.",
    },
  },
];

export const diferenciais = {
  path: "/diferenciais",
  h1: "Como cuidamos de cada detalhe do seu tratamento",
  corpo:
    "Pequenos detalhes fazem uma grande diferença na experiência de um tratamento odontológico. Por isso, investimos em equipamentos e processos que tornam cada consulta mais confortável, precisa e transparente.",
  itens: [
    {
      titulo: "Micromotor elétrico",
      texto:
        "Um dos maiores incômodos relatados por pacientes em qualquer consultório é o barulho e a vibração do motor. Nosso micromotor elétrico reduz drasticamente esse desconforto, além de tornar os procedimentos mais rápidos e precisos.",
      icone: "motor" as const,
    },
    {
      titulo: "Você vê o seu próprio caso",
      texto:
        "Durante a avaliação, fazemos fotografias intrabucais e mostramos na tela, em tempo real, exatamente o que está sendo observado no seu dente. Você entende o diagnóstico com clareza, sem depender só da nossa explicação verbal.",
      icone: "tela" as const,
    },
    {
      titulo: "Lupa cirúrgica",
      texto:
        "Utilizamos lupa de aumento em procedimentos que exigem precisão adicional, ampliando a segurança e a qualidade do resultado.",
      icone: "lupa" as const,
    },
    {
      titulo: "Materiais selecionados",
      texto:
        "Cada material utilizado na clínica passa por um critério rigoroso de seleção, priorizando qualidade e previsibilidade nos resultados.",
      icone: "material" as const,
    },
  ],
  meta: {
    title: "Diferenciais e Tecnologia | Lemarc Odontologia Indaiatuba",
    description:
      "Conheça os diferenciais da Lemarc Odontologia em Indaiatuba: micromotor elétrico, fotografia intrabucal, lupa cirúrgica e seleção criteriosa de materiais.",
  } satisfies Meta,
};

export const indaiatuba = {
  path: "/dentista-em-indaiatuba",
  h1: "Dentista em Indaiatuba – Lemarc Odontologia",
  intro: "Está procurando uma clínica odontológica em Indaiatuba?",
  corpo:
    "A Lemarc Odontologia está localizada no bairro Jardim Pau Preto e oferece atendimento odontológico especializado, 100% particular, de segunda a sexta-feira, para pacientes que buscam tratamentos como:",
  lista: [
    "Reabilitação oral",
    "Implantes dentários",
    "Próteses e coroas",
    "Odontologia estética",
    "Ortodontia e Invisalign",
    "Tratamento de canal",
  ],
  fechamento:
    "Nossa clínica atende pacientes de Indaiatuba e região, com uma abordagem baseada em diagnóstico, planejamento e cuidado individualizado — sempre conduzida pela Dra. Letícia junto à sua equipe de especialistas.",
  enderecoTitulo: "Endereço e horários",
  agendamento: "Agendamento pelo WhatsApp",
  cta: "Agendar minha avaliação",
  meta: {
    title: "Dentista em Indaiatuba | Lemarc Odontologia",
    description:
      "Clínica odontológica no Jardim Pau Preto, Indaiatuba. Reabilitação oral, implantes, próteses e odontologia estética com atendimento particular.",
  } satisfies Meta,
};

export const faq = {
  path: "/perguntas-frequentes",
  h1: "Perguntas Frequentes",
  itens: [
    {
      pergunta: "Vai doer?",
      resposta:
        "Essa é uma das perguntas que mais ouvimos — e a resposta, na maioria dos casos, é não. Utilizamos micromotor elétrico, que reduz muito o barulho e a vibração (o principal motivo de desconforto relatado pelos pacientes), além de anestesia adequada para cada procedimento.",
    },
    {
      pergunta: "Meu dente não dói, preciso mesmo de tratamento?",
      resposta:
        "Sim, esse é um dos enganos mais comuns. Muitos problemas — como cárie em estágio inicial, desgaste ou acúmulo de placa em áreas de difícil acesso — não causam dor, mas evoluem silenciosamente se não forem tratados. A avaliação periódica é o que permite identificar isso a tempo.",
    },
    {
      pergunta: "Qual a diferença entre pino e implante dentário?",
      resposta:
        "O pino é uma estrutura colocada dentro do próprio dente, normalmente após um tratamento de canal, para dar suporte a uma coroa. Já o implante substitui a raiz de um dente que já foi perdido. São indicações completamente diferentes — e o diagnóstico correto é feito na avaliação.",
    },
    {
      pergunta: "Quando preciso fazer uma reabilitação oral?",
      resposta:
        "A reabilitação oral pode ser indicada para pessoas que possuem dentes ausentes, desgastes, problemas funcionais, alterações na mordida ou insatisfação com o sorriso. O diagnóstico é feito através de uma avaliação odontológica completa.",
    },
    {
      pergunta: "Quanto custa um implante dentário em Indaiatuba?",
      resposta:
        "O valor de um implante dentário depende de diversos fatores, como quantidade de dentes, necessidade óssea, tipo de implante e planejamento do caso. Por isso, não trabalhamos com valores fechados sem avaliação — cada paciente passa por uma análise individual para identificar a melhor solução.",
    },
    {
      pergunta: "Por que a avaliação é paga?",
      resposta:
        "A avaliação envolve exame clínico completo, análise de imagens e planejamento inicial do caso — é o que garante um diagnóstico preciso antes de qualquer indicação de tratamento. É também o motivo pelo qual não fornecemos valores de procedimentos por WhatsApp: cada caso é único, e queremos evitar expectativas incorretas antes da avaliação presencial.",
    },
    {
      pergunta: "Qual a melhor clínica odontológica em Indaiatuba?",
      resposta:
        "A escolha de uma clínica odontológica deve considerar experiência profissional, qualidade do atendimento, planejamento dos tratamentos e segurança dos procedimentos. A Lemarc Odontologia trabalha com uma abordagem personalizada, conduzida pela Dra. Letícia junto a uma equipe de especialistas, para oferecer tratamentos planejados conforme a necessidade de cada paciente.",
    },
  ],
  meta: {
    title: "Perguntas Frequentes | Lemarc Odontologia Indaiatuba",
    description:
      "Tire suas dúvidas sobre reabilitação oral, implantes, avaliação e tratamentos odontológicos na Lemarc Odontologia, em Indaiatuba.",
  } satisfies Meta,
};

export const depoimentos = {
  path: "/depoimentos",
  h1: "O que nossos pacientes dizem",
  placeholder: "Em breve, depoimentos reais de pacientes atendidos na Lemarc Odontologia.",
  /** Popular com { nome, texto, foto? } assim que a clínica autorizar. */
  itens: [] as { nome: string; texto: string; foto?: string }[],
  meta: {
    title: "Depoimentos de Pacientes | Lemarc Odontologia",
    description:
      "Veja o que pacientes da Lemarc Odontologia, em Indaiatuba, dizem sobre a experiência de tratamento e reabilitação oral.",
  } satisfies Meta,
};

export const contato = {
  path: "/contato",
  h1: "Agende sua avaliação",
  corpo:
    "Dê o primeiro passo para recuperar a qualidade de vida do seu sorriso. Fale com a nossa equipe e agende sua avaliação.",
  cta: "Agendar pelo WhatsApp",
  meta: {
    title: "Contato | Agende sua Avaliação | Lemarc Odontologia",
    description:
      "Entre em contato com a Lemarc Odontologia em Indaiatuba e agende sua avaliação. Atendimento particular, de segunda a sexta-feira.",
  } satisfies Meta,
};

export const naoEncontrada = {
  h1: "Página não encontrada",
  corpo: "O endereço acessado não existe ou foi movido. Volte para a página inicial para continuar.",
  cta: "Ir para a página inicial",
  meta: {
    title: "Página não encontrada | Lemarc Odontologia",
    description: "O endereço acessado não existe ou foi movido.",
  } satisfies Meta,
};

export const pilarCards = procedimentos.filter((p) => p.naPilar);
