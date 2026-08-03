# Lemarc Odontologia — Dra. Letícia Marcondes

Site institucional da clínica Lemarc Odontologia (Indaiatuba/SP), construído sobre a base
`whitelabel_v2`. React 19 + Vite + wouter, servido por Express.

## Comandos

```bash
npm install
PORT=5177 npm run dev     # dev (a porta 5000 costuma estar ocupada pelo AirPlay no macOS)
npm run check             # tsc
npm run build             # client + server em dist/
npm start                 # produção
```

## Identidade visual

**O logo não foi inventado — foi vetorizado a partir do logo que a clínica já usa** (aparece
no jaleco da Dra. Letícia e nas artes do Instagram @dra.lemarc). Reconstrução em SVG puro,
`currentColor`, sem dependência de webfont:

- `client/src/components/Brand.tsx` — `LogoLemarc` (lockup completo), `LogoLemarcCompacto`
  (sem o descritivo) e `MarcaLemarc` (só as duas pétalas, usada como selo).
- `client/src/assets/brand/*.svg` — mesmas formas como arquivo, para uso fora do React.
- A marca são dois "U" didones sobrepostos; o wordmark é Bodoni 72 condensado a 0,82
  (as larguras foram medidas no logo original — a fonte da marca é uma didone condensada).
- Favicon, apple-touch-icon e `opengraph.jpg` derivam da mesma marca.

**Paleta** (definida a partir das fotos da clínica — madeira, areia, verde sálvia):

| token | hex | uso |
|---|---|---|
| `--verde-700` | `#1e3a32` | primário, seções escuras, botões |
| `--verde-600` | `#2b5346` | hover, ícones, links |
| `--sage-veu` | `#dfe8e1` | blocos de destaque |
| `--areia` | `#e3d6c3` | botão sobre fundo escuro |
| `--creme` | `#faf7f1` | fundo do site |
| `--verde-900` | `#14251f` | títulos e rodapé |

**Tipografia**: Cormorant Garamond (títulos) + Karla (corpo/UI).

> Nada foi reaproveitado do site do Dr. Germano além da arquitetura de pastas do
> whitelabel_v2 — paleta, tipografia, componentes e CSS são próprios.

## Arquitetura

```
client/src/
  content/site.ts      dados institucionais (contato, endereço, fotos, flags)
  content/pages.ts     COPY LITERAL do documento aprovado — não editar sem alinhar
  lib/seo.ts           useSeo (title/description/canonical/OG) + schema.org
  components/          Brand, Layout (header/footer/whatsapp), Secoes, Icones
  pages/               uma página por rota
```

Toda a copy exibida vem de `content/pages.ts`, transcrita literalmente de
`insumos/Copy_Site_Lemarc_Odontologia.md`. As únicas frases fora do documento são títulos de
seção da home e legendas do carrossel, derivados da Estratégia de Posicionamento Digital.

## Rotas (14)

`/` · `/sobre` · `/reabilitacao-oral` (pilar) · `/implantes-dentarios` ·
`/proteses-e-coroas` · `/lentes-de-contato-dental` · `/clareamento-dental` ·
`/tratamento-de-canal` · `/ortodontia-e-invisalign` · `/odontologia-estetica` ·
`/diferenciais` · `/dentista-em-indaiatuba` · `/perguntas-frequentes` · `/contato`

`/depoimentos` existe em código, mas só é registrada quando `site.showTestimonials` vira
`true` (hoje `false`, sem depoimentos coletados). Também fica fora do `sitemap.xml`.

## Checklist do documento da clínica

- [x] Nenhuma página exibe valores monetários
- [x] Toda página de procedimento linka de volta para a página-pilar (bloco "Este tratamento
      faz parte de um planejamento maior" + breadcrumb)
- [x] CTA principal em todas as páginas: agendar avaliação pelo WhatsApp
- [x] schema.org `Dentist` na home (e em /sobre, /contato, /dentista-em-indaiatuba);
      `FAQPage` em /perguntas-frequentes; `MedicalProcedure` nas páginas de tratamento
- [x] Seção de depoimentos estruturada como componente reutilizável, nascendo vazia
- [x] Nenhuma menção a equipamento de raio-x digital

## SEO

- `useSeo` troca title/description/canonical/OG a cada rota; JSON-LD é reinjetado por página.
- `client/public/sitemap.xml` e `robots.txt` gerados com as 14 rotas.
- Meta title/description de cada página vieram prontos do documento da clínica.
- É uma SPA: o HTML inicial traz a meta da home e o Google renderiza o JS para as demais.
  Se a clínica quiser HTML estático por rota, o próximo passo é um prerender no build.

## Dados confirmados

- WhatsApp **+55 19 3894-5273** — obtido do Linktree oficial da clínica
  (`linktr.ee/dra.lemarc` → `api.whatsapp.com/send?phone=551938945273`), não é placeholder.
- E-mail e endereço vieram do documento de copy.

## Pendências (para quando houver dados)

- **Domínio definitivo**: `site.origin` está como `https://lemarcodontologia.com.br`
  (usado em canonical, sitemap e OG). Ajustar em `content/site.ts` antes de publicar.
- **Autorização de imagem** da paciente infantil da foto `dra-leticia-paciente.jpg` — a foto
  veio dos insumos e já foi publicada pela clínica no Instagram, mas confirmar o
  consentimento dos responsáveis antes de subir o site.
- **Mais fotos da clínica** (recepção, consultório, equipamentos): o carrossel e a galeria
  ficam mais fortes com 5–6 imagens; hoje são 3.
- **Depoimentos autorizados** → popular `depoimentos.itens` e virar `showTestimonials`.
- **Fotos e CRO dos especialistas parceiros** (Dr. Rick, Dra. Juliana, Dra. Lara) — a seção
  de equipe está pronta para recebê-los.
- **Telefone fixo do consultório**, se a clínica quiser exibir além do WhatsApp.
