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

**A marca é a oficial**, vetorizada dos arquivos entregues pela clínica em
`insumos/novos/` (manual de identidade da kamillakiffer design, 2023). Os PDFs vinham
como arte quadrada com muita margem e fundo pastel chapado; as formas foram recortadas
no conteúdo, o fundo removido e tudo reescrito em `currentColor`, sem webfont:

| origem | componente | uso |
|---|---|---|
| `logo_oficial.pdf` | `LogoLemarc` | lockup completo (símbolo + LEMARC + ODONTOLOGIA) — rodapé, OG |
| idem, sem o descritivo | `LogoLemarcCompacto` | cabeçalho (a 78px de barra o "ODONTOLOGIA" cairia para ~4px) |
| `_simbolo_escuro_fundo_azul_claro.pdf` | `MarcaLemarc` | símbolo sólido — favicon, selo do rodapé, marcador de seção |
| `_simbolo_variação_...pdf` | `MarcaLemarcContorno` | símbolo em contorno — marca d'água (hero e manifesto) |

- `client/src/assets/brand/*.svg` — as mesmas formas como arquivo, para uso fora do React.
- `favicon.svg/png`, `apple-touch-icon.png` e `opengraph.jpg` são gerados do símbolo sólido
  e do lockup sobre o azul pastel oficial.

**Paleta** — os arquivos de marca têm **apenas duas cores**: tinta `#1D252D` e azul pastel
`#CED9E5`. A escala interpola entre elas no mesmo matiz (~210°), com um pouco mais de croma
nos tons médios para que links e botões não fiquem apagados.

| token | hex | uso |
|---|---|---|
| `--azul-800` | `#1d252d` | **tinta oficial** — títulos, texto forte |
| `--azul-700` | `#26313d` | primário, seções escuras, botões |
| `--azul-600` | `#35495c` | hover, ícones, links |
| `--azul-200` | `#ced9e5` | **pastel oficial** — botão sobre fundo escuro |
| `--azul-100` | `#e3eaf1` | blocos de destaque |
| `--nuvem` | `#f6f9fb` | fundo do site |
| `--azul-900` | `#131a21` | rodapé |

**Tipografia**: Cormorant Garamond (títulos) + Karla (corpo/UI).

> O manual da clínica especifica **MIAMO** (nome/tagline) e **Museo Sans** (apoio) — as duas
> são comerciais e não têm licença web, então não foram adotadas. Cormorant Garamond é uma
> didone de contraste alto, próxima da MIAMO do wordmark; se a clínica comprar a licença
> web, trocar é uma alteração de duas linhas no `:root` do `index.css`.

> Nada foi reaproveitado do site do Dr. Germano além da arquitetura de pastas do
> whitelabel_v2 — paleta, tipografia, componentes e CSS são próprios.

**Fotos** (`insumos/novos/`, ensaio da clínica): `principal` abre o hero; `recepcao`,
`consultorio`, `diagnostico`, `planejamento` e `clinica` formam o carrossel da home e
ilustram /sobre, /reabilitacao-oral e /diferenciais.

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
- ~~**Autorização de imagem** da paciente infantil~~ — resolvido: o ensaio novo substituiu
  todas as fotos antigas e nenhuma imagem de paciente é exibida no site.
- ~~**Mais fotos da clínica**~~ — resolvido: 6 imagens novas, 5 delas no carrossel da home.
- **Depoimentos autorizados** → popular `depoimentos.itens` e virar `showTestimonials`.
- **Fotos e CRO dos especialistas parceiros** (Dr. Rick, Dra. Juliana, Dra. Lara) — a seção
  de equipe está pronta para recebê-los.
- **Telefone fixo do consultório**, se a clínica quiser exibir além do WhatsApp.
