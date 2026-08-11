# SEO e GEO — Lemarc Odontologia

**SEO** = aparecer na busca do Google.
**GEO** (*Generative Engine Optimization*) = ser citado nas respostas do ChatGPT, Claude,
Perplexity, Gemini e da visão geral de IA do Google.

## ⚠️ O gargalo hoje não é ranqueamento — é indexação

Verificado em **11/08/2026**: `site:lemarcodontologia.com.br` devolve **zero páginas**.
O site não está no índice do Google. Nenhum ajuste de conteúdo produz efeito enquanto
isso não mudar, porque não há o que ranquear.

O site em si está tecnicamente correto (HTTPS 200, HTML pré-renderizado, sem `noindex`,
robots/sitemap/llms respondendo 200). O que falta é **descoberta**: domínio novo, sem
nenhum link externo apontando para ele. O Google não visita o que ninguém cita.

Ordem de execução — os três primeiros são o que destrava:

| # | Ação | Onde | Status |
|---|---|---|---|
| 1 | Verificar o domínio no Search Console | registro TXT no DNS | ✅ feito em 11/08/2026 |
| 2 | Enviar `sitemap.xml` e pedir indexação da home | Search Console | pendente |
| 3 | Primeiro link externo real: **site na bio do Instagram** (hoje o Linktree não aponta para ele) e no Facebook | plataformas | pendente |
| 4 | Criar o Perfil da Empresa no Google | Google Business | pendente |
| 5 | 301 de `www` para não-www (hoje **os dois respondem 200**) | Nginx da VPS | pendente |
| 6 | Corrigir divergência de NAP (ver abaixo) | Facebook/diretórios | pendente |

**Divergência de NAP encontrada**: o Facebook da clínica registra o endereço como
*Centro*; o site diz *Jardim Pau Preto*. O CEP 13330-220 resolve como "Centro" na base
dos Correios. Endereço divergente entre fontes é um dos maiores freios de SEO local —
**definir uma grafia única com a clínica** e replicá-la igual em site, Perfil da Empresa,
Instagram, Facebook e Doctoralia.

Prazo realista: indexação em dias a algumas semanas depois do passo 2; posição para os
termos-alvo, alguns meses. Busca por marca ("lemarc odontologia") tende a resolver primeiro.

## Onde cada coisa mora

A pergunta "isso é local ou na VPS?" tem três respostas, porque o trabalho se divide em
três lugares diferentes:

### 1. No código (este repositório) — feito

Tudo o que segue está implementado e vai junto no deploy. Não depende da VPS.

| Item | Onde |
|---|---|
| Title, description e canonical por rota | `client/src/content/rotas.ts` + `lib/seo.ts` |
| Palavras-chave por rota (+ trava anticanibalização) | `client/src/content/palavras-chave.ts` |
| **Conteúdo de SEO/GEO por rota** (resumo, seções, FAQ) | `client/src/content/geo.ts` |
| schema.org (`Dentist`, `Person`, `WebSite`, `MedicalWebPage`, `MedicalProcedure`, `FAQPage`, `BreadcrumbList`) | `lib/seo.ts` |
| Coordenadas, `areaServed`, horários em dois turnos | `lib/seo.ts` |
| Open Graph e Twitter Card por rota | `lib/seo.ts` e `entry-ssr.tsx` |
| `sitemap.xml` (gerado no build) | `script/prerender.ts` |
| `robots.txt` com crawlers de IA liberados | `client/public/robots.txt` |
| `llms.txt` (gerado no build) | `client/src/entry-ssr.tsx` |
| HTML estático por rota | `script/prerender.ts` |
| 404 com status HTTP 404 de verdade | `server/static.ts` |

### 2. Na VPS — a fazer no deploy

Nada disso é código; é configuração de servidor:

- **HTTPS** com certificado válido (Let's Encrypt). Sem isso o Google penaliza e vários
  crawlers de IA nem seguem o link.
- **Um domínio só**: escolher entre `lemarcodontologia.com.br` e `www.lemarcodontologia.com.br`
  e redirecionar 301 o outro. Hoje o canonical aponta para a versão sem `www`.
- **Compressão** gzip/brotli e **cache** longo para `/assets/*` (os nomes têm hash, então
  podem ter `Cache-Control: immutable`). O HTML deve ficar sem cache longo.
- **HTTP/2 ou HTTP/3** e um TTFB baixo — entra em Core Web Vitals.
- Servir o app com `npm start` (Express) atrás do Nginx/Caddy, **sem** reescrever tudo para
  `index.html`: o servidor já entrega o HTML correto de cada rota.
- Confirmar que `/robots.txt`, `/sitemap.xml` e `/llms.txt` respondem 200 no domínio real.

### 3. Fora dos dois — plataformas externas

Aqui está o maior ganho de SEO local para uma clínica, e não é código nem servidor:

- **Perfil da Empresa no Google** (antigo Google Meu Negócio). É o que faz a clínica
  aparecer no mapa e no "perto de mim". Precisa de: categoria "Dentista", endereço,
  horários nos dois turnos, telefone, fotos e **avaliações de pacientes**.
  Ao criar, pegar o pin exato e substituir as coordenadas em `lib/seo.ts` (ver abaixo).
- **Google Search Console** e **Bing Webmaster Tools**: enviar o sitemap e acompanhar
  indexação.
- **NAP consistente** (nome, endereço, telefone escritos exatamente igual) no site, no
  Perfil da Empresa, no Instagram, no Doctoralia e em diretórios locais. Divergência de
  endereço entre fontes é um dos maiores problemas de SEO local.
- **Instagram** `@dra.lemarc`: colocar o site na bio (hoje o Linktree não aponta para ele).

## Por que o site foi pré-renderizado

Este era o furo maior para GEO. O site é uma SPA em React: o HTML que o servidor entrega
era só `<div id="root"></div>` e todo o conteúdo aparecia depois, via JavaScript.

O Google executa JavaScript. **Os crawlers de IA, em geral, não.** GPTBot, ClaudeBot e
PerplexityBot leem o HTML cru — ou seja, viam uma página vazia.

Agora o build gera um HTML completo por rota (`script/prerender.ts`), com o texto, os links
e o JSON-LD já dentro. O React hidrata esse HTML no navegador, então a navegação continua
instantânea como antes.

```
npm run build     # build do cliente -> pré-renderiza 14 rotas -> build do servidor
```

Para conferir o que um crawler sem JavaScript enxerga:

```bash
curl -s https://lemarcodontologia.com.br/implantes-dentarios | grep -c "<h1"
curl -s https://lemarcodontologia.com.br/llms.txt
```

## Palavras-chave

O mapa completo está em `client/src/content/palavras-chave.ts` — uma primária por rota, sem
canibalização entre páginas.

Os **quatro alvos prioritários** da clínica e suas donas exclusivas:

| Alvo | Rota dona |
|---|---|
| **odontologia Indaiatuba** | `/` |
| **dentista Indaiatuba** | `/dentista-em-indaiatuba` |
| **reabilitação oral Indaiatuba** | `/reabilitacao-oral` |
| **odontologia estética Indaiatuba** | `/odontologia-estetica` |

> Até 11/08/2026, `/` e `/dentista-em-indaiatuba` declaravam **a mesma** primária
> ("dentista em Indaiatuba") — as duas competiam entre si e o Google escolhia sozinho
> qual mostrar. Agora `palavras-chave.ts` tem uma trava que **quebra o build** se dois
> caminhos declararem o mesmo termo.

Mapa completo:

| Rota | Palavra-chave primária |
|---|---|
| `/` | odontologia Indaiatuba |
| `/sobre` | Dra. Letícia Marcondes dentista Indaiatuba |
| `/reabilitacao-oral` | reabilitação oral Indaiatuba |
| `/implantes-dentarios` | implante dentário Indaiatuba |
| `/proteses-e-coroas` | prótese dentária Indaiatuba |
| `/lentes-de-contato-dental` | lente de contato dental Indaiatuba |
| `/clareamento-dental` | clareamento dental Indaiatuba |
| `/tratamento-de-canal` | tratamento de canal Indaiatuba |
| `/ortodontia-e-invisalign` | ortodontia Indaiatuba |
| `/odontologia-estetica` | odontologia estética Indaiatuba |
| `/diferenciais` | clínica odontológica com tecnologia em Indaiatuba |
| `/dentista-em-indaiatuba` | dentista Indaiatuba |
| `/perguntas-frequentes` | dúvidas sobre implante e reabilitação oral |
| `/contato` | agendar dentista em Indaiatuba |

## Conteúdo de GEO — `client/src/content/geo.ts`

Arquivo separado de `content/pages.ts` de propósito: `pages.ts` é a copy aprovada pela
clínica; `geo.ts` é conteúdo novo, escrito para busca, e **é o que a clínica precisa
revisar**. Nenhuma linha da copy original foi reescrita.

Motivo: `/odontologia-estetica` tinha duas frases e `/reabilitacao-oral` dois parágrafos.
Página rasa não rankeia, e — pior para GEO — não dá ao motor generativo nada para citar.

Cada rota ganhou três coisas:

- **`resumo`** — resposta direta em 1–3 frases, renderizada logo abaixo do H1
  (`.resposta-direta`). É autossuficiente: diz o quê, onde e quem responde, sem depender
  do parágrafo anterior. É o trecho com maior chance de virar citação literal. Também
  alimenta o `description` do `MedicalWebPage` e do `MedicalProcedure`.
- **`secoes`** — corpo que sustenta a palavra-chave da rota.
- **`faq`** — perguntas reais de busca, com resposta fechada.

Números depois da mudança: `/odontologia-estetica` foi de ~2 frases para **1.714 palavras**;
`/reabilitacao-oral` para **1.819**. O `llms.txt` foi de ~100 para **3.936 palavras**, com
**51 perguntas** respondidas.

**Regra rígida**: toda pergunta declarada em `FAQPage` no schema tem de estar **visível**
na página. Marcação sem conteúdo visível é violação de diretriz do Google, não atalho.
Validado no build: 54 perguntas em schema, 54 visíveis no HTML.

## schema.org — o que mudou

- **`MedicalWebPage`** por rota, com `lastReviewed` e `reviewedBy` apontando para a
  Dra. Letícia. Conteúdo de saúde é YMYL: o Google pesa quem assina e quando revisou.
  A data fica em `DATA_REVISAO` (`lib/seo.ts`) — **atualizar a cada revisão da clínica**;
  data velha é pior que data nenhuma.
- **`FAQPage` por página**, não só em `/perguntas-frequentes`. É o que torna cada URL
  elegível a resposta direta.
- **`knowsAbout` corrigido**: recebia um despejo de 50+ palavras-chave geolocalizadas.
  Passou a receber 13 tópicos ("Reabilitação oral", "Implantodontia"…) e as keywords
  foram para a propriedade `keywords`, que é onde elas pertencem.
- **`areaServed` com `sameAs`** para o verbete de cada cidade na Wikipédia (URLs
  conferidas, todas 200). Sem isso "Salto" e "Capivari" são strings ambíguas — existe
  Salto no Paraná e Capivari em Santa Catarina.

Variantes de marca (viram `alternateName` no schema): Lemarc, Le Marc, LeMarc, Clínica
Lemarc, Lemarc Odontologia, Lemarc Odontologia Indaiatuba, Odontologia Lemarc,
Dra. Letícia Marcondes, dra.lemarc.

Termos regionais: odontologia interior de São Paulo, dentista interior de SP, dentista
região de Campinas, reabilitação oral interior de São Paulo.

Regra ao editar: **só entra termo que o texto do site realmente sustenta**. Nada de
procedimento que a clínica não oferece e nada que envolva valor monetário.

## Pendências

- **Domínio**: `site.origin` em `content/site.ts` está como `https://lemarcodontologia.com.br`.
  Todo canonical, sitemap e JSON-LD sai daí — conferir antes de publicar.
- **Coordenadas**: as de `lib/seo.ts` têm precisão de **rua**, não de porta (vieram do
  OpenStreetMap; a base dos Correios não devolve lat/long para o CEP 13330-220).
  Substituir pelo pin exato assim que o Perfil da Empresa no Google existir.
- **Cidades atendidas** em `palavras-chave.ts`: hoje Indaiatuba + vizinhas. Confirmar com a
  clínica se ela quer aparecer para todas.
- **`priceRange`** não foi declarado no schema, de propósito: o documento da clínica proíbe
  valores. O Google sugere esse campo para negócios locais — se a clínica quiser preencher,
  é decisão dela.
- **Depoimentos**: quando `site.showTestimonials` virar `true`, a rota `/depoimentos` passa
  a ser pré-renderizada e entra no sitemap automaticamente. Avaliações no Perfil da Empresa
  no Google valem mais para SEO local do que depoimentos no site.
