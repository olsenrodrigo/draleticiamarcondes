import { Link } from "wouter";
import { Pagina } from "@/components/Layout";
import { AvisoPilar, CtaFinal, SecaoContato, Surge, TopoPagina } from "@/components/Secoes";
import { IconeSeta, IconeWhatsapp, iconesTratamento } from "@/components/Icones";
import { agendarUrl } from "@/content/site";
import { procedimentos, reabilitacao, type Procedimento as Tipo } from "@/content/pages";
import { servicoSchema, useSeo } from "@/lib/seo";

export default function Procedimento({ dados }: { dados: Tipo }) {
  useSeo({
    ...dados.meta,
    path: dados.path,
    jsonLd: servicoSchema(dados.card, dados.meta.description, dados.path),
  });

  const Icone = iconesTratamento[dados.icone];
  const outros = procedimentos.filter((p) => p.path !== dados.path);

  return (
    <Pagina>
      <TopoPagina
        titulo={dados.h1}
        sobrelinha={dados.card}
        trilha={[
          { href: reabilitacao.path, label: "Reabilitação Oral" },
          { label: dados.nav },
        ]}
      />

      <section className="secao fundo-creme">
        <div className="wrap-estreito conteudo-longo">
          <Icone style={{ width: 46, height: 46, color: "var(--verde-600)", marginBottom: 26 }} />
          {dados.corpo.map((p) => (
            <p key={p}>{p}</p>
          ))}

          {dados.destaque && (
            <div className="bloco-destaque" style={{ margin: "2.2em 0" }}>
              <h3>{dados.destaque.titulo}</h3>
              <p>{dados.destaque.texto}</p>
            </div>
          )}

          <div className="linha-botoes">
            <a
              className="botao"
              href={agendarUrl(dados.ctaContexto)}
              target="_blank"
              rel="noreferrer"
            >
              <IconeWhatsapp /> {dados.cta}
            </a>
          </div>

          <div style={{ marginTop: 54 }}>
            <AvisoPilar />
          </div>
        </div>
      </section>

      <section className="secao-curta fundo-branco">
        <div className="wrap">
          <Surge>
            <p className="sobrelinha">Outros tratamentos</p>
            <ul className="lista-marcada duas" style={{ marginTop: 22 }}>
              {outros.map((p) => (
                <li key={p.path}>
                  <Link className="link-seta" href={p.path}>
                    {p.card} <IconeSeta />
                  </Link>
                </li>
              ))}
            </ul>
          </Surge>
        </div>
      </section>

      <CtaFinal
        titulo="Seu sorriso merece um tratamento que considera você por completo."
        texto="Cada caso é avaliado individualmente antes de qualquer indicação de tratamento."
        contexto={dados.ctaContexto}
      />

      <SecaoContato
        titulo="Agende sua avaliação"
        texto="Fale com a nossa equipe e agende sua avaliação na Lemarc Odontologia."
        origem={dados.nav}
      />
    </Pagina>
  );
}
