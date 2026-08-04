import { Link } from "wouter";
import { Pagina } from "@/components/Layout";
import {
  Acordeao,
  Carrossel,
  CtaFinal,
  Depoimentos,
  GradeTratamentos,
  Manifesto,
  SecaoContato,
  Surge,
} from "@/components/Secoes";
import { MarcaLemarcContorno } from "@/components/Brand";
import { IconeSeta, IconeWhatsapp, iconesDiferencial } from "@/components/Icones";
import { agendarUrl, site } from "@/content/site";
import { diferenciais, faq, home, reabilitacao, sobre } from "@/content/pages";
import { useSeo } from "@/lib/seo";
import { rota } from "@/content/rotas";

export default function Home() {
  useSeo(rota(home.path));

  return (
    <Pagina heroTransparente>
      <section className="hero">
        <MarcaLemarcContorno className="marca-dagua" />
        <div className="wrap hero-grid">
          <div>
            <h1>
              <span className="marca-nome">{home.h1Eyebrow}</span>
              {home.h1}
            </h1>
            <p className="hero-sub">{home.subheadline}</p>
            <div className="linha-botoes">
              <a className="botao" href={agendarUrl()} target="_blank" rel="noreferrer">
                <IconeWhatsapp /> {site.ctas.primary}
              </a>
              <Link className="botao botao-vazado" href={sobre.path}>
                Conheça a Lemarc
              </Link>
            </div>
          </div>

          <figure className="hero-figura" style={{ margin: 0 }}>
            <img
              src={site.fotos.principal.src}
              alt={site.fotos.principal.alt}
              width={1066}
              height={1600}
              fetchPriority="high"
            />
            <figcaption className="hero-selo">
              {site.doctor}
              <br />
              {site.cro}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="credenciais">
        <div className="wrap">
          <ul className="credenciais-grid">
            {home.credenciais.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="secao fundo-branco">
        <div className="wrap">
          <Surge>
            <p className="sobrelinha">A clínica</p>
            <h2 style={{ maxWidth: "24ch" }}>Atendimento humanizado em todas as fases da vida</h2>
            <div className="duas-colunas alinha-topo" style={{ marginBottom: 54 }}>
              <p className="chamada">{home.abertura[0]}</p>
              <p className="chamada">{home.abertura[1]}</p>
            </div>
          </Surge>
          <Surge>
            <Carrossel
              slides={[
                {
                  src: site.fotos.recepcao.src,
                  alt: site.fotos.recepcao.alt,
                  legenda: `${site.doctor} — ${site.cro}. Recebe e avalia pessoalmente cada paciente da clínica.`,
                },
                {
                  src: site.fotos.consultorio.src,
                  alt: site.fotos.consultorio.alt,
                  legenda:
                    "Consultório próprio em Indaiatuba, preparado para atendimentos clínicos e cirúrgicos.",
                },
                {
                  src: site.fotos.diagnostico.src,
                  alt: site.fotos.diagnostico.alt,
                  legenda:
                    "Todo tratamento começa por um diagnóstico cuidadoso — nada é feito sem entender a causa.",
                },
                {
                  src: site.fotos.planejamento.src,
                  alt: site.fotos.planejamento.alt,
                  legenda:
                    "O planejamento é apresentado por etapas, com cada procedimento explicado antes de começar.",
                },
                {
                  src: site.fotos.clinica.src,
                  alt: site.fotos.clinica.alt,
                  legenda:
                    "Atendimento para toda a família — da primeira consulta da criança à reabilitação do adulto.",
                },
              ]}
            />
          </Surge>
        </div>
      </section>

      <Manifesto />

      <section className="secao fundo-nuvem">
        <div className="wrap">
          <Surge>
            <p className="sobrelinha">Tratamentos</p>
            <h2>{reabilitacao.tratamentosTitulo}</h2>
            <p className="chamada" style={{ marginBottom: 46 }}>
              {reabilitacao.corpo[0]}
            </p>
          </Surge>
          <GradeTratamentos />
          <div className="linha-botoes">
            <Link className="botao botao-vazado" href={reabilitacao.path}>
              Entenda a reabilitação oral
            </Link>
          </div>
        </div>
      </section>

      <section className="secao fundo-branco">
        <div className="wrap duas-colunas">
          <div>
            <p className="sobrelinha">Sobre a Lemarc</p>
            <h2>{sobre.h1}</h2>
            <p>{sobre.corpo[0]}</p>
            <h3 style={{ marginTop: "1.6em" }}>{sobre.compromissoTitulo}</h3>
            <ul className="lista-marcada">
              {sobre.compromisso.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="linha-botoes">
              <Link className="link-seta" href={sobre.path}>
                Conheça a equipe completa <IconeSeta />
              </Link>
            </div>
          </div>
          <figure className="coluna-figura" style={{ margin: 0 }}>
            <img
              src={site.fotos.consultorio.src}
              alt={site.fotos.consultorio.alt}
              loading="lazy"
              width={1066}
              height={1600}
            />
          </figure>
        </div>
      </section>

      <section className="secao fundo-nuvem">
        <div className="wrap">
          <Surge>
            <p className="sobrelinha">Diferenciais</p>
            <h2>{diferenciais.h1}</h2>
            <p className="chamada" style={{ marginBottom: 46 }}>
              {diferenciais.corpo}
            </p>
          </Surge>
          <div className="grade-diferenciais">
            {diferenciais.itens.map((item) => {
              const Icone = iconesDiferencial[item.icone];
              return (
                <article key={item.titulo}>
                  <Icone />
                  <h3>{item.titulo}</h3>
                  <p>{item.texto}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="secao fundo-branco">
        <div className="wrap-estreito">
          <Surge>
            <p className="sobrelinha">Dúvidas frequentes</p>
            <h2>{faq.h1}</h2>
          </Surge>
          <Acordeao itens={faq.itens.slice(0, 4)} />
          <div className="linha-botoes">
            <Link className="link-seta" href={faq.path}>
              Ver todas as perguntas <IconeSeta />
            </Link>
          </div>
        </div>
      </section>

      {site.showTestimonials && <Depoimentos />}

      <CtaFinal titulo={home.chamadaFinal} />

      <SecaoContato
        titulo="Agende sua avaliação"
        texto="Dê o primeiro passo para recuperar a qualidade de vida do seu sorriso. Fale com a nossa equipe e agende sua avaliação."
        origem="home"
      />
    </Pagina>
  );
}
