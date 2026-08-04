# SEO e GEO — Lemarc Odontologia

**SEO** = aparecer na busca do Google.
**GEO** (*Generative Engine Optimization*) = ser citado nas respostas do ChatGPT, Claude,
Perplexity, Gemini e da visão geral de IA do Google.

## Onde cada coisa mora

A pergunta "isso é local ou na VPS?" tem três respostas, porque o trabalho se divide em
três lugares diferentes:

### 1. No código (este repositório) — feito

Tudo o que segue está implementado e vai junto no deploy. Não depende da VPS.

| Item | Onde |
|---|---|
| Title, description e canonical por rota | `client/src/content/rotas.ts` + `lib/seo.ts` |
| Palavras-chave por rota | `client/src/content/palavras-chave.ts` |
| schema.org (`Dentist`, `Person`, `WebSite`, `MedicalProcedure`, `FAQPage`, `BreadcrumbList`) | `lib/seo.ts` |
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
canibalização entre páginas. Resumo:

| Rota | Palavra-chave primária |
|---|---|
| `/` | dentista em Indaiatuba |
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
| `/dentista-em-indaiatuba` | dentista em Indaiatuba |
| `/perguntas-frequentes` | dúvidas sobre implante e reabilitação oral |
| `/contato` | agendar dentista em Indaiatuba |

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
