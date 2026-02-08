# 🚀 Guia de Deploy - CreativART's

## 📋 Pré-requisitos

Antes de fazer deploy, certifique-se de que:

- ✅ Projeto funciona localmente (`npm run dev`)
- ✅ Build passa sem erros (`npm run build`)
- ✅ Testes de lint passam (`npm run lint`)
- ✅ Type-check passa (`npm run type-check`)
- ✅ Supabase configurado e funcional
- ✅ Variáveis de ambiente documentadas

## 🌐 Opções de Deploy

### Opção 1: Vercel (Recomendado)

Vercel é a plataforma criada pela equipa do Next.js e oferece a melhor integração.

#### Passos:

1. **Criar conta na Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub/GitLab/Bitbucket

2. **Conectar repositório**
   - Clique em "New Project"
   - Importe o repositório do GitHub
   - Vercel detecta automaticamente Next.js

3. **Configurar variáveis de ambiente**
   ```
   NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
   SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
   STRIPE_SECRET_KEY=sk_live_xxx
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   RESEND_API_KEY=re_xxx
   ```

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde o build (2-3 minutos)
   - Acesse a URL fornecida

5. **Configurar domínio customizado**
   - Settings > Domains
   - Adicione seu domínio
   - Configure DNS conforme instruções

#### Vantagens:
- ✅ Deploy automático a cada push
- ✅ Preview deployments para PRs
- ✅ Edge Network global
- ✅ SSL automático
- ✅ Analytics integrado

---

### Opção 2: Netlify

Alternativa popular com bom suporte para Next.js.

#### Passos:

1. **Criar conta na Netlify**
   - Acesse [netlify.com](https://netlify.com)

2. **Conectar repositório**
   - "Add new site" > "Import from Git"

3. **Configurar build**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **Adicionar variáveis de ambiente**
   - Site settings > Environment variables
   - Adicione todas as variáveis

5. **Deploy**

---

### Opção 3: Docker + VPS

Para deploy em servidor próprio.

#### Dockerfile:

```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

#### docker-compose.yml:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env.production
    restart: unless-stopped
```

---

## 🔐 Segurança em Produção

### 1. Variáveis de Ambiente

**Nunca commite:**
- `.env.local`
- `.env.production`
- Chaves secretas

**Use:**
- Variáveis de ambiente da plataforma
- Secrets management (Vercel Secrets, etc.)

### 2. Headers de Segurança

Já configurados em `next.config.js`:
- ✅ HSTS
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ CSP (Content Security Policy)

### 3. Supabase RLS

Certifique-se de que:
- ✅ RLS está ativado em todas as tabelas
- ✅ Policies estão corretas
- ✅ Service role key está segura

### 4. Stripe

- ✅ Use chaves de produção (`pk_live_`, `sk_live_`)
- ✅ Configure webhooks para produção
- ✅ Teste 3D Secure

---

## 📊 Monitorização

### 1. Vercel Analytics

Se usar Vercel:
```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 2. Google Analytics 4

Já preparado no código. Configure:
1. Crie propriedade GA4
2. Adicione `NEXT_PUBLIC_GA_MEASUREMENT_ID` às env vars
3. Implemente eventos de e-commerce

### 3. Error Tracking

Recomendado: Sentry

```bash
npm install @sentry/nextjs
```

---

## ✅ Checklist de Deploy

### Antes do Deploy

- [ ] Código commitado e pushed
- [ ] `npm run build` passa localmente
- [ ] `npm run lint` sem erros
- [ ] `npm run type-check` sem erros
- [ ] Variáveis de ambiente documentadas
- [ ] Supabase em produção configurado
- [ ] Stripe em modo produção
- [ ] Domínio registado (se aplicável)

### Durante o Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Build passa na plataforma
- [ ] Site acessível via URL
- [ ] SSL ativo (HTTPS)

### Após o Deploy

- [ ] Testar homepage
- [ ] Testar navegação
- [ ] Testar carrinho
- [ ] Testar consentimento RGPD
- [ ] Verificar imagens carregam
- [ ] Verificar fontes carregam
- [ ] Testar em mobile
- [ ] Lighthouse audit (>90 em todas)
- [ ] Verificar console sem erros
- [ ] Testar formulários (quando implementados)
- [ ] Configurar domínio customizado
- [ ] Configurar DNS
- [ ] Configurar emails (SPF, DKIM, DMARC)

---

## 🔄 CI/CD

### GitHub Actions (Exemplo)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
```

---

## 🌍 DNS e Domínio

### Configuração DNS

Para domínio customizado:

```
Type    Name    Value
A       @       76.76.21.21 (IP da Vercel)
CNAME   www     cname.vercel-dns.com
```

### SSL/TLS

- Vercel/Netlify: Automático
- VPS: Use Let's Encrypt (Certbot)

---

## 📈 Performance

### Otimizações Pós-Deploy

1. **CDN**: Já incluído (Vercel/Netlify)
2. **Caching**: Configurado no Next.js
3. **Compression**: Gzip/Brotli automático
4. **Image Optimization**: Next.js Image

### Monitorizar

- Core Web Vitals
- Lighthouse CI
- Real User Monitoring (RUM)

---

## 🆘 Rollback

### Vercel

1. Deployments > Selecione versão anterior
2. Clique nos 3 pontos > "Promote to Production"

### Git

```bash
git revert HEAD
git push
```

---

## 📞 Suporte

Em caso de problemas:
1. Verifique logs da plataforma
2. Consulte TROUBLESHOOTING.md
3. Verifique variáveis de ambiente
4. Teste localmente primeiro

---

**Última atualização**: 2026-02-06

