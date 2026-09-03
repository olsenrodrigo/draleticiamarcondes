# Deploy — Lemarc Odontologia

Runbook da publicação na VPS. Duas partes independentes:

- **A. Publicar o build** — toda vez que o código muda.
- **B. Ajustar o Nginx** — uma vez só (compressão e HTTP/2 ainda pendentes).

> `dist/` está no `.gitignore`. **O servidor tem de rodar o build**; `git pull` sozinho
> não publica nada. É o erro mais fácil de cometer aqui.

---

## A. Publicar o build

### 1. Atualizar o código

```bash
cd <diretorio-do-projeto>      # onde o repositório está clonado na VPS
git pull origin main
```

### 2. Instalar dependências

```bash
npm ci
```

**Não** use `--omit=dev` / `--production`. O build depende de `vite`, `tsx` e `esbuild`,
que são devDependencies. Sem elas o passo 3 falha.

### 3. Buildar

```bash
npm run build
```

Tem de terminar com estas duas linhas:

```
  53 respostas de FAQ conferidas no HTML
pre-renderizadas 14 rotas + sitemap.xml + llms.txt
```

Se aparecer `respostas de FAQ nao estao no HTML pre-renderizado`, **pare e não publique**:
é a trava de regressão avisando que algum conteúdo voltou a depender de JavaScript e
ficaria invisível para o Google e para os motores de IA. Reporte o erro em vez de contornar.

### 4. Reiniciar o processo Node

O app é um Express (`npm start` → `node dist/index.cjs`) atrás do Nginx. Como ele é
mantido no ar varia por servidor — descubra antes de agir:

```bash
pm2 list 2>/dev/null
systemctl list-units --type=service | grep -iE 'lemarc|node|leticia'
docker ps 2>/dev/null
```

Reinicie conforme o que existir (`pm2 restart <nome>`, `systemctl restart <servico>`,
`docker compose up -d --build`). O processo precisa reiniciar: o `dist/index.cjs` mudou.

### 5. Conferir que subiu

```bash
curl -s https://lemarcodontologia.com.br/perguntas-frequentes \
  | grep -o '<details class="acordeao-item"' | wc -l
```

Tem de responder **7**. Hoje (antes deste deploy) responde **0**.

Este é o teste certo porque `<details>` só existe no HTML visível — não dá para confundir
com o JSON-LD, que já trazia as respostas mesmo quando a página estava vazia. Era
exatamente essa confusão que escondeu o bug por três semanas: quem conferia pelo schema
via tudo verde.

Se vier `0`, o HTML publicado ainda é o antigo — o build não rodou ou o processo não
reiniciou. **Não siga para o passo 6.**

### 6. Avisar o Bing

```bash
npm run indexnow
```

Esperado: `IndexNow: 14 URLs enviadas (HTTP 200)` (ou `202`). Rodar **depois** de publicar —
o serviço confere a chave no domínio antes de aceitar. Acelera a indexação no Bing, que é
o índice por trás da busca do ChatGPT. O Google não usa IndexNow (lá é o Search Console).

---

## B. Ajustar o Nginx — pendente

Medido em produção em 03/09/2026:

| | Situação |
|---|---|
| HTTPS, 301 de `www` e de `http`, robots/sitemap/llms em 200, 404 real | ✅ ok |
| Compressão de JS/CSS | ❌ **só o HTML é comprimido** |
| HTTP/2 | ❌ **negocia HTTP/1.1** |

Os dois ❌ pesam em Core Web Vitals, que é critério de ranqueamento — ainda mais em busca
local no celular, de onde vem quase todo paciente.

O cache dos assets **já foi corrigido no código** (`server/static.ts`): o Express passou a
mandar `immutable` de 1 ano em `/assets` e `must-revalidate` no HTML, e o Nginx repassa.
Basta publicar (parte A).

### O diagnóstico

`gzip on` está ativo, mas com o `gzip_types` no padrão — que comprime **apenas**
`text/html`. Por isso o HTML volta comprimido e os 410 KB de JavaScript voltam crus.

### A mudança

No bloco `server` da porta 443 (normalmente `/etc/nginx/sites-available/lemarcodontologia`).
Faça backup antes: `cp <arquivo> <arquivo>.bak-$(date +%F)`.

```nginx
listen 443 ssl;
http2 on;                      # nginx >= 1.25.1
                               # em versões anteriores, use: listen 443 ssl http2;

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

Confira a versão antes de escolher a forma do `http2`: `nginx -v`.

```bash
nginx -t && systemctl reload nginx
```

**Não altere** o que já está certo: os 301 de `www` e de `http`, e os cabeçalhos
`Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy` e `Permissions-Policy`.

### Conferir

```bash
JS=$(curl -s https://lemarcodontologia.com.br/ | grep -o 'assets/index-[^"]*\.js' | head -1)
curl -sI --http2 -H 'Accept-Encoding: gzip' "https://lemarcodontologia.com.br/$JS" \
  | grep -iE 'HTTP/|content-encoding|cache-control'
```

Esperado, as três linhas:

```
HTTP/2 200
content-encoding: gzip
cache-control: public, max-age=31536000, immutable
```

Ganho: 410 KB de JS caem para ~124 KB — **70% a menos** para quem chega pela busca.

---

## Depois do deploy — no navegador, não no servidor

1. **Search Console** → enviar `sitemap.xml` e pedir indexação da home.
2. **Bing Webmaster Tools** → mesma coisa (complementa o IndexNow).
3. Reprocessar `/perguntas-frequentes` no Search Console: é a página que mais mudou.

O que de fato move "dentista Indaiatuba" não está nem no código nem no Nginx — está no
**Perfil da Empresa no Google**, no **site na bio do Instagram** e no **NAP consistente**.
Ver `SEO.md`.
