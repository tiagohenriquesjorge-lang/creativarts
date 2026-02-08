# CreativART's - Loja Online de Produtos Personalizados

Loja de e-commerce focada em produtos personalizáveis: t-shirts, bonés, porta-chaves, canetas e impressões 3D.

## 🎉 100% GRATUITO!

Este projeto usa apenas serviços gratuitos:
- ✅ **Supabase** (Free tier - 500MB DB, 1GB storage)
- ✅ **Vercel** (Free tier - 100GB bandwidth/mês)
- ✅ **Stripe** (Modo teste - sem custos)
- ✅ **Resend** (Free tier - 100 emails/dia)

**Custo total**: 0€/mês 🎉

## 🚀 Stack Tecnológica

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **Pagamentos**: Stripe
- **Storage**: Supabase Storage
- **Email**: Resend
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod

## 🎨 Brand Guidelines

### Paleta de Cores
- **Amarelo**: #F9D648
- **Azul**: #00AEEF
- **Vermelho**: #ED1C24 (Primary - Botões de ação)
- **Preto**: #000000
- **Cinza Escuro**: #333333
- **Cinza Claro**: #F5F5F5
- **Branco**: #FFFFFF

### Tipografia
- **Headings**: Fredoka
- **Body**: Inter

## ✅ Funcionalidades Implementadas

### v1.0 - Foundation
- ✅ Homepage completa (Hero, Categorias, Produtos, Testemunhos)
- ✅ Header & Footer responsivos
- ✅ Mini-carrinho lateral
- ✅ Banner RGPD com consentimento granular
- ✅ Database schema completo (8 tabelas)
- ✅ SEO otimizado (meta tags, Open Graph)
- ✅ Performance (Core Web Vitals)

### v1.1 - Product Pages 🎉 NOVO!
- ✅ **PLP** - Listagem de produtos com filtros (categoria, preço, personalização)
- ✅ **PDP** - Página de detalhes com galeria, variantes, add to cart
- ✅ **Carrinho** - Página completa com cupões e cálculo de envio
- ✅ Ordenação (preço, nome, recentes)
- ✅ Breadcrumbs e navegação
- ✅ Loading states e empty states

### 🔄 Em Desenvolvimento
- ⏳ Sistema de personalização (texto + upload)
- ⏳ Checkout multi-step
- ⏳ Integração Stripe
- ⏳ Backoffice/Admin

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta Supabase
- Conta Stripe
- Conta Resend (para emails)

## 🛠️ Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd creativarts-store
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Copie o arquivo `.env.example` para `.env.local`:
```bash
cp .env.example .env.local
```

Preencha as variáveis no `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@creativarts.com

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

4. **Execute o servidor de desenvolvimento**
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura do Projeto

```
creativarts-store/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Rotas da aplicação
│   ├── api/               # API Routes
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Homepage
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── layout/           # Header, Footer
│   ├── home/             # Componentes da homepage
│   ├── products/         # Componentes de produtos
│   ├── cart/             # Carrinho de compras
│   └── consent/          # RGPD/Cookies
├── lib/                  # Utilitários e configurações
│   ├── supabase/        # Cliente Supabase
│   ├── stripe/          # Configuração Stripe
│   └── utils/           # Funções auxiliares
├── store/               # Zustand stores
├── types/               # TypeScript types
└── public/              # Assets estáticos
```

## 🗄️ Configuração do Supabase

### Schema da Base de Dados

Execute os seguintes comandos SQL no Supabase SQL Editor:

```sql
-- Ver arquivo: supabase/schema.sql
```

(O schema completo será criado em arquivo separado)

## 💳 Configuração do Stripe

1. Crie uma conta em [stripe.com](https://stripe.com)
2. Obtenha as chaves de API (modo teste)
3. Configure os webhooks para: `/api/webhooks/stripe`
4. Eventos necessários:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

## 📧 Configuração de Email (Resend)

1. Crie uma conta em [resend.com](https://resend.com)
2. Verifique o seu domínio
3. Obtenha a API key
4. Configure SPF, DKIM e DMARC

## ✅ Funcionalidades Implementadas (v1.0 MVP)

### Frontoffice
- ✅ Homepage com hero, categorias, produtos em destaque
- ✅ Header com navegação e carrinho
- ✅ Footer com links e informações
- ✅ Sistema de carrinho (Zustand)
- ✅ Banner de consentimento RGPD
- ⏳ PLP (Product Listing Page) com filtros
- ⏳ PDP (Product Detail Page) com variantes
- ⏳ Sistema de personalização (texto + upload)
- ⏳ Checkout como convidado
- ⏳ Páginas estáticas (Sobre, Contactos, etc.)

### Backoffice
- ⏳ CRUD de produtos
- ⏳ Gestão de stock
- ⏳ Gestão de encomendas
- ⏳ Cupões de desconto
- ⏳ Relatórios básicos

### Integrações
- ⏳ Stripe (pagamentos)
- ⏳ Supabase (database + auth + storage)
- ⏳ Resend (emails transacionais)
- ⏳ Google Analytics 4

## 🎯 Próximos Passos

1. Configurar Supabase (schema, RLS policies)
2. Implementar PLP e PDP
3. Sistema de personalização
4. Integração Stripe
5. Backoffice/Admin
6. Testes e otimizações

## 📝 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Linter
- `npm run type-check` - Verificação de tipos

## 🔒 Segurança e Conformidade

- HTTPS forçado
- Headers de segurança configurados
- RGPD compliant (banner de consentimento)
- Consent Mode para Analytics
- CSP (Content Security Policy)
- CSRF/XSS protection

## 📊 Performance

- Core Web Vitals otimizados
- Imagens em AVIF/WEBP
- Lazy loading
- Code splitting automático (Next.js)
- Lighthouse score target: 90+

## 🌐 SEO

- Metadata otimizada
- Schema.org (Product, BreadcrumbList, Organization)
- Sitemap.xml
- Robots.txt
- Open Graph
- Canonical URLs

## 📞 Suporte

Para questões ou suporte, contacte: info@creativarts.com

## 📄 Licença

Propriedade de CreativART's. Todos os direitos reservados.

