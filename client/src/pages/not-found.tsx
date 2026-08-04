import { Link } from "wouter";
import { Pagina } from "@/components/Layout";
import { GradeTratamentos } from "@/components/Secoes";
import { naoEncontrada, reabilitacao } from "@/content/pages";
import { useSeo } from "@/lib/seo";

export default function NotFound() {
  useSeo({ ...naoEncontrada.meta, path: "/404" });

  return (
    <Pagina>
      <section className="pagina-topo">
        <div className="wrap">
          <p className="sobrelinha">Erro 404</p>
          <h1>{naoEncontrada.h1}</h1>
          <p className="chamada" style={{ marginTop: 20 }}>
            {naoEncontrada.corpo}
          </p>
          <div className="linha-botoes">
            <Link className="botao" href="/">
              {naoEncontrada.cta}
            </Link>
            <Link className="botao botao-vazado" href={reabilitacao.path}>
              Ver tratamentos
            </Link>
          </div>
        </div>
      </section>

      <section className="secao fundo-nuvem">
        <div className="wrap">
          <p className="sobrelinha">Tratamentos</p>
          <h2 style={{ marginBottom: 46 }}>Talvez você esteja procurando por</h2>
          <GradeTratamentos />
        </div>
      </section>
    </Pagina>
  );
}
