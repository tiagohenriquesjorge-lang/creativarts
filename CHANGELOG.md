# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2026-02-06

### 🎉 Lançamento Inicial

#### Adicionado

**Configuração Base**
- Projeto Next.js 14 com TypeScript
- Configuração Tailwind CSS com cores da marca CreativART's
- ESLint e configurações de desenvolvimento
- Variáveis de ambiente (.env.example)

**Layout e Navegação**
- Header com navegação responsiva
- Footer com links e informações de contacto
- Layout principal com SEO otimizado
- Skip to main content para acessibilidade

**Homepage**
- Seção Hero com CTA
- Categorias em destaque (5 categorias)
- Produtos em destaque
- Seção "Como Funciona" (4 passos)
- Testemunhos e prova social
- Estatísticas (produtos vendidos, clientes, etc.)

**Componentes**
- ProductCard com badge "Personalizável"
- MiniCart (carrinho lateral)
- ConsentBanner (RGPD compliant)
- Loading state
- Error boundary
- 404 page personalizada

**State Management**
- Zustand store para carrinho de compras
- Persistência em LocalStorage
- Funções: addItem, removeItem, updateQuantity, applyCoupon

**Database (Supabase)**
- Schema completo (8 tabelas)
- Row Level Security policies
- Seed data com produtos de exemplo
- Índices para performance

**Tipos TypeScript**
- Product, ProductVariant, ProductImage
- Order, OrderItem, OrderStatus
- Cart, CartItem, CartItemCustomization
- Category, Coupon, User, Address
- ProductFilters

**Utilitários**
- Cliente Supabase (browser e server)
- Funções de formatação (preço, data)
- Class name merger (cn)
- Gerador de order number
- Slugify

**SEO**
- Meta tags otimizadas
- Open Graph tags
- Sitemap.xml (estrutura)
- Robots.txt
- Schema.org preparado

**Segurança**
- Headers de segurança (CSP, X-Frame-Options, etc.)
- HTTPS forçado
- RLS policies no Supabase
- CSRF/XSS protection

**Acessibilidade**
- ARIA labels
- Navegação por teclado
- Skip links
- Contraste WCAG 2.1 AA
- Focus visible

**RGPD**
- Banner de consentimento granular
- Consent Mode para Analytics
- Bloqueio de cookies até consentimento
- Armazenamento de preferências

**Documentação**
- README.md (visão geral)
- INSTALLATION.md (guia de instalação)
- QUICKSTART.md (início rápido)
- ARCHITECTURE.md (arquitetura técnica)
- DEVELOPMENT.md (guia de desenvolvimento)
- PROJECT_SUMMARY.md (resumo do projeto)
- CHANGELOG.md (este arquivo)

**Brand Guidelines**
- Paleta de cores implementada
- Tipografia (Fredoka + Inter)
- Componentes de UI (botões, inputs, cards)
- Design system básico

### 📝 Notas

Esta é a versão inicial (MVP) do projeto. Inclui a estrutura base e homepage funcional.

### 🎯 Próximas Versões

**v1.1.0** (Planejado)
- PLP (Product Listing Page) com filtros
- PDP (Product Detail Page) com variantes
- Sistema de personalização básico

**v1.2.0** (Planejado)
- Checkout completo
- Integração Stripe
- Emails transacionais

**v1.3.0** (Planejado)
- Backoffice/Admin
- Gestão de produtos
- Gestão de encomendas

---

## Formato

### Tipos de Mudanças
- `Adicionado` - para novas funcionalidades
- `Alterado` - para mudanças em funcionalidades existentes
- `Descontinuado` - para funcionalidades que serão removidas
- `Removido` - para funcionalidades removidas
- `Corrigido` - para correções de bugs
- `Segurança` - para vulnerabilidades corrigidas

### Exemplo de Entrada Futura

```markdown
## [1.1.0] - 2026-02-XX

### Adicionado
- PLP com filtros por categoria, preço, cor
- Ordenação de produtos
- Paginação

### Alterado
- Melhorias de performance na homepage
- Otimização de imagens

### Corrigido
- Bug no carrinho ao remover itens
- Erro de validação no formulário
```

