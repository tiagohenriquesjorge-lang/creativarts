# 🚀 Configuração Supabase (100% Gratuito)

## 📋 Passo a Passo

### 1. Criar Conta (2 minutos)

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub (recomendado) ou email
4. **100% GRATUITO** - Não precisa de cartão de crédito!

---

### 2. Criar Projeto (3 minutos)

1. Clique em "New Project"
2. Preencha:
   - **Name**: `creativarts-store` (ou outro nome)
   - **Database Password**: Crie uma senha forte (guarde-a!)
   - **Region**: Escolha a mais próxima (ex: `Europe West (London)`)
   - **Pricing Plan**: **FREE** (já selecionado)

3. Clique em "Create new project"
4. Aguarde 1-2 minutos (criação do projeto)

---

### 3. Copiar Credenciais (1 minuto)

1. No menu lateral, clique em **Settings** (⚙️)
2. Clique em **API**
3. Copie as seguintes informações:

#### Project URL
```
https://xxxxxxxxxxxxx.supabase.co
```

#### API Keys
- **anon/public key** (começa com `eyJhbGc...`)
- **service_role key** (começa com `eyJhbGc...`) - ⚠️ SECRETA!

4. Cole no seu `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 4. Executar Scripts SQL (5 minutos)

#### 4.1. Abrir SQL Editor

1. No menu lateral, clique em **SQL Editor**
2. Clique em "New query"

#### 4.2. Executar Schema

1. Abra o arquivo `supabase/schema.sql` do projeto
2. Copie TODO o conteúdo
3. Cole no SQL Editor
4. Clique em **RUN** (ou pressione Ctrl+Enter)
5. Aguarde a mensagem "Success"

#### 4.3. Executar RLS Policies

1. Clique em "New query" novamente
2. Abra o arquivo `supabase/rls-policies.sql`
3. Copie TODO o conteúdo
4. Cole no SQL Editor
5. Clique em **RUN**
6. Aguarde "Success"

#### 4.4. Executar Seed Data

1. Clique em "New query" novamente
2. Abra o arquivo `supabase/seed.sql`
3. Copie TODO o conteúdo
4. Cole no SQL Editor
5. Clique em **RUN**
6. Aguarde "Success"

---

### 5. Verificar Tabelas (1 minuto)

1. No menu lateral, clique em **Table Editor**
2. Deve ver as seguintes tabelas:
   - ✅ categories
   - ✅ products
   - ✅ product_images
   - ✅ product_variants
   - ✅ orders
   - ✅ order_items
   - ✅ coupons
   - ✅ user_addresses

3. Clique em `products` - deve ver 5 produtos de exemplo

---

### 6. Configurar Storage (Opcional - 2 minutos)

Para upload de imagens:

1. No menu lateral, clique em **Storage**
2. Clique em "Create a new bucket"
3. Nome: `product-images`
4. **Public bucket**: ✅ (marcar)
5. Clique em "Create bucket"

Repita para:
- `customization-images` (público)
- `category-images` (público)

---

## ✅ Verificação Final

### Testar Conexão

1. No seu projeto Next.js, execute:

```bash
npm run dev
```

2. Abra http://localhost:3000/produtos

3. Se ver produtos listados = **SUCESSO!** 🎉

### Se não funcionar:

1. Verifique `.env.local` (credenciais corretas?)
2. Reinicie o servidor (`Ctrl+C` e `npm run dev`)
3. Verifique o console do browser (F12) para erros
4. Consulte `TROUBLESHOOTING.md`

---

## 📊 Limites do Tier Gratuito

### O que está incluído (GRÁTIS):

- ✅ **Database**: 500 MB
- ✅ **Storage**: 1 GB
- ✅ **Bandwidth**: 2 GB/mês
- ✅ **Monthly Active Users**: 50,000
- ✅ **Edge Functions**: 500,000 invocations/mês
- ✅ **Realtime**: Unlimited connections

### É suficiente?

Para uma loja pequena/média:
- ✅ 500 MB = ~5,000-10,000 produtos
- ✅ 1 GB storage = ~1,000-2,000 imagens
- ✅ 50K users/mês = Excelente para começar!

**Conclusão**: Mais que suficiente para começar! 🚀

---

## 🔐 Segurança

### ⚠️ IMPORTANTE:

1. **NUNCA** commite `.env.local` no Git
2. **NUNCA** partilhe a `service_role key` publicamente
3. Use a `anon key` apenas no frontend
4. RLS policies protegem os dados

### Verificar RLS:

1. No Supabase, vá a **Authentication** > **Policies**
2. Todas as tabelas devem ter policies ativas
3. Se não tiverem, execute `rls-policies.sql` novamente

---

## 🆘 Problemas Comuns

### "Failed to fetch"
- Verifique se o URL está correto
- Verifique se o projeto está ativo (não pausado)

### "Row level security policy violation"
- Execute `rls-policies.sql`
- Ou desative RLS temporariamente (apenas dev!)

### "Invalid API key"
- Copie novamente as keys do Supabase
- Verifique se não há espaços extras

### Projeto pausado
- Tier gratuito pausa após 1 semana de inatividade
- Basta clicar em "Resume" no dashboard

---

## 📚 Recursos

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Dashboard](https://app.supabase.com)
- [SQL Editor](https://app.supabase.com/project/_/sql)
- [Table Editor](https://app.supabase.com/project/_/editor)

---

## 🎉 Próximos Passos

Após configurar o Supabase:

1. ✅ Testar a listagem de produtos
2. ✅ Adicionar produtos ao carrinho
3. ✅ Testar filtros na PLP
4. 📝 Adicionar seus próprios produtos
5. 🎨 Fazer upload de imagens reais
6. 🚀 Continuar desenvolvimento

---

**Tempo total**: ~15 minutos  
**Custo**: 0€  
**Dificuldade**: Fácil 🟢

Boa sorte! 🚀

