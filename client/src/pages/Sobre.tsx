import { Pagina } from "@/components/Layout";
import { CtaFinal, Depoimentos, Surge, TopoPagina } from "@/components/Secoes";
import { site } from "@/content/site";
import { home, sobre } from "@/content/pages";
import { dentistSchema, useSeo } from "@/lib/seo";

export default function Sobre() {
  useSeo({ ...sobre.meta, path: sobre.path, jsonLd: dentistSchema });

  return (
    <Pagina>
      <TopoPagina titulo={sobre.h1} sobrelinha="Sobre a Lemarc" trilha={[{ label: "Sobre" }]} />

      <section className="secao fundo-creme">
        <div className="wrap duas-colunas alinha-topo">
          <div className="conteudo-longo">
            {sobre.corpo.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <h2 style={{ marginTop: "1.8em" }}>{sobre.compromissoTitulo}</h2>
            <ul className="lista-marcada">
              {sobre.compromisso.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <figure className="coluna-figura" style={{ margin: 0 }}>
            <img
              src={site.fotos.retrato.src}
              alt={site.fotos.retrato.alt}
              width={1000}
              height={1270}
            />
            <figcaption style={{ marginTop: 14, fontSize: ".87rem", color: "var(--tinta-suave)" }}>
              {site.doctor} — {site.cro}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="secao fundo-branco">
        <div className="wrap">
          <Surge>
            <p className="sobrelinha">Credenciais</p>
            <ul className="lista-marcada duas" style={{ marginBottom: 24 }}>
              {home.credenciais.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Surge>
        </div>
      </section>

      <section className="secao fundo-creme">
        <div className="wrap">
          <Surge>
            <p className="sobrelinha">Equipe</p>
            <h2>{sobre.equipeTitulo}</h2>
            <p className="chamada" style={{ marginBottom: 46 }}>
              {sobre.equipeIntro}
            </p>
          </Surge>
          <div className="grade-equipe">
            {sobre.equipe.map((pessoa) => (
              <article key={pessoa.nome}>
                <h3>{pessoa.nome}</h3>
                {pessoa.registro && <span className="registro">{pessoa.registro}</span>}
                <p>{pessoa.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {site.showTestimonials && <Depoimentos />}

      <CtaFinal
        titulo="Seu sorriso merece um tratamento que considera você por completo."
        texto="Fale com a nossa equipe e agende a sua avaliação com a Dra. Letícia."
        contexto="quero conhecer a clínica"
      />
    </Pagina>
  );
}
