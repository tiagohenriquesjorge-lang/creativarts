# Guia de Instalação - CreativART's

Este guia irá ajudá-lo a configurar o projeto do zero.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18 ou superior ([Download](https://nodejs.org/))
- **npm** (vem com Node.js)
- **Git** ([Download](https://git-scm.com/))

## 🚀 Passo 1: Instalação Local

### 1.1 Instalar Dependências

```bash
npm install
```

Isto irá instalar todas as dependências necessárias definidas no `package.json`.

### 1.2 Configurar Variáveis de Ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env.local
```

**Nota**: Por enquanto, deixe as variáveis vazias. Vamos preenchê-las nos próximos passos.

## 🗄️ Passo 2: Configurar Supabase

### 2.1 Criar Conta Supabase

1. Aceda a [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Crie uma conta (pode usar GitHub)

### 2.2 Criar Novo Projeto

1. Clique em "New Project"
2. Escolha um nome: `creativarts-store`
3. Defina uma password forte para a base de dados (guarde-a!)
4. Escolha a região mais próxima (ex: Europe West)
5. Clique em "Create new project"
6. Aguarde 2-3 minutos enquanto o projeto é criado

### 2.3 Obter Credenciais

1. No dashboard do projeto, vá a **Settings** → **API**
2. Copie os seguintes valores:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Mantenha secreta!)

3. Cole estes valores no seu `.env.local`

### 2.4 Criar Schema da Base de Dados

1. No Supabase, vá a **SQL Editor**
2. Clique em "New query"
3. Copie todo o conteúdo de `supabase/schema.sql`
4. Cole no editor e clique em "Run"
5. Aguarde a confirmação "Success"

### 2.5 Aplicar RLS Policies

1. Ainda no SQL Editor, crie uma nova query
2. Copie todo o conteúdo de `supabase/rls-policies.sql`
3. Cole e execute ("Run")

### 2.6 Inserir Dados de Exemplo

1. Nova query no SQL Editor
2. Copie todo o conteúdo de `supabase/seed.sql`
3. Cole e execute

### 2.7 Configurar Storage

1. Vá a **Storage** no menu lateral
2. Clique em "Create a new bucket"
3. Nome: `product-images`
4. Público: **Yes** (para imagens de produtos)
5. Clique em "Create bucket"

6. Repita para criar outro bucket:
   - Nome: `customizations`
   - Público: **No** (para uploads de clientes)

## 💳 Passo 3: Configurar Stripe

### 3.1 Criar Conta Stripe

1. Aceda a [stripe.com](https://stripe.com)
2. Clique em "Start now"
3. Crie uma conta

### 3.2 Ativar Modo de Teste

1. No dashboard, certifique-se que está em **Test mode** (toggle no canto superior direito)

### 3.3 Obter API Keys

1. Vá a **Developers** → **API keys**
2. Copie:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`

3. Cole no `.env.local`

### 3.4 Configurar Webhooks (Opcional para desenvolvimento local)

Por enquanto, pode deixar `STRIPE_WEBHOOK_SECRET` vazio. Configuraremos isto mais tarde quando implementarmos os webhooks.

## 📧 Passo 4: Configurar Email (Resend)

### 4.1 Criar Conta Resend

1. Aceda a [resend.com](https://resend.com)
2. Crie uma conta

### 4.2 Obter API Key

1. No dashboard, vá a **API Keys**
2. Clique em "Create API Key"
3. Nome: `CreativARTs Development`
4. Copie a key → `RESEND_API_KEY`

5. Cole no `.env.local`

### 4.3 Configurar Email From

No `.env.local`, defina:
```
EMAIL_FROM=noreply@yourdomain.com
```

**Nota**: Para desenvolvimento, pode usar qualquer email. Para produção, precisará verificar o domínio.

## 🌐 Passo 5: Configurar Site URL

No `.env.local`:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📊 Passo 6: Google Analytics (Opcional)

Se quiser configurar analytics desde já:

1. Crie uma propriedade GA4 em [analytics.google.com](https://analytics.google.com)
2. Copie o Measurement ID (formato: G-XXXXXXXXXX)
3. Cole em `NEXT_PUBLIC_GA_MEASUREMENT_ID`

Pode deixar vazio por enquanto.

## ✅ Passo 7: Verificar Configuração

O seu `.env.local` deve estar assim:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@yourdomain.com

# Analytics (opcional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

## 🎉 Passo 8: Executar o Projeto

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

Deve ver a homepage da CreativART's!

## 🐛 Resolução de Problemas

### Erro: "Missing Supabase environment variables"

- Verifique se o `.env.local` existe e tem as variáveis corretas
- Reinicie o servidor de desenvolvimento

### Erro ao conectar ao Supabase

- Verifique se as credenciais estão corretas
- Confirme que o projeto Supabase está ativo

### Produtos não aparecem

- Verifique se executou o `seed.sql`
- Confirme que as RLS policies foram aplicadas

## 📚 Próximos Passos

Agora que o projeto está configurado:

1. Explore a homepage
2. Verifique os produtos no Supabase
3. Teste o carrinho de compras
4. Comece a desenvolver novas funcionalidades!

## 🆘 Precisa de Ajuda?

- Consulte o [README.md](README.md) para mais informações
- Verifique a documentação do [Next.js](https://nextjs.org/docs)
- Documentação do [Supabase](https://supabase.com/docs)
- Documentação do [Stripe](https://stripe.com/docs)

