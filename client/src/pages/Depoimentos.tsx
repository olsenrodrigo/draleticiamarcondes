import { Pagina } from "@/components/Layout";
import { CtaFinal, Depoimentos as SecaoDepoimentos, TopoPagina } from "@/components/Secoes";
import { depoimentos } from "@/content/pages";
import { useSeo } from "@/lib/seo";

/**
 * Rota registrada apenas quando `site.showTestimonials` é true — a seção nasce
 * estruturada, mas fora do ar até a clínica autorizar os depoimentos.
 */
export default function Depoimentos() {
  useSeo({ ...depoimentos.meta, path: depoimentos.path });

  return (
    <Pagina>
      <TopoPagina
        titulo={depoimentos.h1}
        sobrelinha="Depoimentos"
        trilha={[{ label: "Depoimentos" }]}
      />
      <SecaoDepoimentos />
      <CtaFinal
        titulo="Seu sorriso merece um tratamento que considera você por completo."
        contexto="quero agendar uma avaliação"
      />
    </Pagina>
  );
}
