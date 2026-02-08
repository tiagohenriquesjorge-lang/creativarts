# ⚡ CONFIGURAÇÃO RÁPIDA - 3 MINUTOS

## 🎯 **PROBLEMA ATUAL:**

```
❌ Bucket 'product-images': new row violates row-level security policy
```

**Causa:** As policies RLS (Row Level Security) não estão configuradas.  
**Solução:** Executar o script SQL no Supabase (3 minutos).

---

## 🔧 **SOLUÇÃO - PASSO A PASSO:**

### **1. Abrir Supabase Dashboard** (30 seg)

1. Ir para: **https://app.supabase.com**
2. Fazer login
3. Selecionar projeto: **omyzinorxureifoyzffx**

---

### **2. Abrir SQL Editor** (15 seg)

1. No menu lateral esquerdo, clicar em **SQL Editor**
2. Clicar em **New query**

---

### **3. Copiar o Script SQL** (30 seg)

Abrir o arquivo: `supabase/storage-setup.sql`

Ou copiar daqui:

```sql
-- ============================================
-- SUPABASE STORAGE SETUP
-- Configuração de buckets para upload de imagens
-- ============================================

-- 1. Criar bucket para imagens de produtos
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Criar bucket para imagens de categorias
INSERT INTO storage.buckets (id, name, public)
VALUES ('category-images', 'category-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- ============================================
-- STORAGE POLICIES (RLS)
-- Remover policies antigas se existirem
-- ============================================

-- Remover policies antigas de produtos
DROP POLICY IF EXISTS "Public Access to Product Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product images" ON storage.objects;

-- Remover policies antigas de categorias
DROP POLICY IF EXISTS "Public Access to Category Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload category images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update category images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete category images" ON storage.objects;

-- ============================================
-- PRODUCT IMAGES POLICIES
-- ============================================

-- Permitir leitura pública de imagens de produtos
CREATE POLICY "Public Access to Product Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Permitir upload de imagens de produtos (autenticado)
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);

-- Permitir atualização de imagens de produtos (autenticado)
CREATE POLICY "Authenticated users can update product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);

-- Permitir remoção de imagens de produtos (autenticado)
CREATE POLICY "Authenticated users can delete product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);

-- ============================================
-- CATEGORY IMAGES POLICIES
-- ============================================

-- Permitir leitura pública de imagens de categorias
CREATE POLICY "Public Access to Category Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'category-images');

-- Permitir upload de imagens de categorias (autenticado)
CREATE POLICY "Authenticated users can upload category images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'category-images' 
  AND auth.role() = 'authenticated'
);

-- Permitir atualização de imagens de categorias (autenticado)
CREATE POLICY "Authenticated users can update category images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'category-images' 
  AND auth.role() = 'authenticated'
);

-- Permitir remoção de imagens de categorias (autenticado)
CREATE POLICY "Authenticated users can delete category images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'category-images' 
  AND auth.role() = 'authenticated'
);
```

---

### **4. Executar o Script** (15 seg)

1. Colar o SQL no editor
2. Clicar em **RUN** (ou pressionar Ctrl+Enter)
3. Aguardar mensagem de sucesso

**Resultado esperado:**
```
Success. No rows returned
```

---

### **5. Verificar Configuração** (30 seg)

1. No menu lateral, clicar em **Storage**
2. Verificar se aparecem 2 buckets:
   - ✅ `product-images`
   - ✅ `category-images`
3. Clicar em cada bucket
4. Verificar se estão **públicos** (ícone de globo)

---

### **6. Testar Upload** (30 seg)

Voltar ao terminal e executar:

```bash
node scripts/test-upload.js
```

**Resultado esperado:**
```
✅ TODOS OS TESTES PASSARAM!
   O sistema de upload está funcionando corretamente! 🚀
```

---

## ✅ **PRONTO!**

Se todos os testes passaram, o sistema de upload está 100% funcional!

Agora pode:
- ✅ Fazer upload de imagens no backoffice
- ✅ Criar produtos com múltiplas imagens
- ✅ Criar categorias com imagens
- ✅ Ver imagens no site público

---

## 🆘 **SE ALGO FALHAR:**

### **Erro: "Policy already exists"**
- Normal! Significa que já estava configurado
- Ignore e continue

### **Erro: "Permission denied"**
- Verifique se está logado no Supabase
- Verifique se selecionou o projeto correto

### **Teste ainda falha após executar SQL:**
- Aguarde 10 segundos (cache do Supabase)
- Execute o teste novamente
- Verifique se as policies foram criadas:
  ```sql
  SELECT * FROM pg_policies 
  WHERE tablename = 'objects' 
  AND schemaname = 'storage';
  ```

---

**Tempo total:** ~3 minutos ⏱️  
**Dificuldade:** Fácil ⭐  
**Resultado:** Upload funcionando! 🚀

