import { Pagina } from "@/components/Layout";
import { Acordeao, CtaFinal, TopoPagina } from "@/components/Secoes";
import { faq } from "@/content/pages";
import { faqSchema, useSeo } from "@/lib/seo";

export default function Faq() {
  useSeo({ ...faq.meta, path: faq.path, jsonLd: faqSchema(faq.itens) });

  return (
    <Pagina>
      <TopoPagina
        titulo={faq.h1}
        sobrelinha="Dúvidas frequentes"
        trilha={[{ label: "Perguntas frequentes" }]}
      />

      <section className="secao fundo-nuvem">
        <div className="wrap-estreito">
          <Acordeao itens={faq.itens} />
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
