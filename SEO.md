# SEO e GEO — Lemarc Odontologia

**SEO** = aparecer na busca do Google.
**GEO** (*Generative Engine Optimization*) = ser citado nas respostas do ChatGPT, Claude,
Perplexity, Gemini e da visão geral de IA do Google.

## ⚠️ O gargalo é conexão, não indexação

> Corrigido em **04/09/2026**. Até aqui este documento dizia que o site não estava no
> índice do Google. **Estava errado** — a checagem original foi feita com o operador
> `site:` numa busca comum, que é notoriamente incompleto. O Search Console, que é a
> fonte de verdade, mostra outra coisa.

Estado real, lido no Search Console em 04/09/2026:

- **12 páginas indexadas**, rastreadas entre 13 e 27/08.
- **Zero** páginas em "Rastreada, mas não indexada" — nenhuma foi rejeitada por qualidade.
- As 8 "não indexadas" são variantes `www` sendo consolidadas — comportamento correto.
- O site recebeu **5 cliques** de busca no último mês. Pouco, mas não é zero.
- Sitemap enviado e **processado**, 14 páginas encontradas.
- As 14 URLs foram enviadas para rastreamento prioritário em 03 e 04/09, depois da
  correção do acordeão — o índice ainda guarda a versão sem as respostas de FAQ.

Então o problema nunca foi o Google não achar o site. É que **o site está desconectado do
ativo que a clínica realmente tem**: um Perfil da Empresa com 5,0 ★ e 91 avaliações que
aponta para um Linktree em vez de apontar para o domínio. Ver a seção do Perfil, abaixo.

Ordem de execução — o item 4 é o de maior retorno:

| # | Ação | Onde | Status |
|---|---|---|---|
| 1 | Verificar o domínio no Search Console | registro TXT no DNS | ✅ feito em 11/08/2026 |
| 2 | Enviar `sitemap.xml` e pedir reindexação das 14 URLs | Search Console | ✅ feito em 03–04/09/2026 |
| 3 | Primeiro link externo real: **site na bio do Instagram** (hoje o Linktree não aponta para ele) e no Facebook | plataformas | pendente |
| 4 | ~~Criar~~ **corrigir** o Perfil da Empresa: o campo "site" aponta para o Linktree | Google Business | **pendente — maior impacto** |
| 5 | 301 de `www` para não-www | Nginx da VPS | ✅ conferido em 03/09/2026 |
| 6 | Corrigir divergência de NAP (ver abaixo) | Facebook/diretórios | site ✅ 04/09 · redes pendentes |
| 7 | Compressão e cache dos assets no Nginx (ver "Na VPS") | Nginx da VPS | pendente |
| 8 | Avisar o Bing por IndexNow (`npm run indexnow`) | pós-deploy | pendente |

**NAP — resolvido em 04/09/2026.** A grafia oficial passa a ser a do Perfil da Empresa:

> **Lemarc Odontologia** — Rua Cinco de Julho, 697 – Sala 2, Centro, Indaiatuba/SP,
> CEP 13330-220 — (19) 3894-5273

O site já foi alinhado. Replicar exatamente essa grafia no Instagram, no Facebook, no
Doctoralia e em qualquer diretório: endereço divergente entre fontes é um dos maiores
freios de SEO local.

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

### 2. Na VPS — o que ainda falta

Estado medido em produção em **03/09/2026** (`curl -I` contra o domínio real):

| Item | Situação |
|---|---|
| HTTPS com certificado válido | ✅ ok |
| 301 de `www` e de `http` para `https://` sem `www` | ✅ ok |
| `/robots.txt`, `/sitemap.xml`, `/llms.txt` respondendo 200 | ✅ ok |
| HTML pré-renderizado servido inclusive para GPTBot | ✅ ok |
| 404 com status HTTP 404 real | ✅ ok |
| **Compressão de JS/CSS** | ❌ **só o HTML é comprimido** |
| **Cache dos assets com hash** | ❌ **`max-age=0` em tudo** |
| **HTTP/2** | ❌ **negocia HTTP/1.1** |

Os três ❌ pesam em Core Web Vitals, e Core Web Vitals é critério de ranqueamento — ainda
mais em busca local no celular, que é de onde vem quase todo paciente.

**Cache**: já corrigido no código (`server/static.ts` — `immutable` de 1 ano em `/assets`,
`must-revalidate` no HTML). Basta publicar o build novo; o Nginx repassa esses cabeçalhos.

**Compressão e HTTP/2**: precisam do Nginx. O sintoma é clássico — `gzip on` com o
`gzip_types` no padrão, que comprime **apenas** `text/html`. Por isso o HTML volta
comprimido e os 410 KB de JavaScript voltam crus.

No bloco `server` do site (normalmente `/etc/nginx/sites-available/lemarcodontologia`):

```nginx
listen 443 ssl;
http2 on;                      # nginx >= 1.25.1; nas versões antigas: listen 443 ssl http2;

gzip on;
gzip_comp_level 6;
gzip_min_length 1024;
gzip_proxied any;              # sem isto o Nginx não comprime o que vem do Express
gzip_vary on;                  # Vary: Accept-Encoding — obrigatório com cache/CDN
gzip_types
  text/plain text/css text/xml text/javascript
  application/javascript application/json application/xml
  application/ld+json image/svg+xml;
```

Depois: `nginx -t && systemctl reload nginx`.

Conferir se pegou (as três linhas têm de aparecer):

```bash
curl -sI --http2 -H 'Accept-Encoding: gzip' https://lemarcodontologia.com.br/assets/$(
  curl -s https://lemarcodontologia.com.br/ | grep -o 'assets/index-[^"]*\.js' | head -1 | cut -d/ -f2
) | grep -iE 'HTTP/|content-encoding|cache-control'
```

Esperado: `HTTP/2 200`, `content-encoding: gzip`, `cache-control: public, max-age=31536000, immutable`.

O ganho é grande: 410 KB de JS caem para ~124 KB comprimidos — **70% a menos** no
carregamento de quem chega pela busca.

Servir o app com `npm start` (Express) atrás do Nginx, **sem** reescrever tudo para
`index.html`: o servidor já entrega o HTML correto de cada rota.

### 3. Fora dos dois — plataformas externas

Aqui está o maior ganho de SEO local para uma clínica, e não é código nem servidor:

- **Perfil da Empresa no Google** — **já existe, com 5,0 ★ e 91 avaliações.** Não criar
  outro: perfil duplicado divide avaliações. O que falta é corrigir o campo "site", que
  aponta para o Linktree. Ver a seção própria mais abaixo.
- **Google Search Console** e **Bing Webmaster Tools**: enviar o sitemap e acompanhar
  indexação.
- **NAP consistente** (nome, endereço, telefone escritos exatamente igual) no site, no
  Perfil da Empresa, no Instagram, no Doctoralia e em diretórios locais. Divergência de
  endereço entre fontes é um dos maiores problemas de SEO local.
- **Instagram** `@dra.lemarc`: colocar o site na bio (hoje o Linktree não aponta para ele).

### IndexNow — o atalho para o ChatGPT

A busca do ChatGPT roda sobre o índice do **Bing**. Enquanto o Bing não passar no site, a
clínica não existe para o ChatGPT, por melhor que esteja o HTML. Num domínio novo isso
pode levar semanas.

O IndexNow encurta para horas e é o único canal de submissão que aceita chamada direta,
sem painel e sem login. Já está pronto no repositório:

```bash
npm run build          # gera o sitemap novo
# publicar o dist/ na VPS
npm run indexnow       # avisa Bing, Yandex e Seznam
```

A chave fica em `client/public/a57df01247021f1eeb82d0a22806cca7.txt` e vai junto no build —
o serviço busca esse arquivo para confirmar que quem avisou controla o domínio. O script
confere isso antes de enviar e falha com mensagem clara se o deploy ainda não subiu.

**Rodar a cada publicação.** O Google não usa IndexNow: lá o caminho é o Search Console.

## O Perfil da Empresa já existe — e aponta para o lugar errado (04/09/2026)

Durante meses o plano dizia "criar o Perfil da Empresa no Google". **Ele já existe**,
está reivindicado e é o ativo mais forte da clínica:

| | |
|---|---|
| Nome | Lemarc Odontologia |
| Nota | **5,0 ★ com 91 avaliações** |
| Categoria | Clínica odontológica |
| Endereço | R. Cinco de Julho, 697 — **Centro**, Indaiatuba/SP, 13330-220 |
| Telefone | (19) 3894-5273 ✅ confere com o site |
| **Site** | **`linktr.ee`** ❌ |
| Ficha | `https://maps.google.com/?cid=13027717339812848473` |

**O campo "site" do Perfil aponta para o Linktree, não para lemarcodontologia.com.br.**

Isso é, muito provavelmente, a explicação principal para o domínio não ter autoridade.
O Perfil é a citação local mais confiável que a clínica possui — e ela não aponta para o
site. Toda a reputação de 91 avaliações fica represada numa página de links.

Não crie um Perfil novo: **perfil duplicado divide avaliações e o Google acaba suprimindo
um dos dois.** O caminho é corrigir o que existe.

### Divergências entre o site e o Perfil, encontradas na conferência

| Campo | Site (antes) | Perfil / Correios | Situação |
|---|---|---|---|
| Coordenadas | −23,0859 / −47,2179 | −23,0892 / −47,2200 | ✅ corrigido — estava **422 m** fora |
| `hasMap` | busca no Maps | ficha da clínica | ✅ corrigido |
| `sameAs` | só Instagram | + ficha do Maps | ✅ corrigido — liga as duas entidades |
| Bairro | Jardim Pau Preto | **Centro** (Perfil **e** Correios) | ✅ corrigido em 04/09 — site passou a dizer Centro |
| Rua | "Rua 5 de Julho" | "Rua Cinco de Julho" | ✅ normalizado para bater com o Perfil |
| Horário | seg–sex 9–12 e 14–18 | fecha 19h, abre sáb. 8h | ⚠️ **o site está certo — corrigir no Perfil** |

O CEP 13330-220 resolve como **"Rua Cinco de Julho, Centro"** na base dos Correios
(BrasilAPI), e o Perfil também diz Centro. O site era a única fonte que dizia "Jardim Pau
Preto"; confirmado com a clínica em 04/09/2026, **Centro passou a ser a grafia oficial** e
todo o site foi alinhado (17 ocorrências em `content/` e `lib/seo.ts`, incluindo duas
frases que diziam "bairro vizinho ao Centro" e viraram contradição).

Os termos de bairro em `palavras-chave.ts` acompanharam: saiu "dentista Jardim Pau Preto",
entrou "clínica odontológica Centro Indaiatuba". A regra do arquivo continua valendo — só
entra termo que o texto do site sustenta.

### O que fazer dentro do Perfil (por ordem de impacto)

1. **Trocar o site de `linktr.ee` para `https://lemarcodontologia.com.br`.** É a mudança
   de maior retorno do projeto inteiro, e leva trinta segundos.
2. Conferir se o horário publicado é o real (o do site diverge).
3. Preencher **Serviços** com os tratamentos das páginas do site — cada um vira um termo
   que a ficha passa a responder.
4. Publicar fotos pelo perfil (as do ensaio já estão no repositório).
5. Responder as avaliações. Perfil que responde recebe mais peso que perfil silencioso.

Não mexa no **nome**: concorrentes locais usam "Fulano — Dentista Indaiatuba" para enfiar
a palavra-chave, mas isso viola as diretrizes do Google e dá suspensão. O lugar certo da
palavra-chave é a **categoria** e o campo **Serviços**.

### O pacote local de Indaiatuba (quem a clínica enfrenta)

Do próprio Maps, em "Lugares também pesquisados":

| Concorrente | Nota | Avaliações |
|---|---|---|
| Odontoclinic Indaiatuba | 4,9 | **604** |
| Dra Karina Eccel | 5,0 | 154 |
| Odonto Freitas — Centro | 5,0 | 62 |
| **Lemarc Odontologia** | **5,0** | **91** |
| Dra. Márcia Maria | 5,0 | 40 |
| Dra. Raissa Lopes | 5,0 | 27 |

A Lemarc é a **segunda em volume de avaliações** entre as clínicas independentes e empata
em nota com todas. Ela não está fora da disputa — está bem posicionada e desconectada do
próprio site.

## O acordeão invisível — corrigido em 03/09/2026

O bug mais caro do site até aqui, e o mais difícil de ver: **as respostas do FAQ nunca
chegaram ao HTML**. Em nenhuma página.

Causa: o `Accordion` do Radix **desmonta** o conteúdo fechado. A resposta só passava a
existir no DOM depois de alguém clicar. Como nenhum crawler clica, o que GPTBot, ClaudeBot,
PerplexityBot e o crawler de IA do Google liam era só a lista de perguntas.

Tamanho do estrago: **53 pares pergunta/resposta, ~2.419 palavras** ausentes do HTML —
justamente o formato que motores generativos mais citam. `/perguntas-frequentes` tinha
**174 palavras visíveis**; era, na prática, uma página vazia.

Por que passou despercebido por três semanas:

1. **No navegador estava tudo certo** — basta clicar e a resposta aparece.
2. **O JSON-LD estava correto**: o `FAQPage` trazia as respostas completas. Quem conferia
   pelo Rich Results Test via tudo verde enquanto a página visível estava vazia.
3. **A conferência da época contava perguntas, não respostas** — e as perguntas apareciam,
   pois são o texto do botão.

Correção (`client/src/components/Secoes.tsx`): o acordeão passou a ser `<details>/<summary>`
nativo. O texto está sempre no HTML, funciona sem JavaScript e continua acessível por
teclado sem ARIA manual. Em `/perguntas-frequentes` as respostas abrem já visíveis
(`todosAbertos`), porque a página existe para ser lida inteira.

Efeito no HTML entregue:

| Página | Antes | Depois |
|---|---|---|
| `/perguntas-frequentes` | 174 | **494** (+184%) |
| `/implantes-dentarios` | 455 | 645 (+42%) |
| `/odontologia-estetica` | 792 | 1.105 (+40%) |
| `/reabilitacao-oral` | 936 | 1.215 (+30%) |
| **Site inteiro** | **7.466** | **9.885 (+32%)** |

**Trava permanente**: `conferirRespostas()` em `script/prerender.ts` compara cada resposta
de `geo.ts`/`pages.ts` com o texto do HTML gerado e **quebra o build** se faltar alguma.
Testada quebrando o componente de propósito: acusou as 53 e abortou.

Lição que vale para o resto do site: **qualquer conteúdo que só aparece após interação
(abas, "leia mais", modais, carrossel com texto) não existe para busca nem para IA.**

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

Números depois da mudança, contando o **arquivo de conteúdo**: `/odontologia-estetica` foi
de ~2 frases para 1.714 palavras; `/reabilitacao-oral` para 1.819. O `llms.txt` foi de ~100
para 3.936 palavras, com 51 perguntas respondidas.

Atenção ao ler esses números: eles medem o conteúdo escrito, **não** o que sai no HTML.
Até 03/09/2026 as duas medidas eram bem diferentes (o acordeão engolia as respostas).
O que vale para busca é sempre o HTML entregue — medir com `curl`, nunca pelo `.ts`.

**Regra rígida**: toda pergunta declarada em `FAQPage` no schema tem de estar **visível**
na página. Marcação sem conteúdo visível é violação de diretriz do Google, não atalho.

> ⚠️ Esta regra ficou **quebrada de 11/08 a 03/09/2026** e ninguém percebeu, porque a
> conferência da época contava as **perguntas** — que apareciam, pois são o texto do botão
> — e nunca as **respostas**, que não apareciam. Ver "O acordeão invisível", abaixo.
> Hoje o build confere as respostas e quebra se faltar alguma (`script/prerender.ts`).

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
