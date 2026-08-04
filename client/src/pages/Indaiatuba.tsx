import { Pagina } from "@/components/Layout";
import { DadosContato, GradeTratamentos, SecaoContato, Surge, TopoPagina } from "@/components/Secoes";
import { IconeWhatsapp } from "@/components/Icones";
import { agendarUrl } from "@/content/site";
import { indaiatuba } from "@/content/pages";
import { useSeo } from "@/lib/seo";
import { rota } from "@/content/rotas";

export default function Indaiatuba() {
  useSeo(rota(indaiatuba.path));

  return (
    <Pagina>
      <TopoPagina
        titulo={indaiatuba.h1}
        sobrelinha="Atendimento local"
        trilha={[{ label: "Dentista em Indaiatuba" }]}
      >
        <p className="assinatura" style={{ marginTop: 22 }}>
          {indaiatuba.intro}
        </p>
      </TopoPagina>

      <section className="secao fundo-nuvem">
        <div className="wrap-estreito conteudo-longo">
          <p>{indaiatuba.corpo}</p>
          <ul className="lista-marcada duas" style={{ margin: "1.6em 0" }}>
            {indaiatuba.lista.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{indaiatuba.fechamento}</p>
        </div>
      </section>

      <section className="secao fundo-branco">
        <div className="wrap">
          <Surge>
            <p className="sobrelinha">Onde estamos</p>
            <h2 style={{ marginBottom: 46 }}>{indaiatuba.enderecoTitulo}</h2>
          </Surge>
          <div className="duas-colunas alinha-topo">
            <DadosContato />
            <div>
              <p className="chamada">
                {indaiatuba.agendamento}. Atendimento 100% particular, de segunda a sexta-feira.
              </p>
              <div className="linha-botoes">
                <a
                  className="botao"
                  href={agendarUrl("sou de Indaiatuba e quero agendar uma avaliação")}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconeWhatsapp /> {indaiatuba.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="secao fundo-nuvem">
        <div className="wrap">
          <Surge>
            <p className="sobrelinha">Tratamentos</p>
            <h2 style={{ marginBottom: 46 }}>O que tratamos na Lemarc</h2>
          </Surge>
          <GradeTratamentos />
        </div>
      </section>

      <SecaoContato
        titulo="Agende sua avaliação"
        texto="Fale com a nossa equipe e agende sua avaliação na clínica, no Jardim Pau Preto."
        origem="dentista em Indaiatuba"
      />
    </Pagina>
  );
}
