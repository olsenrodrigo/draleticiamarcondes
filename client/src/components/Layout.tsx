import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { LogoLemarc } from "@/components/Brand";
import { IconeFechar, IconeInstagram, IconeMenu, IconeWhatsapp } from "@/components/Icones";
import { agendarUrl, site } from "@/content/site";
import { contato, diferenciais, faq, indaiatuba, procedimentos, reabilitacao, sobre } from "@/content/pages";

const menu = [
  { href: sobre.path, label: "Sobre" },
  { href: reabilitacao.path, label: "Reabilitação Oral" },
  { href: diferenciais.path, label: "Diferenciais" },
  { href: indaiatuba.path, label: "Indaiatuba" },
  { href: faq.path, label: "Dúvidas" },
  { href: contato.path, label: "Contato" },
];

export function Cabecalho({ transparenteNoTopo = false }: { transparenteNoTopo?: boolean }) {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [local] = useLocation();

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => setAberto(false), [local]);

  return (
    <header
      className="cabecalho"
      data-topo={transparenteNoTopo && !rolou && !aberto}
      data-preso={rolou}
      data-aberto={aberto}
    >
      <div className="wrap">
        <div className="cabecalho-inner">
          <Link href="/" className="marca-link" aria-label="Lemarc Odontologia — página inicial">
            <LogoLemarc />
          </Link>

          <nav className="menu" aria-label="Navegação principal">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={local === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <a className="botao" href={agendarUrl()} target="_blank" rel="noreferrer">
              {site.ctas.short}
            </a>
          </nav>

          <button
            className="botao-menu"
            type="button"
            aria-expanded={aberto}
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setAberto((v) => !v)}
          >
            {aberto ? <IconeFechar width={24} /> : <IconeMenu width={24} />}
          </button>
        </div>

        {aberto && (
          <nav className="menu-movel" aria-label="Navegação principal">
            {menu.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <a className="botao" href={agendarUrl()} target="_blank" rel="noreferrer">
              {site.ctas.short}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

export function Rodape() {
  return (
    <footer className="rodape">
      <div className="wrap">
        <div className="rodape-grid">
          <div className="rodape-marca">
            <LogoLemarc titulo="Lemarc Odontologia" />
            <p>
              {site.address.street}
              <br />
              {site.address.district} — {site.address.city}/{site.address.state}
              <br />
              CEP {site.address.zip}
            </p>
            <p>
              {site.doctor} — {site.cro}
            </p>
          </div>

          <div>
            <h4>Tratamentos</h4>
            <ul>
              <li>
                <Link href={reabilitacao.path}>Reabilitação Oral</Link>
              </li>
              {procedimentos.map((p) => (
                <li key={p.path}>
                  <Link href={p.path}>{p.nav}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>A clínica</h4>
            <ul>
              <li>
                <Link href={sobre.path}>Sobre a Lemarc</Link>
              </li>
              <li>
                <Link href={diferenciais.path}>Diferenciais</Link>
              </li>
              <li>
                <Link href={indaiatuba.path}>Dentista em Indaiatuba</Link>
              </li>
              <li>
                <Link href={faq.path}>Perguntas frequentes</Link>
              </li>
              <li>
                <Link href={contato.path}>Contato</Link>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noreferrer">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <IconeInstagram width={15} /> @dra.lemarc
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rodape-base">
          <span>
            © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
          </span>
          <span>{site.hours}</span>
        </div>
      </div>
    </footer>
  );
}

export function BotaoWhatsapp() {
  return (
    <a
      className="whatsapp-fixo"
      href={agendarUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Agendar avaliação pelo WhatsApp"
    >
      <IconeWhatsapp />
    </a>
  );
}

export function Pagina({
  children,
  heroTransparente = false,
}: {
  children: ReactNode;
  heroTransparente?: boolean;
}) {
  return (
    <>
      <Cabecalho transparenteNoTopo={heroTransparente} />
      <main id="conteudo">{children}</main>
      <Rodape />
      <BotaoWhatsapp />
    </>
  );
}
