import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { site } from "@/content/site";
import {
  contato,
  depoimentos,
  diferenciais,
  faq,
  indaiatuba,
  procedimentos,
  reabilitacao,
  sobre,
} from "@/content/pages";
import Home from "@/pages/Home";
import Sobre from "@/pages/Sobre";
import Reabilitacao from "@/pages/Reabilitacao";
import Procedimento from "@/pages/Procedimento";
import Diferenciais from "@/pages/Diferenciais";
import Indaiatuba from "@/pages/Indaiatuba";
import Faq from "@/pages/Faq";
import Contato from "@/pages/Contato";
import Depoimentos from "@/pages/Depoimentos";
import NotFound from "@/pages/not-found";

/** Toda navegação começa no topo — manter o scroll entre rotas confunde o usuário. */
function TopoAoNavegar() {
  const [local] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [local]);
  return null;
}

function Rotas() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path={sobre.path} component={Sobre} />
      <Route path={reabilitacao.path} component={Reabilitacao} />
      {procedimentos.map((dados) => (
        <Route key={dados.path} path={dados.path}>
          <Procedimento dados={dados} />
        </Route>
      ))}
      <Route path={diferenciais.path} component={Diferenciais} />
      <Route path={indaiatuba.path} component={Indaiatuba} />
      <Route path={faq.path} component={Faq} />
      <Route path={contato.path} component={Contato} />
      {site.showTestimonials && <Route path={depoimentos.path} component={Depoimentos} />}
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TopoAoNavegar />
      <Rotas />
    </QueryClientProvider>
  );
}
