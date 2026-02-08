# 📸 Guia de Upload de Imagens - Backoffice

## 🎯 Como Usar o Sistema de Upload

---

## 📦 **PRODUTOS (Múltiplas Imagens)**

### **Criar Novo Produto:**

1. Vá para **Admin** > **Produtos** > **Novo Produto**
2. Preencha os dados do produto (nome, descrição, preço, etc.)
3. Na seção **"Imagens do Produto"**:
   - Clique na área de upload OU
   - Arraste múltiplas imagens de uma vez
4. As imagens aparecem em grid
5. A **primeira imagem** é automaticamente a **principal**
6. Para mudar a imagem principal:
   - Passe o mouse sobre outra imagem
   - Clique no ícone de **estrela ⭐**
7. Para remover uma imagem:
   - Passe o mouse sobre a imagem
   - Clique no **X vermelho**
8. Clique em **"Criar Produto"**

**Limites:**
- Máximo: **5 imagens por produto**
- Formatos: JPG, PNG, WebP
- Tamanho: Máximo 5MB por imagem

---

### **Editar Produto Existente:**

1. Vá para **Admin** > **Produtos**
2. Clique no ícone **✏️ Editar** no produto
3. As imagens existentes aparecem no grid
4. Pode:
   - Adicionar novas imagens (até o limite de 5)
   - Remover imagens existentes
   - Mudar a imagem principal
5. Clique em **"Guardar Alterações"**

**Nota:** Imagens removidas são apagadas do storage automaticamente.

---

## 📁 **CATEGORIAS (1 Imagem)**

### **Criar Nova Categoria:**

1. Vá para **Admin** > **Categorias** > **Nova Categoria**
2. Preencha os dados da categoria
3. Na seção **"Imagem da Categoria"**:
   - Clique na área de upload OU
   - Arraste uma imagem
4. Preview aparece instantaneamente
5. Para trocar a imagem:
   - Passe o mouse sobre o preview
   - Clique no **X vermelho** para remover
   - Faça upload de nova imagem
6. Clique em **"Criar Categoria"**

**Limites:**
- Máximo: **1 imagem por categoria**
- Formatos: JPG, PNG, WebP
- Tamanho: Máximo 5MB

---

### **Editar Categoria Existente:**

1. Vá para **Admin** > **Categorias**
2. Clique no ícone **✏️ Editar** na categoria
3. A imagem existente aparece no preview
4. Pode:
   - Manter a imagem atual
   - Remover e fazer upload de nova
5. Clique em **"Guardar Alterações"**

---

## 💡 **DICAS E BOAS PRÁTICAS**

### **Tamanho Recomendado:**
- **Produtos**: 800x800px ou superior (quadrado)
- **Categorias**: 800x800px ou superior (quadrado)
- **Formato**: JPG para fotos, PNG para logos/transparência

### **Otimização:**
- Comprima as imagens antes de fazer upload
- Use ferramentas como TinyPNG ou Squoosh
- Imagens menores = site mais rápido

### **Ordem das Imagens (Produtos):**
1. **Imagem Principal**: Foto do produto de frente
2. **Imagem 2**: Foto de lado ou detalhe
3. **Imagem 3**: Foto de trás ou em uso
4. **Imagem 4-5**: Detalhes, embalagem, etc.

### **Nomes de Arquivo:**
- Use nomes descritivos: `caneca-azul-frente.jpg`
- Evite caracteres especiais: `ç`, `ã`, espaços
- O sistema gera nomes únicos automaticamente

---

## ⚠️ **ERROS COMUNS**

### **"Formato inválido"**
- Só são aceites: JPG, PNG, WebP
- Converta a imagem para um formato válido

### **"Arquivo muito grande"**
- Máximo: 5MB por imagem
- Comprima a imagem antes de fazer upload

### **"Máximo de 5 imagens permitidas"**
- Remova uma imagem antes de adicionar nova
- Ou edite o produto e reorganize

### **Imagem não aparece no site**
- Verifique se executou o script `storage-setup.sql`
- Verifique se os buckets são públicos
- Limpe o cache do browser (Ctrl+F5)

---

## 🔧 **CONFIGURAÇÃO INICIAL (APENAS 1 VEZ)**

Antes de usar o upload pela primeira vez:

1. Vá para: https://app.supabase.com
2. Selecione o projeto
3. SQL Editor > New query
4. Copie o conteúdo de `supabase/storage-setup.sql`
5. Cole e execute (RUN)
6. Verifique buckets em Storage

**Documentação completa:** Ver `STORAGE_SETUP.md`

---

## 📊 **LIMITES DO TIER GRATUITO**

- ✅ **1 GB de armazenamento** (grátis)
- ✅ **2 GB de transferência/mês** (grátis)
- ✅ **~1,000-2,000 imagens** (500KB cada)

**Suficiente para começar!** 🚀

---

## 🆘 **PRECISA DE AJUDA?**

- Consulte `STORAGE_SETUP.md` para configuração
- Consulte `TROUBLESHOOTING.md` para problemas
- Verifique os logs do browser (F12 > Console)

---

**Boa sorte com os uploads!** 📸✨

