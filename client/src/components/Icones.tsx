import type { SVGProps } from "react";

/** Ícones de linha desenhados para a Lemarc — traço fino, no espírito do logo. */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

type P = SVGProps<SVGSVGElement>;

const DENTE =
  "M12 3.4c-1.9 0-2.5.9-3.7.9-1.5 0-2.5 1.2-2.5 3.2 0 3 .9 4.6 1.4 7.4.3 1.9.6 3.5 1.6 3.5s1.2-1.3 1.4-2.9c.2-1.2.5-2.1 1.8-2.1s1.6.9 1.8 2.1c.2 1.6.4 2.9 1.4 2.9s1.3-1.6 1.6-3.5c.5-2.8 1.4-4.4 1.4-7.4 0-2-1-3.2-2.5-3.2-1.2 0-1.8-.9-3.7-.9Z";

export const IconeImplante = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 2.6c-1.6 0-2.1.8-3.1.8-1.3 0-2.1 1-2.1 2.7 0 1.4.3 2.4.6 3.4h9.2c.3-1 .6-2 .6-3.4 0-1.7-.8-2.7-2.1-2.7-1 0-1.5-.8-3.1-.8Z" />
    <path d="M9 12.2h6M9.4 15.1h5.2M10 18h4M11.4 21h1.2" />
  </svg>
);

export const IconeCoroa = (p: P) => (
  <svg {...base} {...p}>
    <path d={DENTE} />
    <path d="M6.4 9.1h11.2" />
  </svg>
);

/** A lente/faceta é desenhada como casca, sem raízes — para não virar mais um dente. */
export const IconeFaceta = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6.2 4.8c3.6-1.3 8-1.3 11.6 0v7.4c0 4.1-2.6 7.4-5.8 7.4s-5.8-3.3-5.8-7.4Z" />
    <path d="M9.2 7.6v5" opacity=".5" />
  </svg>
);

export const IconeClareamento = (p: P) => (
  <svg {...base} {...p}>
    <path d={DENTE} />
    <path d="M19.6 2.4l.55 1.45 1.45.55-1.45.55-.55 1.45-.55-1.45L17.6 4.4l1.45-.55Z" />
  </svg>
);

export const IconeCanal = (p: P) => (
  <svg {...base} {...p}>
    <path d={DENTE} />
    <path d="M10.6 8.4c0 2.4-.5 4-.8 6M13.4 8.4c0 2.4.5 4 .8 6" opacity=".65" />
  </svg>
);

export const IconeOrtodontia = (p: P) => (
  <svg {...base} {...p}>
    <path d="M2.4 12h19.2" />
    <rect x="4.4" y="7.4" width="4.4" height="9.2" rx=".9" />
    <rect x="9.8" y="7.4" width="4.4" height="9.2" rx=".9" />
    <rect x="15.2" y="7.4" width="4.4" height="9.2" rx=".9" />
  </svg>
);

export const IconeEstetica = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3.6 10.6c2.6-1.1 5.4-1.7 8.4-1.7s5.8.6 8.4 1.7c-.9 4.6-4.3 7.6-8.4 7.6s-7.5-3-8.4-7.6Z" />
    <path d="M8.2 9.4v8.1M15.8 9.4v8.1M12 8.9v9.3" opacity=".45" />
  </svg>
);

export const IconeMicromotor = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3.4 15.4 12.6 6.2a2.6 2.6 0 0 1 3.7 0l1.5 1.5a2.6 2.6 0 0 1 0 3.7L8.6 20.6H3.4Z" />
    <path d="m14 7.6 2.4 2.4" />
    <path d="M18.6 3.4v2.2M21.6 6.4h-2.2" />
  </svg>
);

export const IconeTela = (p: P) => (
  <svg {...base} {...p}>
    <rect x="2.8" y="4.2" width="18.4" height="12.6" rx="1.4" />
    <path d="M9 20.4h6M12 16.8v3.6" />
    <path d="M8.6 12.4c0-1.9 1.5-3.4 3.4-3.4s3.4 1.5 3.4 3.4" />
    <circle cx="12" cy="12.4" r="1.2" />
  </svg>
);

export const IconeLupa = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="10.6" cy="10.6" r="6.4" />
    <circle cx="10.6" cy="10.6" r="2.8" opacity=".5" />
    <path d="m15.6 15.6 4.6 4.6" />
  </svg>
);

export const IconeMaterial = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 2.8 20.4 7v10L12 21.2 3.6 17V7Z" />
    <path d="m3.6 7 8.4 4.6L20.4 7M12 11.6v9.6" opacity=".55" />
  </svg>
);

export const IconeLocal = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21.4s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10.2" r="2.6" />
  </svg>
);

export const IconeRelogio = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 6.8V12l3.4 2" />
  </svg>
);

export const IconeEmail = (p: P) => (
  <svg {...base} {...p}>
    <rect x="2.8" y="5" width="18.4" height="14" rx="1.6" />
    <path d="m3.4 6.6 8.6 5.8 8.6-5.8" />
  </svg>
);

export const IconeSeta = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.5 12h15M13.4 6l6 6-6 6" />
  </svg>
);

export const IconeSetaEsquerda = (p: P) => (
  <svg {...base} {...p}>
    <path d="M19.5 12h-15M10.6 6l-6 6 6 6" />
  </svg>
);

export const IconeChevron = (p: P) => (
  <svg {...base} {...p}>
    <path d="m5.5 9 6.5 6.5L18.5 9" />
  </svg>
);

export const IconeMenu = (p: P) => (
  <svg {...base} {...p} strokeWidth={1.5}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
  </svg>
);

export const IconeFechar = (p: P) => (
  <svg {...base} {...p} strokeWidth={1.5}>
    <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />
  </svg>
);

export const IconeWhatsapp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.6-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.16 6.45 6.6 2.02 12.05 2.02c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.15 1.59 5.95L.06 24l6.31-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.48-8.41" />
  </svg>
);

export const IconeInstagram = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85.15-3.23 1.66-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.41-11.85a1.44 1.44 0 1 0 0 2.89 1.44 1.44 0 0 0 0-2.89" />
  </svg>
);

export const iconesTratamento = {
  implante: IconeImplante,
  coroa: IconeCoroa,
  faceta: IconeFaceta,
  clareamento: IconeClareamento,
  canal: IconeCanal,
  ortodontia: IconeOrtodontia,
  estetica: IconeEstetica,
} as const;

export const iconesDiferencial = {
  motor: IconeMicromotor,
  tela: IconeTela,
  lupa: IconeLupa,
  material: IconeMaterial,
} as const;
