import { Link } from "wouter";
import { Acordeao, Surge } from "@/components/Secoes";
import { IconeSeta } from "@/components/Icones";
import { fichaClinica, geoDaRota } from "@/content/geo";

/**
 * Componentes do conteúdo de SEO/GEO (`content/geo.ts`).
 *
 * Todos recebem `path` e não renderizam nada se a rota não tiver bloco — assim
 * dá para espalhá-los pelas páginas sem condicional em cada uma.
 */

/**
 * Resposta direta da página, em destaque logo abaixo do H1.
 *
 * É o trecho com maior chance de virar citação em resposta gerada: fica no topo
 * do HTML, é autossuficiente (diz o quê, onde e quem) e não depende do parágrafo
 * anterior para fazer sentido.
 */
export function RespostaDireta({ path }: { path: string }) {
  const geo = geoDaRota(path);
  if (!geo) return null;
  return <p className="resposta-direta">{geo.resumo}</p>;
}

/** Seções de conteúdo longo — o corpo que sustenta a palavra-chave da rota. */
export function SecoesGeo({ path, fundo = "fundo-branco" }: { path: string; fundo?: string }) {
  const geo = geoDaRota(path);
  if (!geo?.secoes?.length) return null;

  return (
    <section className={`secao ${fundo}`}>
      <div className="wrap-estreito conteudo-longo">
        {geo.secoes.map((secao) => (
          // A classe vai no Surge, e não no filho: o Surge é um div, então dois
          // `.secao-geo` nunca são irmãos adjacentes e a margem entre eles
          // precisa vir do wrapper.
          <Surge key={secao.titulo} className="secao-geo">
            <div>
              <h2>{secao.titulo}</h2>
              {secao.paragrafos?.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {secao.lista && (
                <ul className="lista-marcada">
                  {secao.lista.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {secao.linkPara && (
                <p style={{ marginTop: "1.2em" }}>
                  <Link className="link-seta" href={secao.linkPara.path}>
                    {secao.linkPara.texto} <IconeSeta />
                  </Link>
                </p>
              )}
            </div>
          </Surge>
        ))}
      </div>
    </section>
  );
}

/**
 * Perguntas específicas da página.
 *
 * Ficam na própria rota, e não só em `/perguntas-frequentes`, de propósito: o
 * `FAQPage` daquela URL é o que a torna elegível a resposta direta na busca, e
 * o par pergunta/resposta é o formato que motores generativos citam melhor.
 */
export function PerguntasDaPagina({
  path,
  fundo = "fundo-nuvem",
}: {
  path: string;
  fundo?: string;
}) {
  const geo = geoDaRota(path);
  if (!geo?.faq?.length) return null;

  return (
    <section className={`secao ${fundo}`}>
      <div className="wrap-estreito">
        <Surge>
          <p className="sobrelinha">Dúvidas frequentes</p>
          <h2 style={{ marginBottom: 34 }}>{geo.faqTitulo ?? "Perguntas frequentes"}</h2>
        </Surge>
        <Acordeao itens={geo.faq} />
      </div>
    </section>
  );
}

/**
 * Ficha da clínica em pares rótulo/valor.
 *
 * Formato tabular é o que um motor generativo extrai com menor chance de erro:
 * cada linha é um fato fechado, sem depender de interpretar prosa. É também o
 * bloco que responde "endereço", "horário" e "atende convênio" de uma vez.
 */
export function FichaClinica() {
  return (
    <dl className="ficha-clinica">
      {fichaClinica.map((linha) => (
        <div key={linha.rotulo}>
          <dt>{linha.rotulo}</dt>
          <dd>{linha.valor}</dd>
        </div>
      ))}
    </dl>
  );
}
