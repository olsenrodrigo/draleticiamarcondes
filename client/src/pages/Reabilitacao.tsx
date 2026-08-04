import { Pagina } from "@/components/Layout";
import { CtaFinal, GradeTratamentos, Surge, TopoPagina } from "@/components/Secoes";
import { IconeWhatsapp } from "@/components/Icones";
import { agendarUrl, site } from "@/content/site";
import { reabilitacao } from "@/content/pages";
import { useSeo } from "@/lib/seo";
import { rota } from "@/content/rotas";

export default function Reabilitacao() {
  useSeo(rota(reabilitacao.path));

  return (
    <Pagina>
      <TopoPagina
        titulo={reabilitacao.h1}
        sobrelinha="Página-pilar"
        trilha={[{ label: "Reabilitação Oral" }]}
      />

      <section className="secao fundo-nuvem">
        <div className="wrap duas-colunas alinha-topo">
          <div className="conteudo-longo">
            {reabilitacao.corpo.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <h2 style={{ marginTop: "1.6em", fontSize: "clamp(1.35rem, 2vw, 1.7rem)" }}>
              {reabilitacao.consideraTitulo}
            </h2>
            <ul className="lista-marcada">
              {reabilitacao.considera.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <figure className="coluna-figura" style={{ margin: 0 }}>
            <img
              src={site.fotos.planejamento.src}
              alt={site.fotos.planejamento.alt}
              width={900}
              height={1539}
            />
          </figure>
        </div>
      </section>

      <section className="secao fundo-azul">
        <div className="wrap-estreito" style={{ textAlign: "center" }}>
          <Surge>
            <p className="assinatura" style={{ color: "var(--branco)" }}>
              {reabilitacao.fechamento}
            </p>
          </Surge>
        </div>
      </section>

      <section className="secao fundo-branco">
        <div className="wrap">
          <Surge>
            <p className="sobrelinha">Tratamentos</p>
            <h2 style={{ marginBottom: 46 }}>{reabilitacao.tratamentosTitulo}</h2>
          </Surge>
          <GradeTratamentos />
          <div className="linha-botoes">
            <a
              className="botao"
              href={agendarUrl("quero entender qual tratamento é indicado para o meu caso")}
              target="_blank"
              rel="noreferrer"
            >
              <IconeWhatsapp /> {reabilitacao.cta}
            </a>
          </div>
        </div>
      </section>

      <CtaFinal
        titulo="Seu sorriso merece um tratamento que considera você por completo."
        texto="A avaliação é o ponto de partida: exame clínico completo, análise de imagens e planejamento inicial do caso."
        contexto="quero avaliar uma reabilitação oral"
      />
    </Pagina>
  );
}
