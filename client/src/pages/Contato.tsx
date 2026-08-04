import { Pagina } from "@/components/Layout";
import { DadosContato, Formulario, TopoPagina } from "@/components/Secoes";
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
      </TopoPagina>

      <section className="secao fundo-nuvem">
        <div className="wrap grade-contato">
          <DadosContato />
          <Formulario origem="página de contato" />
        </div>
      </section>
    </Pagina>
  );
}
