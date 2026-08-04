import { Pagina } from "@/components/Layout";
import { CtaFinal, TopoPagina } from "@/components/Secoes";
import { iconesDiferencial } from "@/components/Icones";
import { site } from "@/content/site";
import { diferenciais } from "@/content/pages";
import { useSeo } from "@/lib/seo";
import { rota } from "@/content/rotas";

export default function Diferenciais() {
  useSeo(rota(diferenciais.path));

  return (
    <Pagina>
      <TopoPagina
        titulo={diferenciais.h1}
        sobrelinha="Diferenciais e tecnologia"
        trilha={[{ label: "Diferenciais" }]}
      >
        <p className="chamada" style={{ marginTop: 22 }}>
          {diferenciais.corpo}
        </p>
      </TopoPagina>

      <section className="secao fundo-nuvem">
        <div className="wrap duas-colunas alinha-topo">
          <div className="conteudo-longo">
            {diferenciais.itens.map((item) => {
              const Icone = iconesDiferencial[item.icone];
              return (
                <div key={item.titulo} style={{ marginBottom: 42 }}>
                  <Icone style={{ width: 34, height: 34, color: "var(--verde-600)", marginBottom: 14 }} />
                  <h3>{item.titulo}</h3>
                  <p>{item.texto}</p>
                </div>
              );
            })}
          </div>
          <figure className="coluna-figura" style={{ margin: 0, position: "sticky", top: 120 }}>
            <img
              src={site.fotos.clinica.src}
              alt={site.fotos.clinica.alt}
              width={900}
              height={1539}
            />
          </figure>
        </div>
      </section>

      <CtaFinal
        titulo="Seu sorriso merece um tratamento que considera você por completo."
        texto="Venha entender o seu caso de perto, com diagnóstico explicado passo a passo."
        contexto="quero conhecer os diferenciais da clínica"
      />
    </Pagina>
  );
}
