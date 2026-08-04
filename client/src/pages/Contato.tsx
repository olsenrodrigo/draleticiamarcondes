import { Pagina } from "@/components/Layout";
import { DadosContato, Formulario, TopoPagina } from "@/components/Secoes";
import { contato } from "@/content/pages";
import { dentistSchema, useSeo } from "@/lib/seo";

export default function Contato() {
  useSeo({ ...contato.meta, path: contato.path, jsonLd: dentistSchema });

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
