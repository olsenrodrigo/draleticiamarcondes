import { Pagina } from "@/components/Layout";
import { Acordeao, CtaFinal, TopoPagina } from "@/components/Secoes";
import { faq } from "@/content/pages";
import { useSeo } from "@/lib/seo";
import { rota } from "@/content/rotas";

export default function Faq() {
  useSeo(rota(faq.path));

  return (
    <Pagina>
      <TopoPagina
        titulo={faq.h1}
        sobrelinha="Dúvidas frequentes"
        trilha={[{ label: "Perguntas frequentes" }]}
      />

      <section className="secao fundo-nuvem">
        <div className="wrap-estreito">
          {/* Abertas por padrão: esta página existe para ser lida (e citada)
              por inteiro, então esconder a resposta atrás de um clique só
              atrapalha — tanto o leitor quanto quem extrai o texto. */}
          <Acordeao itens={faq.itens} todosAbertos />
        </div>
      </section>

      <CtaFinal
        titulo="Ficou com alguma dúvida sobre o seu caso?"
        texto="Cada caso é único. Na avaliação, a Dra. Letícia explica o diagnóstico e o planejamento com calma."
        contexto="tenho uma dúvida sobre o meu caso"
      />
    </Pagina>
  );
}
