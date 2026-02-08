# 📸 Configuração do Supabase Storage

## 🎯 Objetivo

Configurar buckets de storage no Supabase para permitir upload de imagens de produtos e categorias no backoffice.

---

## ⏱️ Tempo Estimado: 3 minutos

---

## 📋 Passo a Passo

### **PASSO 1: Aceder ao Supabase Dashboard**

1. Vá para: https://app.supabase.com
2. Faça login
3. Selecione o projeto **creativarts-store** (ou o nome que deu)

---

### **PASSO 2: Executar Script SQL**

1. No menu lateral, clique em **SQL Editor**
2. Clique em **"New query"**
3. Abra o arquivo `supabase/storage-setup.sql` deste projeto
4. **Copie TODO o conteúdo** do arquivo
5. **Cole** no SQL Editor
6. Clique em **RUN** (ou pressione `Ctrl+Enter`)
7. Aguarde a mensagem **"Success. No rows returned"**

---

### **PASSO 3: Verificar Buckets Criados**

1. No menu lateral, clique em **Storage**
2. Deve ver 2 buckets criados:
   - ✅ `product-images` (público)
   - ✅ `category-images` (público)

---

### **PASSO 4: Verificar Policies (Opcional)**

1. Clique em cada bucket
2. Vá para a aba **"Policies"**
3. Deve ver 4 policies em cada bucket:
   - ✅ Public Access (SELECT)
   - ✅ Authenticated Upload (INSERT)
   - ✅ Authenticated Update (UPDATE)
   - ✅ Authenticated Delete (DELETE)

---

## ✅ Verificação Final

### **Testar Upload:**

1. Faça login no backoffice: `https://creativarts.vercel.app/admin/login`
2. Vá para **Categorias** > **Nova Categoria**
3. Arraste uma imagem para a área de upload
4. Se aparecer o preview = **SUCESSO!** 🎉

---

## 🔧 O Que Foi Configurado

### **Buckets Criados:**

| Bucket | Público | Uso |
|--------|---------|-----|
| `product-images` | ✅ Sim | Imagens de produtos |
| `category-images` | ✅ Sim | Imagens de categorias |

### **Políticas de Segurança (RLS):**

- ✅ **Leitura pública**: Qualquer pessoa pode ver as imagens
- ✅ **Upload autenticado**: Apenas admins logados podem fazer upload
- ✅ **Atualização autenticada**: Apenas admins logados podem atualizar
- ✅ **Remoção autenticada**: Apenas admins logados podem apagar

---

## 📊 Limites do Tier Gratuito

### **Supabase Storage FREE:**

- ✅ **1 GB de armazenamento** (grátis)
- ✅ **2 GB de transferência/mês** (grátis)
- ✅ **Uploads ilimitados**
- ✅ **Imagens públicas**

### **É Suficiente?**

Para uma loja pequena/média:
- ✅ 1 GB = ~1,000-2,000 imagens (500KB cada)
- ✅ 2 GB transferência = ~4,000 visualizações/mês

**Conclusão**: Mais que suficiente para começar! 🚀

---

## 🎨 Formatos Suportados

- ✅ **JPG/JPEG** (recomendado para fotos)
- ✅ **PNG** (recomendado para logos/transparência)
- ✅ **WebP** (melhor compressão, moderno)

**Tamanho máximo por arquivo**: 5 MB

---

## 🔐 Segurança

### **✅ Configurado:**

- ✅ Buckets públicos (imagens acessíveis por URL)
- ✅ Upload apenas para usuários autenticados
- ✅ Validação de tipo de arquivo (client-side)
- ✅ Validação de tamanho (client-side)

### **⚠️ Importante:**

- As imagens são **públicas** (qualquer pessoa com a URL pode ver)
- Apenas **admins logados** podem fazer upload/apagar
- URLs são **permanentes** (não mudam)

---

## 🆘 Problemas Comuns

### **"Failed to upload"**
- Verifique se executou o script SQL
- Verifique se os buckets foram criados
- Verifique se está logado como admin

### **"Policy violation"**
- Execute o script `storage-setup.sql` novamente
- Verifique se as policies foram criadas

### **"File too large"**
- Máximo: 5 MB por arquivo
- Comprima a imagem antes de fazer upload

### **Imagem não aparece**
- Verifique se o bucket é público
- Verifique a URL no browser
- Limpe o cache do browser

---

## 📚 Recursos

- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Storage Dashboard](https://app.supabase.com/project/_/storage/buckets)
- [Storage Policies](https://supabase.com/docs/guides/storage/security/access-control)

---

## 🎉 Próximos Passos

Após configurar o storage:

1. ✅ Testar upload de imagem em categoria
2. ✅ Testar upload de imagem em produto
3. ✅ Adicionar imagens reais aos produtos
4. 🚀 Continuar desenvolvimento

---

**Tempo total**: ~3 minutos  
**Custo**: 0€  
**Dificuldade**: Muito Fácil 🟢

Boa sorte! 🚀

