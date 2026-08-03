import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "wouter";
import useEmblaCarousel from "embla-carousel-react";
import * as Accordion from "@radix-ui/react-accordion";
import { z } from "zod";
import { MarcaLemarc } from "@/components/Brand";
import {
  IconeChevron,
  IconeEmail,
  IconeLocal,
  IconeRelogio,
  IconeSeta,
  IconeSetaEsquerda,
  IconeWhatsapp,
  iconesTratamento,
} from "@/components/Icones";
import { agendarUrl, site, whatsappUrl } from "@/content/site";
import {
  depoimentos as copyDepoimentos,
  manifesto,
  pilarCards,
  reabilitacao,
  type Procedimento,
} from "@/content/pages";

/* ------------------------------------------------------------ animação -- */

export function Surge({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`surge ${className}`.trim()} data-visivel={visivel}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------- topo de página -- */

export function Migalhas({ trilha }: { trilha: { href?: string; label: string }[] }) {
  return (
    <nav className="migalhas" aria-label="Trilha de navegação">
      <Link href="/">Início</Link>
      {trilha.map((item) => (
        <span key={item.label} style={{ display: "contents" }}>
          <span aria-hidden="true">/</span>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function TopoPagina({
  titulo,
  sobrelinha,
  trilha,
  children,
}: {
  titulo: string;
  sobrelinha?: string;
  trilha: { href?: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="pagina-topo">
      <div className="wrap">
        <Migalhas trilha={trilha} />
        {sobrelinha && <p className="sobrelinha">{sobrelinha}</p>}
        <h1>{titulo}</h1>
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ manifesto -- */

export function Manifesto() {
  return (
    <section className="secao fundo-verde">
      <div className="wrap-estreito manifesto">
        <Surge>
          <MarcaLemarc className="marca-petala" />
          <blockquote>{manifesto.frase}</blockquote>
          <p>{manifesto.texto}</p>
        </Surge>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ carrossel -- */

type Slide = { src: string; alt: string; legenda: string };

export function Carrossel({ slides }: { slides: Slide[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", loop: false, containScroll: "trimSnaps" });
  const [indice, setIndice] = useState(0);
  const [podeVoltar, setPodeVoltar] = useState(false);
  const [podeAvancar, setPodeAvancar] = useState(true);

  const atualizar = useCallback(() => {
    if (!embla) return;
    setIndice(embla.selectedScrollSnap());
    setPodeVoltar(embla.canScrollPrev());
    setPodeAvancar(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    atualizar();
    embla.on("select", atualizar).on("reInit", atualizar);
  }, [embla, atualizar]);

  return (
    <div className="carrossel">
      <div className="carrossel-janela" ref={emblaRef}>
        <div className="carrossel-trilho">
          {slides.map((slide) => (
            <div className="carrossel-item" key={slide.src}>
              <figure>
                <img src={slide.src} alt={slide.alt} loading="lazy" />
                <figcaption>{slide.legenda}</figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="carrossel-controles">
        <button
          className="carrossel-botao"
          type="button"
          onClick={() => embla?.scrollPrev()}
          disabled={!podeVoltar}
          aria-label="Foto anterior"
        >
          <IconeSetaEsquerda />
        </button>
        <button
          className="carrossel-botao"
          type="button"
          onClick={() => embla?.scrollNext()}
          disabled={!podeAvancar}
          aria-label="Próxima foto"
        >
          <IconeSeta />
        </button>
        <div className="carrossel-pontos">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              className="carrossel-ponto"
              type="button"
              data-ativo={i === indice}
              onClick={() => embla?.scrollTo(i)}
              aria-label={`Ir para a foto ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- tratamentos -- */

export function GradeTratamentos({ itens = pilarCards }: { itens?: Procedimento[] }) {
  return (
    <div className="grade-tratamentos">
      {itens.map((item) => {
        const Icone = iconesTratamento[item.icone];
        return (
          <Link className="card-tratamento" href={item.path} key={item.path}>
            <Icone className="icone" />
            <h3>{item.card}</h3>
            <p>{item.resumo}</p>
            <span className="link-seta">
              Ver tratamento <IconeSeta />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function AvisoPilar() {
  return (
    <div className="aviso-pilar">
      <p>
        Este tratamento faz parte de um planejamento maior. Entenda como ele se encaixa na
        reabilitação oral completa.
      </p>
      <Link className="botao botao-vazado" href={reabilitacao.path}>
        Ver reabilitação oral
      </Link>
    </div>
  );
}

/* ----------------------------------------------------------------- FAQ --- */

export function Acordeao({ itens }: { itens: { pergunta: string; resposta: string }[] }) {
  return (
    <Accordion.Root type="single" collapsible>
      {itens.map((item) => (
        <Accordion.Item className="acordeao-item" value={item.pergunta} key={item.pergunta}>
          <Accordion.Header>
            <Accordion.Trigger className="acordeao-gatilho">
              {item.pergunta}
              <IconeChevron />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="acordeao-conteudo">
            <p>{item.resposta}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

/* --------------------------------------------------------------- CTA ----- */

export function CtaFinal({
  titulo,
  texto,
  contexto,
}: {
  titulo: string;
  texto?: string;
  contexto?: string;
}) {
  return (
    <section className="secao fundo-verde">
      <div className="wrap cta-final">
        <Surge>
          <MarcaLemarc className="marca-petala" />
          <h2>{titulo}</h2>
          {texto && <p>{texto}</p>}
          <div className="linha-botoes">
            <a className="botao botao-claro" href={agendarUrl(contexto)} target="_blank" rel="noreferrer">
              <IconeWhatsapp /> {site.ctas.primary}
            </a>
          </div>
        </Surge>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- depoimentos -- */

export function Depoimentos() {
  return (
    <section className="secao fundo-creme">
      <div className="wrap">
        <p className="sobrelinha">Depoimentos</p>
        <h2>{copyDepoimentos.h1}</h2>
        {copyDepoimentos.itens.length > 0 ? (
          <div className="grade-depoimentos">
            {copyDepoimentos.itens.map((d) => (
              <blockquote className="card-depoimento" key={d.nome}>
                <p>{d.texto}</p>
                <cite>{d.nome}</cite>
              </blockquote>
            ))}
          </div>
        ) : (
          <div className="depoimentos-vazio">
            <p>{copyDepoimentos.placeholder}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- contato --- */

export function DadosContato() {
  return (
    <div className="dados-contato">
      <div className="dado">
        <IconeLocal />
        <div>
          <strong>Endereço</strong>
          <p>
            {site.address.street}
            <br />
            {site.address.district} — {site.address.city}/{site.address.state}
            <br />
            CEP {site.address.zip}
          </p>
          <p style={{ marginTop: 8 }}>
            <a href={site.address.mapsUrl} target="_blank" rel="noreferrer" className="link-seta">
              Ver no Google Maps <IconeSeta />
            </a>
          </p>
        </div>
      </div>
      <div className="dado">
        <IconeRelogio />
        <div>
          <strong>Horários</strong>
          <p>{site.hours}</p>
        </div>
      </div>
      <div className="dado">
        <IconeWhatsapp />
        <div>
          <strong>WhatsApp</strong>
          <p>
            <a href={agendarUrl()} target="_blank" rel="noreferrer">
              {site.whatsappDisplay}
            </a>
          </p>
        </div>
      </div>
      <div className="dado">
        <IconeEmail />
        <div>
          <strong>E-mail</strong>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

const esquema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome."),
  telefone: z.string().trim().min(8, "Informe um telefone/WhatsApp válido."),
  email: z.string().trim().email("Informe um e-mail válido.").or(z.literal("")),
  mensagem: z.string().trim().optional(),
});

const vazio = { nome: "", telefone: "", email: "", mensagem: "" };

/** O formulário não grava nada: monta a mensagem e abre a conversa no WhatsApp. */
export function Formulario({ origem }: { origem: string }) {
  const [valores, setValores] = useState(vazio);
  const [erros, setErros] = useState<Record<string, string>>({});

  const enviar = (evento: FormEvent) => {
    evento.preventDefault();
    const resultado = esquema.safeParse(valores);
    if (!resultado.success) {
      const proximos: Record<string, string> = {};
      resultado.error.issues.forEach((i) => {
        proximos[String(i.path[0])] = i.message;
      });
      setErros(proximos);
      return;
    }
    setErros({});
    const d = resultado.data;
    const partes = [
      `Olá! Vim pelo site da Lemarc Odontologia (${origem}) e gostaria de agendar uma avaliação.`,
      `Nome: ${d.nome}`,
      `Telefone/WhatsApp: ${d.telefone}`,
      d.email ? `E-mail: ${d.email}` : null,
      d.mensagem ? `Mensagem: ${d.mensagem}` : null,
    ].filter(Boolean);
    window.open(whatsappUrl(partes.join(" ")), "_blank", "noopener");
  };

  const campo = (chave: keyof typeof vazio, rotulo: string, tipo = "text") => (
    <label className="campo">
      <span>{rotulo}</span>
      <input
        type={tipo}
        value={valores[chave]}
        onChange={(e) => setValores({ ...valores, [chave]: e.target.value })}
        aria-invalid={!!erros[chave]}
        autoComplete={chave === "nome" ? "name" : chave === "telefone" ? "tel" : chave === "email" ? "email" : undefined}
      />
      {erros[chave] && <small role="alert">{erros[chave]}</small>}
    </label>
  );

  return (
    <form className="formulario" onSubmit={enviar} noValidate>
      <div className="form-duplo">
        {campo("nome", "Nome")}
        {campo("telefone", "Telefone / WhatsApp", "tel")}
      </div>
      {campo("email", "E-mail (opcional)", "email")}
      <label className="campo">
        <span>Mensagem</span>
        <textarea
          rows={4}
          value={valores.mensagem}
          onChange={(e) => setValores({ ...valores, mensagem: e.target.value })}
        />
      </label>
      <button className="botao" type="submit" style={{ width: "100%" }}>
        <IconeWhatsapp /> {site.ctas.whatsapp}
      </button>
      <p className="form-nota">
        Ao enviar, abrimos a conversa no WhatsApp com os seus dados preenchidos. Atendimento
        particular, de segunda a sexta-feira.
      </p>
    </form>
  );
}

/* ---------------------------------------------------- seção de contato --- */

export function SecaoContato({
  titulo,
  texto,
  origem,
}: {
  titulo: string;
  texto: string;
  origem: string;
}) {
  return (
    <section className="secao fundo-creme" id="agendar">
      <div className="wrap">
        <p className="sobrelinha">Agendamento</p>
        <h2>{titulo}</h2>
        <p className="chamada" style={{ marginBottom: 46 }}>
          {texto}
        </p>
        <div className="grade-contato">
          <DadosContato />
          <Formulario origem={origem} />
        </div>
      </div>
    </section>
  );
}
