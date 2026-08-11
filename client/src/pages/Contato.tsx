import { Pagina } from "@/components/Layout";
import { DadosContato, Formulario, TopoPagina } from "@/components/Secoes";
import { FichaClinica, PerguntasDaPagina, RespostaDireta } from "@/components/Geo";
import { contato } from "@/content/pages";
import { useSeo } from "@/lib/seo";
import { rota } from "@/content/rotas";

export default function Contato() {
  useSeo(rota(contato.path));

  return (
    <Pagina>
      <TopoPagina titulo={contato.h1} sobrelinha="Contato" trilha={[{ label: "Contato" }]}>
        <p className="chamada" style={{ marginTop: 22 }}>
          {contato.corpo}
        </p>
        <RespostaDireta path={contato.path} />
      </TopoPagina>

      <section className="secao fundo-nuvem">
        <div className="wrap grade-contato">
          <DadosContato />
          <Formulario origem="página de contato" />
        </div>
      </section>

      <section className="secao fundo-branco">
        <div className="wrap-estreito">
          <p className="sobrelinha">A clínica em resumo</p>
          <h2 style={{ marginBottom: 34 }}>Lemarc Odontologia</h2>
          <FichaClinica />
        </div>
      </section>

      <PerguntasDaPagina path={contato.path} fundo="fundo-nuvem" />
    </Pagina>
  );
}
