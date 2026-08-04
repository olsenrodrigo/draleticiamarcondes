import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const raiz = document.getElementById("root")!;

// Em produção o HTML já vem pré-renderizado (script/prerender.ts): hidratar
// aproveita essa marcação em vez de descartá-la e repintar a tela.
if (raiz.dataset.prerender === "true") {
  hydrateRoot(raiz, <App />);
} else {
  createRoot(raiz).render(<App />);
}
