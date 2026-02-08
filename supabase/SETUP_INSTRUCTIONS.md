# 🚀 Instruções de Setup do Supabase

## ✅ Credenciais Configuradas!

O arquivo `.env.local` já está configurado com as suas credenciais.

---

## 📝 Próximos Passos

### 1. Executar Scripts SQL (5 minutos)

Acesse o SQL Editor do Supabase:
👉 https://supabase.com/dashboard/project/omyzinorxureifoyzffx/sql/new

#### Passo 1: Schema (Criar Tabelas)

1. Abra o arquivo `supabase/schema.sql`
2. Copie TODO o conteúdo
3. Cole no SQL Editor
4. Clique em **RUN** (ou Ctrl+Enter)
5. Aguarde "Success. No rows returned"

#### Passo 2: RLS Policies (Segurança)

1. Clique em "New query"
2. Abra o arquivo `supabase/rls-policies.sql`
3. Copie TODO o conteúdo
4. Cole no SQL Editor
5. Clique em **RUN**
6. Aguarde "Success"

#### Passo 3: Seed Data (Dados de Exemplo)

1. Clique em "New query"
2. Abra o arquivo `supabase/seed.sql`
3. Copie TODO o conteúdo
4. Cole no SQL Editor
5. Clique em **RUN**
6. Aguarde "Success"

---

### 2. Verificar Tabelas

Acesse o Table Editor:
👉 https://supabase.com/dashboard/project/omyzinorxureifoyzffx/editor

Deve ver:
- ✅ categories (5 categorias)
- ✅ products (5 produtos)
- ✅ product_images
- ✅ product_variants
- ✅ orders
- ✅ order_items
- ✅ coupons
- ✅ user_addresses

---

### 3. Testar o Projeto

```bash
# Instalar dependências (se ainda não fez)
npm install

# Executar
npm run dev
```

Abra: http://localhost:3000

---

## ✅ Checklist

- [x] Credenciais configuradas em `.env.local`
- [ ] Schema executado (tabelas criadas)
- [ ] RLS policies executadas
- [ ] Seed data executado (produtos de exemplo)
- [ ] Projeto rodando localmente
- [ ] Produtos aparecem em /produtos

---

## 🆘 Problemas?

Consulte `TROUBLESHOOTING.md` ou verifique:
- Console do browser (F12)
- Terminal onde o servidor está rodando
- Supabase Dashboard > Logs

---

**Tempo estimado**: 5-10 minutos
**Dificuldade**: Fácil 🟢

