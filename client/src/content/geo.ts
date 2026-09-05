/**
 * Conteúdo escrito para SEO e GEO — deliberadamente separado de `content/pages.ts`.
 *
 * `pages.ts` é a copy aprovada pela clínica e não se mexe sem alinhar. Tudo o que
 * está aqui foi escrito depois, para dois objetivos que a copy institucional não
 * cobre sozinha:
 *
 *  - SEO: dar corpo às páginas-alvo (`/`, `/reabilitacao-oral`,
 *    `/odontologia-estetica`, `/dentista-em-indaiatuba`). Duas frases não rankeiam.
 *  - GEO: dar a motores generativos (ChatGPT, Claude, Perplexity, Gemini, visão
 *    geral do Google) trechos que eles conseguem citar — resposta direta na
 *    primeira frase, fato verificável, entidade nomeada.
 *
 * Regras herdadas do documento da clínica, válidas aqui também:
 *  - nenhum valor monetário;
 *  - nenhuma menção a raio-x digital;
 *  - nenhum procedimento que a clínica não oferece;
 *  - nenhuma promessa de resultado ou prazo fechado sem avaliação.
 *
 * Este arquivo é o que a clínica precisa revisar. O resto do SEO é estrutura.
 */

export type SecaoGeo = {
  titulo: string;
  paragrafos?: string[];
  lista?: string[];
  /** Fecha a seção com um link interno para a rota indicada. */
  linkPara?: { path: string; texto: string };
};

export type PerguntaGeo = { pergunta: string; resposta: string };

export type BlocoGeo = {
  /**
   * Resposta direta, autossuficiente, em 1–3 frases. É o trecho com maior chance
   * de ser citado literalmente por um motor generativo, então precisa conter
   * sozinho: o que é, onde é, quem responde. Sem pronome solto e sem "nós".
   */
  resumo: string;
  secoes?: SecaoGeo[];
  faqTitulo?: string;
  faq?: PerguntaGeo[];
};

/* ------------------------------------------------------------------ home -- */

const HOME: BlocoGeo = {
  resumo:
    "A Lemarc Odontologia é uma clínica odontológica particular em Indaiatuba/SP, no Centro, especializada em reabilitação oral e odontologia estética. Todo paciente é recebido e avaliado pessoalmente pela Dra. Letícia Marcondes (CRO-SP 139458), que conduz o diagnóstico e o planejamento antes de qualquer tratamento começar.",
  secoes: [
    {
      titulo: "O que a odontologia da Lemarc cobre",
      paragrafos: [
        "A clínica trabalha em torno de uma ideia central: nenhum procedimento é decidido isolado do conjunto. Um dente quebrado, um espaço vazio e um sorriso escurecido costumam ser sintomas do mesmo caso, e tratá-los em ordem errada custa tempo e trabalho refeito.",
      ],
      lista: [
        "Reabilitação oral — o plano que organiza todos os demais tratamentos",
        "Implantes dentários — substituição da raiz de dentes já perdidos",
        "Próteses e coroas — reconstrução sobre implante ou sobre dente natural",
        "Odontologia estética — facetas, lentes de contato dental e clareamento",
        "Ortodontia e Invisalign — aparelho convencional, autoligado e alinhador transparente",
        "Tratamento de canal — endodontia para preservar o dente natural",
      ],
      linkPara: { path: "/reabilitacao-oral", texto: "Entenda como o plano é montado" },
    },
    {
      titulo: "Como funciona o primeiro atendimento",
      paragrafos: [
        "A avaliação inicial é uma consulta de diagnóstico, não um orçamento. Ela existe para responder à pergunta que o paciente costuma chegar sem conseguir formular: o que exatamente está acontecendo na minha boca e em que ordem isso se resolve.",
      ],
      lista: [
        "Agendamento pelo WhatsApp (19) 3894-5273, de segunda a sexta-feira",
        "Exame clínico completo com a Dra. Letícia, incluindo fotografia intrabucal mostrada na tela em tempo real",
        "Análise das imagens necessárias ao caso",
        "Apresentação do diagnóstico e do plano de tratamento dividido em etapas",
        "Execução — cada etapa conduzida pelo profissional da especialidade correspondente",
      ],
    },
  ],
  faqTitulo: "Perguntas frequentes sobre a clínica",
  faq: [
    {
      pergunta: "A Lemarc Odontologia atende convênio?",
      resposta:
        "Não. O atendimento da Lemarc Odontologia é 100% particular. A clínica não trabalha com convênios nem planos odontológicos, o que permite indicar o tratamento pelo que o caso pede, sem restrição de cobertura ou de material.",
    },
    {
      pergunta: "Onde fica a Lemarc Odontologia em Indaiatuba?",
      resposta:
        "A clínica fica na Rua Cinco de Julho, 697 – Sala 2, no Centro de Indaiatuba/SP, CEP 13330-220. O atendimento é de segunda a sexta-feira, das 9h às 12h e das 14h às 18h.",
    },
    {
      pergunta: "Preciso levar exames prontos na primeira consulta?",
      resposta:
        "Não é obrigatório. Se você já tem radiografias recentes, leve — elas ajudam e podem evitar repetição. Caso contrário, a necessidade de imagens é definida durante a própria avaliação, a partir do exame clínico.",
    },
    {
      pergunta: "A clínica atende crianças?",
      resposta:
        "Sim. A Lemarc Odontologia atende pacientes em todas as fases da vida, da primeira consulta da criança à reabilitação oral do adulto. A avaliação inicial é sempre feita pela Dra. Letícia.",
    },
  ],
};

/* -------------------------------------------------------- reabilitação -- */

const REABILITACAO: BlocoGeo = {
  resumo:
    "Reabilitação oral é o tratamento que devolve, dentro de um plano único, os dentes perdidos ou comprometidos, a função mastigatória e a harmonia do sorriso. Na Lemarc Odontologia, em Indaiatuba/SP, esse plano é montado pela Dra. Letícia Marcondes a partir de uma avaliação presencial e executado por etapas, cada uma conduzida pelo especialista da área.",
  secoes: [
    {
      titulo: "O que é reabilitação oral, na prática",
      paragrafos: [
        "Reabilitação oral não é um procedimento — é a estratégia que coloca vários procedimentos numa ordem que faz sentido para o caso. Um mesmo paciente pode precisar de um tratamento de canal, dois implantes, três coroas e um clareamento; a diferença entre resolver e remendar está em decidir o que vem antes.",
        "A área olha o conjunto: os dentes que ficaram, os que faltam, a mordida, a forma como os dois arcos se encontram e a estética do sorriso. É por isso que a mesma queixa — “perdi um dente” — pode gerar planos completamente diferentes em dois pacientes.",
      ],
    },
    {
      titulo: "Quando a reabilitação oral é indicada",
      paragrafos: [
        "A indicação parte de sinais que costumam aparecer juntos. Se você reconhece dois ou mais dos itens abaixo, o caso provavelmente pede um plano, e não um procedimento avulso:",
      ],
      lista: [
        "Um ou mais dentes ausentes, com ou sem prótese antiga no lugar",
        "Dentes desgastados, trincados ou com restaurações extensas e refeitas várias vezes",
        "Dificuldade ou desconforto para mastigar, ou o hábito de mastigar só de um lado",
        "Prótese que solta, machuca ou não encaixa mais como antes",
        "Mordida que mudou — a sensação de que os dentes “não fecham” como fechavam",
        "Insatisfação estética que envolve mais do que a cor: forma, tamanho ou posição dos dentes",
      ],
    },
    {
      titulo: "As etapas do tratamento na Lemarc",
      paragrafos: [
        "A reabilitação oral é executada por fases, e cada fase só começa quando a anterior está estável. O cronograma completo é apresentado ao paciente antes do início, com o que será feito em cada etapa.",
      ],
      lista: [
        "Avaliação — exame clínico completo, fotografia intrabucal e análise das imagens do caso",
        "Diagnóstico — identificação da causa, não apenas do sintoma que trouxe o paciente",
        "Planejamento — definição dos procedimentos, da ordem entre eles e do que depende do quê",
        "Preparo — o que precisa ser resolvido antes: infecção, canal, saúde da gengiva",
        "Reconstrução — implantes, próteses, coroas e procedimentos estéticos, na ordem planejada",
        "Manutenção — acompanhamento periódico para que o resultado se sustente ao longo dos anos",
      ],
    },
    {
      titulo: "Reabilitação oral, implante e prótese: onde cada um entra",
      paragrafos: [
        "Os três termos aparecem juntos nas buscas e são confundidos com frequência, mas ocupam lugares diferentes.",
        "O implante substitui a raiz de um dente perdido — é a base, fixada no osso. A prótese ou coroa é a parte visível, instalada sobre esse implante ou sobre um dente natural preparado. A reabilitação oral é o plano que decide se você precisa de implante, de quantos, onde, com qual prótese em cima e em que momento — ou se o caso se resolve sem implante nenhum.",
        "Um implante colocado sem esse plano pode ficar na posição errada para a prótese que virá depois. É um erro caro de corrigir e comum de ver.",
      ],
      linkPara: { path: "/implantes-dentarios", texto: "Ver implantes dentários" },
    },
    {
      titulo: "Reabilitação oral em Indaiatuba e região",
      paragrafos: [
        "A Lemarc Odontologia fica no Centro, em Indaiatuba/SP, e atende pacientes da cidade e dos municípios vizinhos — Salto, Itu, Elias Fausto, Monte Mor, Capivari e Campinas. Como a reabilitação oral se estende por várias sessões, o cronograma é montado considerando o deslocamento de quem vem de fora.",
      ],
    },
  ],
  faqTitulo: "Perguntas frequentes sobre reabilitação oral",
  faq: [
    {
      pergunta: "Quanto tempo demora uma reabilitação oral?",
      resposta:
        "Depende do número de dentes envolvidos e de haver ou não etapas cirúrgicas. Casos que se resolvem com coroas e próteses costumam ser mais curtos; casos com implante têm um período de espera entre a cirurgia e a instalação da prótese, porque o osso precisa integrar o implante. O cronograma real do seu caso é apresentado na avaliação, com as etapas e os intervalos entre elas — antes disso, qualquer prazo seria chute.",
    },
    {
      pergunta: "Reabilitação oral e implante dentário são a mesma coisa?",
      resposta:
        "Não. O implante é um dos procedimentos que podem fazer parte de uma reabilitação oral, não a reabilitação inteira. Existem reabilitações orais que não usam nenhum implante, resolvidas com coroas, próteses e ajuste da mordida. E existe implante isolado, fora de um plano maior. A reabilitação é o planejamento que define qual dos dois é o seu caso.",
    },
    {
      pergunta: "Preciso ter perdido muitos dentes para fazer reabilitação oral?",
      resposta:
        "Não. A reabilitação oral também é indicada para quem tem todos os dentes, mas apresenta desgaste, mordida alterada, restaurações extensas ou trincas. O critério não é a quantidade de dentes ausentes, e sim se o caso exige mais de um procedimento em ordem planejada.",
    },
    {
      pergunta: "Dá para fazer a reabilitação oral por partes?",
      resposta:
        "Sim, e na maioria dos casos é assim que acontece. O plano é dividido em etapas com começo e fim definidos, o que permite avançar conforme a possibilidade do paciente. O que não muda é a ordem: algumas etapas dependem da anterior estar concluída, e pular essa sequência compromete o resultado.",
    },
    {
      pergunta: "Onde fazer reabilitação oral em Indaiatuba?",
      resposta:
        "A Lemarc Odontologia, na Rua Cinco de Julho, 697 – Sala 2, Centro, Indaiatuba/SP, trabalha com reabilitação oral como foco principal. A avaliação e o planejamento são conduzidos pela Dra. Letícia Marcondes (CRO-SP 139458) e as etapas especializadas por profissionais parceiros de implantodontia, endodontia e ortodontia. Agendamento pelo WhatsApp (19) 3894-5273.",
    },
  ],
};

/* ----------------------------------------------------- estética dental -- */

const ESTETICA: BlocoGeo = {
  resumo:
    "Odontologia estética é a área que trata da aparência do sorriso — cor, formato, tamanho e proporção dos dentes — sem separar isso da função. Na Lemarc Odontologia, em Indaiatuba/SP, nenhum tratamento estético é indicado sem avaliação presencial, e todo caso passa antes por uma checagem de saúde bucal: estética instalada sobre problema não resolvido não dura.",
  secoes: [
    {
      titulo: "O que a odontologia estética resolve",
      paragrafos: [
        "As queixas estéticas chegam de formas diferentes, mas quase sempre caem em uma destas situações:",
      ],
      lista: [
        "Dentes escurecidos, amarelados ou com manchas",
        "Dentes lascados, desgastados ou com formato irregular",
        "Diferença de tamanho ou de altura entre um dente e o vizinho",
        "Espaços visíveis entre os dentes",
        "Restaurações antigas com cor destoante do restante do sorriso",
        "Dentes desalinhados ou girados, que mudam a linha do sorriso",
      ],
    },
    {
      titulo: "Tratamentos estéticos disponíveis na Lemarc",
      paragrafos: [
        "A escolha entre eles não é preferência do paciente nem do dentista: é consequência do diagnóstico. Um mesmo objetivo — “quero os dentes mais claros e alinhados” — pode ser alcançado por caminhos de complexidade muito diferente.",
      ],
      lista: [
        "Clareamento dental — atua na cor, preservando a estrutura do dente",
        "Facetas e lentes de contato dental — atuam em cor, forma e proporção ao mesmo tempo",
        "Coroas e próteses estéticas — quando o dente perdeu estrutura e precisa ser reconstruído",
        "Ortodontia e Invisalign — quando a questão é posição, e não superfície",
      ],
      linkPara: { path: "/lentes-de-contato-dental", texto: "Ver facetas e lentes de contato" },
    },
    {
      titulo: "Estética depois da saúde — nessa ordem",
      paragrafos: [
        "Um dente com cárie ativa não recebe faceta. Uma gengiva inflamada não recebe clareamento. Um dente que precisa de canal não recebe coroa antes disso. Parecem regras óbvias, mas são a causa mais comum de tratamento estético que descola, mancha na borda ou precisa ser refeito em pouco tempo.",
        "Na Lemarc, a avaliação estética inclui o exame de saúde bucal completo justamente para descobrir isso antes — inclusive quando a resposta honesta é que o caso ainda não está pronto para a parte estética.",
      ],
    },
    {
      titulo: "Como o resultado é planejado antes de começar",
      paragrafos: [
        "Durante a avaliação são feitas fotografias intrabucais, mostradas na tela em tempo real. O paciente vê o próprio dente ampliado e entende o diagnóstico sem depender só da explicação verbal — o que também torna a conversa sobre expectativa estética muito mais concreta.",
        "O planejamento respeita as características individuais: proporção do rosto, formato dos dentes vizinhos, linha do sorriso e a idade do paciente. O objetivo declarado é resultado natural, não sorriso padronizado.",
      ],
      linkPara: { path: "/diferenciais", texto: "Ver como a clínica trabalha" },
    },
    {
      titulo: "Odontologia estética em Indaiatuba",
      paragrafos: [
        "A Lemarc Odontologia atende no Centro, em Indaiatuba/SP, com agendamento pelo WhatsApp (19) 3894-5273. Os tratamentos estéticos são conduzidos pela Dra. Letícia Marcondes (CRO-SP 139458), que atua em odontologia estética e dentística e cursa especialização em Prótese e Dentística no São Leopoldo Mandic, em Campinas.",
      ],
    },
  ],
  faqTitulo: "Perguntas frequentes sobre odontologia estética",
  faq: [
    {
      pergunta: "Lente de contato dental e faceta são a mesma coisa?",
      resposta:
        "São da mesma família, mas não são idênticas. Ambas são lâminas fixadas na frente do dente para corrigir cor e forma. A lente de contato dental é a versão mais fina, indicada quando o dente está estruturalmente bom e a correção é sutil. A faceta é mais espessa e resolve alterações maiores de forma, tamanho ou escurecimento intenso. Qual das duas serve ao seu caso é definido no exame clínico.",
    },
    {
      pergunta: "Clareamento ou lente de contato: qual é o indicado no meu caso?",
      resposta:
        "Se a única queixa é a cor e os dentes estão bem posicionados e íntegros, o clareamento costuma ser o caminho — é o procedimento menos invasivo dos dois. Se além da cor há alteração de forma, tamanho, espaços entre os dentes ou desgaste, o clareamento sozinho não resolve. Em muitos casos os dois são combinados, com o clareamento feito antes para definir a cor de referência das peças.",
    },
    {
      pergunta: "Lente de contato dental precisa desgastar o dente?",
      resposta:
        "Depende do caso, e essa é a resposta honesta. Existem situações em que o preparo é mínimo ou praticamente nulo, e outras em que algum desgaste é necessário justamente para o resultado ficar natural — sem ele a peça fica volumosa e o sorriso denuncia. Só o exame clínico presencial define quanto preparo o seu caso pede. Desconfie de resposta fechada dada por mensagem, antes de qualquer avaliação.",
    },
    {
      pergunta: "Tratamento estético dura para sempre?",
      resposta:
        "Não. Nenhum procedimento estético é definitivo. A durabilidade depende do material, da higiene, dos hábitos do paciente (bruxismo, café, cigarro) e da manutenção periódica. O clareamento perde efeito com o tempo e pode ser reativado; facetas e lentes têm vida útil longa quando bem indicadas e acompanhadas. Isso é explicado na avaliação, antes da decisão.",
    },
    {
      pergunta: "Onde fazer odontologia estética em Indaiatuba?",
      resposta:
        "A Lemarc Odontologia, na Rua Cinco de Julho, 697 – Sala 2, Centro, Indaiatuba/SP, oferece clareamento dental, facetas, lentes de contato dental, coroas estéticas e ortodontia. O atendimento é particular, de segunda a sexta-feira, das 9h às 12h e das 14h às 18h, com agendamento pelo WhatsApp (19) 3894-5273.",
    },
  ],
};

/* -------------------------------------------------------- local / cidade -- */

const INDAIATUBA: BlocoGeo = {
  resumo:
    "A Lemarc Odontologia é uma clínica odontológica na Rua Cinco de Julho, 697 – Sala 2, Centro, Indaiatuba/SP (CEP 13330-220). O atendimento é exclusivamente particular, de segunda a sexta-feira, das 9h às 12h e das 14h às 18h, com agendamento pelo WhatsApp (19) 3894-5273. A responsável técnica é a Dra. Letícia Marcondes, CRO-SP 139458.",
  secoes: [
    {
      titulo: "Onde fica a clínica",
      paragrafos: [
        "O consultório fica no Centro de Indaiatuba, na Rua Cinco de Julho, 697 – Sala 2. É uma clínica de consultório próprio, com atendimento agendado — não há atendimento por ordem de chegada, o que evita espera e permite reservar o tempo necessário para cada avaliação.",
      ],
    },
    {
      titulo: "Quem atende",
      paragrafos: [
        "A Dra. Letícia Marcondes (CRO-SP 139458) recebe e avalia pessoalmente todos os pacientes da clínica. Formada em Odontologia pela Universidade Federal de Alfenas (UNIFAL-MG) em 2019, com quase 7 anos de atuação clínica, cursa especialização em Prótese e Dentística no São Leopoldo Mandic, em Campinas. Atua em clínica geral, odontologia estética e cirurgia oral menor.",
        "A partir do diagnóstico, as etapas especializadas são conduzidas por profissionais parceiros: Dr. Rick em implantes dentários, Dra. Juliana em tratamento de canal e Dra. Lara em ortodontia, incluindo alinhadores Invisalign. O paciente não é encaminhado para fora e recomeça do zero: o plano continua sendo o mesmo, coordenado pela Dra. Letícia.",
      ],
      linkPara: { path: "/sobre", texto: "Conhecer a equipe completa" },
    },
    {
      titulo: "Atendimento particular: o que muda na prática",
      paragrafos: [
        "A Lemarc não trabalha com convênios ou planos odontológicos. Isso tem uma consequência direta no tratamento: a indicação segue o que o caso pede, sem a limitação de material, de número de sessões ou de procedimento coberto que a tabela de um convênio impõe.",
        "A avaliação inicial é paga porque é uma consulta de diagnóstico — exame clínico completo, análise de imagens e planejamento inicial do caso. É também por isso que a clínica não passa valores de procedimento por WhatsApp: sem exame, qualquer número dado seria uma expectativa construída no escuro.",
      ],
    },
    {
      titulo: "Pacientes de Indaiatuba e região",
      paragrafos: [
        "Além de Indaiatuba, a clínica atende pacientes de Salto, Itu, Elias Fausto, Monte Mor, Capivari e Campinas. Para quem vem de fora, o cronograma de tratamento é montado agrupando etapas sempre que clinicamente possível, reduzindo o número de deslocamentos.",
      ],
    },
  ],
  faqTitulo: "Perguntas frequentes sobre o atendimento em Indaiatuba",
  faq: [
    {
      pergunta: "A Lemarc Odontologia atende convênio ou plano odontológico?",
      resposta:
        "Não. O atendimento é exclusivamente particular. A clínica não é credenciada a convênios nem a planos odontológicos.",
    },
    {
      pergunta: "Como agendar uma consulta na Lemarc Odontologia?",
      resposta:
        "O agendamento é feito pelo WhatsApp (19) 3894-5273, de segunda a sexta-feira. Também é possível enviar os dados pelo formulário do site, que abre a conversa no WhatsApp já preenchida. O atendimento é sempre com hora marcada.",
    },
    {
      pergunta: "Qual o horário de atendimento da clínica?",
      resposta:
        "De segunda a sexta-feira, das 9h às 12h e das 14h às 18h. A clínica não atende aos sábados, domingos e feriados.",
    },
    {
      pergunta: "A clínica atende pacientes de fora de Indaiatuba?",
      resposta:
        "Sim. A Lemarc Odontologia atende pacientes de Indaiatuba e região, incluindo Salto, Itu, Elias Fausto, Monte Mor, Capivari e Campinas. Para pacientes de outras cidades, as etapas do tratamento são agrupadas sempre que possível para reduzir deslocamentos.",
    },
    {
      pergunta: "Qual o endereço completo da Lemarc Odontologia?",
      resposta:
        "Rua Cinco de Julho, 697 – Sala 2, Centro, Indaiatuba – SP, CEP 13330-220.",
    },
  ],
};

/* ------------------------------------------------ blocos compactos ------- */

const SOBRE: BlocoGeo = {
  resumo:
    "A Lemarc Odontologia é dirigida pela Dra. Letícia Marcondes (CRO-SP 139458), formada em Odontologia pela Universidade Federal de Alfenas (UNIFAL-MG) em 2019, com quase 7 anos de atuação clínica e especialização em curso em Prótese e Dentística no São Leopoldo Mandic, em Campinas. Ela avalia pessoalmente cada paciente da clínica, em Indaiatuba/SP.",
  faqTitulo: "Perguntas frequentes sobre a equipe",
  faq: [
    {
      pergunta: "Quem é a Dra. Letícia Marcondes?",
      resposta:
        "Cirurgiã-dentista inscrita no CRO-SP sob o número 139458, formada pela Universidade Federal de Alfenas (UNIFAL-MG) em 2019. Atua em clínica geral, odontologia estética e cirurgia oral menor, e cursa especialização em Prótese e Dentística no São Leopoldo Mandic, em Campinas. É responsável pela avaliação, pelo diagnóstico e pelo planejamento de todos os pacientes da Lemarc Odontologia, em Indaiatuba.",
    },
    {
      pergunta: "Sempre sou atendido pela mesma dentista?",
      resposta:
        "A avaliação, o diagnóstico e o planejamento são sempre feitos pela Dra. Letícia. As etapas que exigem especialidade são executadas pelos profissionais parceiros — implantes com o Dr. Rick, tratamento de canal com a Dra. Juliana e ortodontia com a Dra. Lara — dentro do mesmo plano e na mesma clínica.",
    },
    {
      pergunta: "A clínica é especializada em quê?",
      resposta:
        "O foco principal da Lemarc Odontologia é reabilitação oral: recuperar dentes comprometidos, devolver função mastigatória e reconstruir a estética do sorriso dentro de um planejamento único. Os demais tratamentos oferecidos — implantes, próteses, estética, ortodontia e endodontia — são as peças desse planejamento.",
    },
  ],
};

const IMPLANTES: BlocoGeo = {
  resumo:
    "Implante dentário é uma peça fixada no osso que substitui a raiz de um dente perdido, servindo de base para a coroa ou prótese que ficará visível. Na Lemarc Odontologia, em Indaiatuba/SP, o procedimento é conduzido pelo Dr. Rick, com o planejamento desenvolvido junto à Dra. Letícia Marcondes na avaliação inicial.",
  faqTitulo: "Perguntas frequentes sobre implante dentário",
  faq: [
    {
      pergunta: "Qual a diferença entre pino e implante dentário?",
      resposta:
        "O pino é colocado dentro do próprio dente, normalmente depois de um tratamento de canal, para dar suporte a uma coroa — ou seja, o dente ainda existe. O implante substitui a raiz de um dente que já foi perdido por completo. São indicações diferentes para situações diferentes, e a confusão entre os dois é uma das dúvidas mais comuns na avaliação.",
    },
    {
      pergunta: "Colocar implante dói?",
      resposta:
        "O procedimento é feito sob anestesia local, então não há dor durante a cirurgia. O desconforto do pós-operatório varia conforme o caso e é controlado com a medicação prescrita. A orientação completa sobre o pós é entregue antes do procedimento.",
    },
    {
      pergunta: "Quanto tempo leva entre colocar o implante e ter o dente?",
      resposta:
        "Existe um período de integração entre o implante e o osso antes da instalação da prótese definitiva, e a duração depende do caso, da região da boca e da qualidade óssea. Esse prazo é estimado no planejamento, depois do exame — não é um número igual para todo mundo.",
    },
    {
      pergunta: "Onde fazer implante dentário em Indaiatuba?",
      resposta:
        "Na Lemarc Odontologia, Rua Cinco de Julho, 697 – Sala 2, Centro, Indaiatuba/SP. A avaliação e o planejamento são feitos pela Dra. Letícia Marcondes (CRO-SP 139458) e a cirurgia pelo Dr. Rick. Agendamento pelo WhatsApp (19) 3894-5273.",
    },
  ],
};

const PROTESES: BlocoGeo = {
  resumo:
    "Prótese dentária é a peça que repõe a parte visível de um dente, instalada sobre um implante ou sobre um dente natural preparado. Na Lemarc Odontologia, em Indaiatuba/SP, a indicação entre coroa sobre dente, coroa sobre implante e próteses mais amplas é definida caso a caso, na avaliação com a Dra. Letícia Marcondes.",
  faqTitulo: "Perguntas frequentes sobre próteses e coroas",
  faq: [
    {
      pergunta: "Qual a diferença entre coroa e prótese dentária?",
      resposta:
        "Coroa é a peça que cobre um único dente — seja um dente natural preparado, seja um implante. Prótese é o termo mais amplo, que inclui a coroa e também as soluções que repõem vários dentes de uma vez. Toda coroa é uma prótese; nem toda prótese é uma coroa.",
    },
    {
      pergunta: "Prótese sobre dente ou sobre implante: qual é melhor?",
      resposta:
        "Não existe resposta geral. A coroa sobre dente natural preserva a raiz que ainda existe e é a escolha quando o dente tem estrutura suficiente. A coroa sobre implante é a solução quando o dente já foi perdido. O que define é o exame clínico e a análise das imagens — não a preferência.",
    },
    {
      pergunta: "Prótese antiga precisa ser trocada?",
      resposta:
        "Nem sempre, mas próteses que soltam, machucam, mudaram de encaixe ou escureceram na borda merecem reavaliação. Prótese mal adaptada costuma comprometer o dente ou o osso que está embaixo dela, e o problema evolui sem dor.",
    },
  ],
};

const LENTES: BlocoGeo = {
  resumo:
    "Facetas e lentes de contato dental são lâminas de cerâmica fixadas na frente do dente para corrigir cor, formato e proporção. Na Lemarc Odontologia, em Indaiatuba/SP, cada caso é avaliado presencialmente antes de qualquer indicação — a espessura e o preparo necessários variam conforme o dente.",
  faqTitulo: "Perguntas frequentes sobre facetas e lentes de contato",
  faq: [
    {
      pergunta: "Lente de contato dental e faceta são a mesma coisa?",
      resposta:
        "São variações da mesma solução. A lente de contato dental é a versão mais fina, para correções sutis em dentes estruturalmente bons. A faceta é mais espessa e resolve alterações maiores de forma, tamanho ou escurecimento. A escolha é consequência do exame clínico.",
    },
    {
      pergunta: "Quantas lentes de contato dental preciso fazer?",
      resposta:
        "Depende de quantos dentes aparecem quando você sorri e de quais deles precisam de correção. Fazer em um dente isolado é possível, mas exige atenção redobrada à cor para que ele não destoe dos vizinhos. Isso é definido no planejamento.",
    },
    {
      pergunta: "Preciso clarear os dentes antes de colocar as lentes?",
      resposta:
        "Em muitos casos, sim. A cerâmica não clareia depois de instalada, então o clareamento é feito antes para definir a cor de referência das peças e dos dentes que continuarão naturais. Se essa ordem for invertida, o resultado pode ficar com dois tons no mesmo sorriso.",
    },
  ],
};

const CLAREAMENTO: BlocoGeo = {
  resumo:
    "Clareamento dental é o procedimento que age na cor do dente sem remover estrutura, indicado após avaliação da saúde bucal. Na Lemarc Odontologia, em Indaiatuba/SP, o clareamento só é indicado depois do exame clínico — dentes com cárie, gengiva inflamada ou restaurações a substituir precisam ser tratados antes.",
  faqTitulo: "Perguntas frequentes sobre clareamento dental",
  faq: [
    {
      pergunta: "Clareamento dental danifica o esmalte do dente?",
      resposta:
        "Quando feito com indicação correta, produto adequado e acompanhamento profissional, o clareamento não remove estrutura do dente. O risco está no uso sem avaliação — em dente com cárie, trinca ou gengiva inflamada, e em produtos de origem duvidosa aplicados sem supervisão.",
    },
    {
      pergunta: "Clareamento causa sensibilidade?",
      resposta:
        "Sensibilidade temporária é o efeito mais comum e costuma passar depois do tratamento. A intensidade varia de pessoa para pessoa e pode ser reduzida com ajuste do protocolo e produtos dessensibilizantes. Quem já tem sensibilidade prévia deve informar isso na avaliação.",
    },
    {
      pergunta: "Quanto tempo dura o clareamento dental?",
      resposta:
        "O resultado não é permanente. A duração depende dos hábitos do paciente — café, chá, vinho tinto, refrigerante escuro e cigarro aceleram o reescurecimento — e da manutenção periódica. O clareamento pode ser reativado depois, conforme orientação.",
    },
    {
      pergunta: "Restauração e prótese clareiam junto com o dente?",
      resposta:
        "Não. Resina, cerâmica e prótese mantêm a cor original, o que pode gerar diferença de tom depois do clareamento dos dentes naturais. Por isso o planejamento define se alguma restauração precisará ser substituída depois — e isso é avisado antes de começar.",
    },
  ],
};

const CANAL: BlocoGeo = {
  resumo:
    "Tratamento de canal, ou endodontia, é o procedimento que remove a polpa do dente comprometida por cárie profunda, infecção ou trauma, com o objetivo de eliminar a infecção e preservar o dente natural. Na Lemarc Odontologia, em Indaiatuba/SP, é conduzido pela Dra. Juliana, a partir do diagnóstico feito pela Dra. Letícia Marcondes.",
  faqTitulo: "Perguntas frequentes sobre tratamento de canal",
  faq: [
    {
      pergunta: "Tratamento de canal dói?",
      resposta:
        "O procedimento é feito sob anestesia, então a dor durante o tratamento não é esperada. A dor que o paciente associa ao canal costuma ser a dor que o levou até a clínica — a da inflamação ou infecção antes de tratar. O tratamento é o que resolve essa dor, não o que a causa.",
    },
    {
      pergunta: "Depois do canal preciso de coroa?",
      resposta:
        "Com frequência, sim. O dente tratado perde estrutura interna e fica mais sujeito a fratura, principalmente nos dentes de trás, que recebem mais carga na mastigação. Muitas vezes é preciso reforçá-lo com um pino e cobri-lo com uma coroa. Essa decisão faz parte do planejamento, não é um extra descoberto depois.",
    },
    {
      pergunta: "É melhor fazer canal ou extrair e colocar implante?",
      resposta:
        "Sempre que o dente natural tem estrutura e osso de suporte suficientes, preservá-lo é a primeira escolha — nenhuma substituição reproduz integralmente o dente original. A extração seguida de implante entra quando o dente não tem mais condição de ser mantido. A definição vem do exame clínico e das imagens, caso a caso.",
    },
  ],
};

const ORTODONTIA: BlocoGeo = {
  resumo:
    "Ortodontia é a área que corrige a posição dos dentes e a mordida, com aparelho convencional, autoligado ou alinhador transparente Invisalign. Na Lemarc Odontologia, em Indaiatuba/SP, os tratamentos ortodônticos são conduzidos pela Dra. Lara, com escaneamento intraoral para o planejamento digital.",
  faqTitulo: "Perguntas frequentes sobre ortodontia e Invisalign",
  faq: [
    {
      pergunta: "Qual a diferença entre aparelho convencional, autoligado e Invisalign?",
      resposta:
        "O aparelho convencional usa braquetes fixos com amarração elástica. O autoligado usa braquetes com sistema de travamento próprio, sem elástico. O Invisalign é um conjunto de alinhadores transparentes removíveis, planejados digitalmente a partir de escaneamento intraoral. Os três movimentam dentes; mudam a discrição, o conforto e o tipo de caso para o qual cada um é mais indicado.",
    },
    {
      pergunta: "Invisalign serve para qualquer caso?",
      resposta:
        "Não para todos. O alinhador transparente resolve uma faixa ampla de casos, mas há situações — movimentos mais complexos, alterações esqueléticas — em que o aparelho fixo tem melhor previsibilidade. A indicação vem da avaliação ortodôntica, não da preferência estética.",
    },
    {
      pergunta: "Ortodontia é só estética?",
      resposta:
        "Não. Dentes fora de posição alteram a distribuição da força na mastigação, dificultam a higiene em pontos específicos e podem gerar desgaste desigual ao longo dos anos. O alinhamento tem efeito estético evidente, mas o motivo clínico costuma ser funcional.",
    },
  ],
};

const DIFERENCIAIS: BlocoGeo = {
  resumo:
    "A Lemarc Odontologia utiliza micromotor elétrico, fotografia intrabucal mostrada ao paciente em tempo real, lupa cirúrgica de aumento e critério rigoroso na seleção de materiais. São escolhas voltadas a reduzir desconforto, aumentar a precisão e tornar o diagnóstico compreensível para quem está na cadeira.",
  faqTitulo: "Perguntas frequentes sobre a experiência do atendimento",
  faq: [
    {
      pergunta: "O tratamento na Lemarc dói?",
      resposta:
        "Na maioria dos casos, não. A clínica usa micromotor elétrico, que reduz muito o barulho e a vibração — o principal motivo de desconforto relatado por pacientes em consultório — além de anestesia adequada a cada procedimento.",
    },
    {
      pergunta: "Vou entender o que está sendo feito na minha boca?",
      resposta:
        "Sim, e isso é parte do método. Durante a avaliação são feitas fotografias intrabucais mostradas na tela em tempo real, para que o paciente veja exatamente o que o dentista está observando. O plano de tratamento é apresentado por etapas, com cada procedimento explicado antes de começar.",
    },
  ],
};

const CONTATO: BlocoGeo = {
  resumo:
    "O agendamento na Lemarc Odontologia é feito pelo WhatsApp (19) 3894-5273, de segunda a sexta-feira, das 9h às 12h e das 14h às 18h. A clínica fica na Rua Cinco de Julho, 697 – Sala 2, Centro, Indaiatuba/SP, e o atendimento é exclusivamente particular, com hora marcada.",
  faqTitulo: "Antes de agendar",
  faq: [
    {
      pergunta: "A clínica passa valores de procedimento pelo WhatsApp?",
      resposta:
        "Não. Cada caso é único e depende do exame clínico e da análise de imagens, então valores só são apresentados depois da avaliação presencial, junto com o plano de tratamento. Passar número antes disso criaria uma expectativa que o exame provavelmente contradiria.",
    },
    {
      pergunta: "O que acontece na primeira consulta?",
      resposta:
        "A avaliação inclui exame clínico completo, fotografia intrabucal, análise das imagens necessárias e o planejamento inicial do caso. Ao final, o paciente sai sabendo qual é o diagnóstico, quais são as opções de tratamento e em que ordem elas fazem sentido.",
    },
  ],
};

/* ------------------------------------------------------------- registro -- */

export const geoPorRota: Record<string, BlocoGeo> = {
  "/": HOME,
  "/sobre": SOBRE,
  "/reabilitacao-oral": REABILITACAO,
  "/implantes-dentarios": IMPLANTES,
  "/proteses-e-coroas": PROTESES,
  "/lentes-de-contato-dental": LENTES,
  "/clareamento-dental": CLAREAMENTO,
  "/tratamento-de-canal": CANAL,
  "/ortodontia-e-invisalign": ORTODONTIA,
  "/odontologia-estetica": ESTETICA,
  "/diferenciais": DIFERENCIAIS,
  "/dentista-em-indaiatuba": INDAIATUBA,
  "/contato": CONTATO,
};

export const geoDaRota = (path: string): BlocoGeo | undefined => geoPorRota[path];

/** Perguntas de uma rota — alimenta o `FAQPage` daquela página e o llms.txt. */
export const perguntasDaRota = (path: string): PerguntaGeo[] => geoDaRota(path)?.faq ?? [];

/**
 * Ficha da clínica em pares rótulo/valor. Formato tabular é o que motores
 * generativos extraem com menor chance de erro — cada linha é um fato fechado.
 * Os valores repetem `content/site.ts` de propósito: aqui eles são conteúdo
 * visível e citável, lá são dados de configuração.
 */
export const fichaClinica: { rotulo: string; valor: string }[] = [
  { rotulo: "Nome", valor: "Lemarc Odontologia" },
  { rotulo: "Responsável técnica", valor: "Dra. Letícia Marcondes — CRO-SP 139458" },
  { rotulo: "Especialidade principal", valor: "Reabilitação oral e odontologia estética" },
  { rotulo: "Endereço", valor: "Rua Cinco de Julho, 697 – Sala 2, Centro" },
  { rotulo: "Cidade", valor: "Indaiatuba – SP, CEP 13330-220" },
  { rotulo: "Horário", valor: "Segunda a sexta, das 9h às 12h e das 14h às 18h" },
  { rotulo: "Agendamento", valor: "WhatsApp (19) 3894-5273 — com hora marcada" },
  { rotulo: "Forma de atendimento", valor: "Exclusivamente particular (não atende convênio)" },
  { rotulo: "Cidades atendidas", valor: "Indaiatuba, Salto, Itu, Elias Fausto, Monte Mor, Capivari e Campinas" },
];
