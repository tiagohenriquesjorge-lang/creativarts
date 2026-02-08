# Arquitetura do Projeto - CreativART's

## 📐 Visão Geral

Este documento descreve a arquitetura técnica da loja online CreativART's.

## 🏗️ Stack Tecnológica

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (carrinho)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

### Backend/Database
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **API**: Next.js API Routes

### Integrações
- **Pagamentos**: Stripe
- **Email**: Resend
- **Analytics**: Google Analytics 4

## 📁 Estrutura de Diretórios

```
creativarts-store/
├── app/                          # Next.js App Router
│   ├── (routes)/                # Rotas agrupadas
│   │   ├── produtos/           # Listagem e detalhes
│   │   ├── carrinho/           # Carrinho de compras
│   │   ├── checkout/           # Processo de checkout
│   │   ├── conta/              # Área do cliente
│   │   └── admin/              # Backoffice
│   ├── api/                    # API Routes
│   │   ├── products/          # CRUD produtos
│   │   ├── orders/            # Gestão de encomendas
│   │   ├── coupons/           # Validação de cupões
│   │   └── webhooks/          # Stripe webhooks
│   ├── layout.tsx             # Layout raiz
│   ├── page.tsx               # Homepage
│   └── globals.css            # Estilos globais
│
├── components/                 # Componentes React
│   ├── layout/                # Header, Footer, Navigation
│   ├── home/                  # Componentes da homepage
│   ├── products/              # ProductCard, ProductGrid, etc.
│   ├── cart/                  # MiniCart, CartItem
│   ├── checkout/              # Formulários de checkout
│   ├── customization/         # Sistema de personalização
│   ├── consent/               # RGPD/Cookies
│   └── ui/                    # Componentes reutilizáveis
│
├── lib/                       # Bibliotecas e utilitários
│   ├── supabase/             # Cliente Supabase
│   │   ├── client.ts         # Cliente browser
│   │   └── server.ts         # Cliente server (admin)
│   ├── stripe/               # Configuração Stripe
│   ├── email/                # Templates de email
│   └── utils/                # Funções auxiliares
│       ├── cn.ts             # Class name merger
│       └── format.ts         # Formatação (preço, data)
│
├── store/                     # Zustand stores
│   └── cartStore.ts          # Estado do carrinho
│
├── types/                     # TypeScript types
│   └── index.ts              # Tipos principais
│
├── supabase/                  # Scripts Supabase
│   ├── schema.sql            # Schema da BD
│   ├── rls-policies.sql      # Row Level Security
│   └── seed.sql              # Dados de exemplo
│
└── public/                    # Assets estáticos
    ├── images/               # Imagens
    └── fonts/                # Fontes (se necessário)
```

## 🗄️ Schema da Base de Dados

### Tabelas Principais

1. **categories**
   - Categorias de produtos (hierárquicas)
   - Campos: id, name, slug, parent_id, position

2. **products**
   - Produtos base
   - Campos: id, name, slug, description, category_id, base_price, is_customizable

3. **product_variants**
   - Variantes (cor, tamanho, material)
   - Campos: id, product_id, sku, color, size, price_adjustment, stock_quantity

4. **product_images**
   - Imagens dos produtos
   - Campos: id, product_id, url, position, is_primary

5. **orders**
   - Encomendas
   - Campos: id, order_number, status, total, customer_email, shipping_address

6. **order_items**
   - Itens da encomenda
   - Campos: id, order_id, product_id, quantity, customization

7. **coupons**
   - Cupões de desconto
   - Campos: id, code, type, value, valid_from, valid_until

### Relações

```
categories (1) ──→ (N) products
products (1) ──→ (N) product_variants
products (1) ──→ (N) product_images
orders (1) ──→ (N) order_items
products (1) ──→ (N) order_items
```

## 🔐 Segurança

### Row Level Security (RLS)

- **Produtos**: Público pode ler produtos ativos
- **Encomendas**: Utilizadores só veem as suas encomendas
- **Admin**: Role especial com acesso total
- **Cupões**: Público pode validar cupões ativos

### Autenticação

- Supabase Auth para utilizadores registados
- Checkout como convidado (sem registo)
- JWT tokens para sessões

### Headers de Segurança

- HTTPS forçado
- CSP (Content Security Policy)
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff

## 🎨 Sistema de Design

### Cores (Brand)

```css
--brand-yellow: #F9D648
--brand-blue: #00AEEF
--brand-red: #ED1C24 (Primary)
--brand-black: #000000
--brand-gray-dark: #333333
--brand-gray-light: #F5F5F5
```

### Componentes Base

- **Botões**: btn-primary, btn-secondary, btn-outline
- **Inputs**: input-field
- **Cards**: card
- **Badges**: badge-customizable

## 🔄 Fluxo de Dados

### Carrinho de Compras

```
User Action → Zustand Store → LocalStorage
                ↓
            MiniCart Component
                ↓
            Checkout Page
                ↓
            Stripe Payment
                ↓
            Webhook → Create Order
                ↓
            Email Confirmation
```

### Personalização

```
PDP → Customization Form → Preview Component
                ↓
        Add to Cart (with customization data)
                ↓
        Cart → Checkout → Order
                ↓
        Admin sees customization details
```

## 📊 Performance

### Otimizações

- **Images**: Next.js Image com AVIF/WEBP
- **Fonts**: Google Fonts com display=swap
- **Code Splitting**: Automático (Next.js)
- **Lazy Loading**: Componentes e imagens
- **Caching**: ISR para páginas de produtos

### Core Web Vitals Targets

- LCP < 2.5s
- CLS < 0.1
- TBT < 300ms

## 🧪 Testing (Futuro)

- **Unit**: Jest + React Testing Library
- **E2E**: Playwright
- **Visual**: Percy
- **A11y**: axe-core

## 🚀 Deploy

### Recomendações

- **Frontend**: Vercel (otimizado para Next.js)
- **Database**: Supabase (já hospedado)
- **CDN**: Cloudflare (opcional)

### Ambientes

- **Development**: localhost:3000
- **Staging**: staging.creativarts.com
- **Production**: www.creativarts.com

## 📈 Escalabilidade

### Considerações Futuras

1. **Cache**: Redis para sessões e cache
2. **CDN**: Para assets estáticos
3. **Queue**: Para processamento de encomendas
4. **Search**: Algolia ou Meilisearch
5. **Monitoring**: Sentry para erros

## 🔌 APIs Externas

### Stripe

- Checkout Sessions
- Payment Intents
- Webhooks

### Resend

- Transactional emails
- Order confirmations
- Shipping notifications

### Google Analytics

- E-commerce events
- Consent Mode
- Conversion tracking

