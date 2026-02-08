# 🧪 GUIA DE TESTES - Sistema de Upload

## 📋 **CHECKLIST DE TESTES**

Use este guia para testar completamente o sistema de upload de imagens.

---

## 🔧 **PRÉ-REQUISITOS**

Antes de começar os testes:

- [ ] Deploy concluído na Vercel
- [ ] Script `storage-setup.sql` executado no Supabase
- [ ] Buckets criados (`product-images`, `category-images`)
- [ ] Acesso ao backoffice (admin@creativarts.pt ou tiago@creativarts.pt)

---

## 🧪 **TESTE 1: Verificar Configuração do Supabase**

### **Opção A: Via SQL (Recomendado)**

1. Ir para: https://app.supabase.com
2. Selecionar projeto
3. **SQL Editor** > **New query**
4. Copiar conteúdo de `supabase/test-storage.sql`
5. Executar (RUN)
6. Verificar resultados:
   - ✅ 2 buckets criados
   - ✅ 8 policies criadas
   - ✅ Buckets públicos

### **Opção B: Via Script Node.js**

```bash
node scripts/test-upload.js
```

**Resultado esperado:**
```
✅ Variáveis de ambiente carregadas
✅ Bucket 'product-images' encontrado
✅ Bucket 'category-images' encontrado
✅ Upload bem-sucedido!
✅ URL pública gerada
✅ Imagem removida com sucesso!
✅ TODOS OS TESTES PASSARAM!
```

---

## 🖼️ **TESTE 2: Upload em Categorias**

### **2.1 Criar Nova Categoria com Imagem**

1. Ir para: https://creativarts.vercel.app/admin/login
2. Login com: `admin@creativarts.pt` ou `tiago@creativarts.pt`
3. Menu lateral > **Categorias**
4. Clicar em **Nova Categoria**
5. Preencher:
   - Nome: `Teste Upload`
   - Slug: `teste-upload` (auto-gerado)
   - Descrição: `Categoria de teste`
6. **Upload de Imagem:**
   - Clicar na área de upload OU arrastar imagem
   - Usar imagem JPG/PNG (max 5MB)
   - Verificar preview aparece
7. Clicar em **Criar Categoria**

**✅ Resultado esperado:**
- Mensagem de sucesso
- Redirecionado para lista de categorias
- Categoria aparece na lista

### **2.2 Verificar Imagem no Storage**

1. Ir para: https://app.supabase.com
2. **Storage** > **category-images**
3. Pasta `categories/`
4. Verificar arquivo existe (nome: `timestamp-random.extensão`)

### **2.3 Editar Categoria e Trocar Imagem**

1. Voltar para lista de categorias
2. Clicar em **✏️ Editar** na categoria de teste
3. Verificar imagem atual aparece no preview
4. Clicar no **X vermelho** para remover
5. Fazer upload de nova imagem
6. Clicar em **Guardar Alterações**

**✅ Resultado esperado:**
- Imagem antiga removida do storage
- Nova imagem salva
- Preview atualizado

### **2.4 Remover Categoria**

1. Voltar para lista de categorias
2. Clicar em **🗑️ Apagar** na categoria de teste
3. Confirmar remoção

**✅ Resultado esperado:**
- Categoria removida
- Imagem permanece no storage (comportamento atual)

---

## 📦 **TESTE 3: Upload em Produtos (Múltiplas Imagens)**

### **3.1 Criar Novo Produto com Múltiplas Imagens**

1. Menu lateral > **Produtos**
2. Clicar em **Novo Produto**
3. Preencher:
   - Nome: `Produto Teste Upload`
   - Descrição: `Teste de múltiplas imagens`
   - Preço: `29.99`
   - Categoria: Selecionar qualquer
4. **Upload de Imagens:**
   - Arrastar 3 imagens de uma vez OU
   - Clicar e selecionar múltiplas
   - Verificar grid mostra todas as imagens
   - Verificar primeira tem badge "Principal"
   - Verificar contador mostra "3/5"
5. Clicar em **Criar Produto**

**✅ Resultado esperado:**
- Produto criado
- 3 imagens salvas na tabela `product_images`
- Primeira imagem marcada como `is_primary = true`

### **3.2 Verificar Imagens no Storage**

1. Ir para: https://app.supabase.com
2. **Storage** > **product-images**
3. Pasta `products/`
4. Verificar 3 arquivos existem

### **3.3 Editar Produto - Adicionar Mais Imagens**

1. Voltar para lista de produtos
2. Clicar em **✏️ Editar** no produto de teste
3. Verificar 3 imagens aparecem no grid
4. Adicionar mais 2 imagens (total 5)
5. Verificar contador mostra "5/5"
6. Tentar adicionar 6ª imagem
7. Clicar em **Guardar Alterações**

**✅ Resultado esperado:**
- Não permite adicionar 6ª imagem
- 5 imagens salvas
- Todas aparecem no grid

### **3.4 Editar Produto - Mudar Imagem Principal**

1. Editar o mesmo produto
2. Passar mouse sobre a 3ª imagem
3. Clicar no ícone de **estrela ⭐**
4. Verificar badge "Principal" move para 3ª imagem
5. Clicar em **Guardar Alterações**

**✅ Resultado esperado:**
- 3ª imagem agora é `is_primary = true`
- Outras são `is_primary = false`

### **3.5 Editar Produto - Remover Imagens**

1. Editar o mesmo produto
2. Passar mouse sobre 2ª imagem
3. Clicar no **X vermelho**
4. Verificar imagem desaparece do grid
5. Contador atualiza para "4/5"
6. Clicar em **Guardar Alterações**

**✅ Resultado esperado:**
- Imagem removida do storage
- Registro removido da tabela `product_images`
- Apenas 4 imagens permanecem

### **3.6 Verificar Produto no Site Público**

1. Ir para: https://creativarts.vercel.app/produtos
2. Encontrar o produto de teste
3. Verificar imagem principal aparece no card
4. Clicar no produto
5. Verificar todas as imagens aparecem na galeria
6. Verificar imagem principal é a correta

**✅ Resultado esperado:**
- Imagens carregam corretamente
- Galeria funciona
- Imagem principal destacada

---

## 🐛 **TESTE 4: Validações e Erros**

### **4.1 Testar Formato Inválido**

1. Criar novo produto
2. Tentar fazer upload de arquivo `.txt` ou `.pdf`

**✅ Resultado esperado:**
- Mensagem de erro: "Formato inválido"
- Upload bloqueado

### **4.2 Testar Arquivo Muito Grande**

1. Criar novo produto
2. Tentar fazer upload de imagem > 5MB

**✅ Resultado esperado:**
- Mensagem de erro: "Arquivo muito grande"
- Upload bloqueado

### **4.3 Testar Limite de 5 Imagens**

1. Criar produto com 5 imagens
2. Tentar adicionar 6ª imagem

**✅ Resultado esperado:**
- Botão de upload desabilitado
- Mensagem: "Máximo de 5 imagens"

---

## 📊 **TESTE 5: Performance e UX**

### **5.1 Drag and Drop**

- [ ] Arrastar 1 imagem funciona
- [ ] Arrastar múltiplas imagens funciona
- [ ] Feedback visual durante drag (borda destacada)

### **5.2 Loading States**

- [ ] Spinner aparece durante upload
- [ ] Botão desabilitado durante upload
- [ ] Mensagem de progresso clara

### **5.3 Preview**

- [ ] Preview aparece instantaneamente
- [ ] Preview mantém proporção da imagem
- [ ] Preview responsivo (mobile/desktop)

### **5.4 Responsividade**

- [ ] Grid de imagens adapta em mobile
- [ ] Botões acessíveis em touch
- [ ] Upload funciona em mobile

---

## ✅ **CHECKLIST FINAL**

Após todos os testes:

- [ ] Categorias: Upload funciona
- [ ] Categorias: Edição funciona
- [ ] Produtos: Upload múltiplo funciona
- [ ] Produtos: Definir principal funciona
- [ ] Produtos: Remover imagens funciona
- [ ] Produtos: Edição funciona
- [ ] Validações funcionam (formato, tamanho, limite)
- [ ] Imagens aparecem no site público
- [ ] Storage do Supabase atualiza corretamente
- [ ] Sem erros no console do browser (F12)

---

## 🆘 **TROUBLESHOOTING**

### **Upload falha silenciosamente:**
- Verificar console do browser (F12)
- Verificar se buckets foram criados
- Verificar se policies estão ativas

### **Imagem não aparece no site:**
- Verificar se bucket é público
- Verificar URL da imagem (deve começar com supabase.co)
- Limpar cache do browser (Ctrl+F5)

### **Erro "Policy violation":**
- Executar `storage-setup.sql` novamente
- Verificar se usuário está autenticado

---

**Boa sorte com os testes!** 🧪✨

