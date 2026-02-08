# 🧪 Scripts de Teste - Sistema de Upload

Este diretório contém scripts para testar o sistema de upload de imagens.

---

## 📋 **SCRIPTS DISPONÍVEIS**

### **1. `test-upload.js` - Teste Automatizado (Node.js)**

Script Node.js que testa automaticamente toda a configuração do Supabase Storage.

**O que testa:**
- ✅ Conexão com Supabase
- ✅ Buckets criados (`product-images`, `category-images`)
- ✅ Upload de imagem de teste
- ✅ Geração de URL pública
- ✅ Listagem de arquivos
- ✅ Remoção de imagem

**Como usar:**

```bash
# Executar o teste
node scripts/test-upload.js
```

**Resultado esperado:**

```
🧪 TESTE DO SISTEMA DE UPLOAD
==================================================
✅ Variáveis de ambiente carregadas
   URL: https://omyzinorxureifoyzffx.supabase.co
   Key: eyJhbGciOiJIUzI1NiI...

📦 TESTE 1: Listar Buckets
--------------------------------------------------
✅ Total de buckets: 2
✅ Bucket 'product-images' encontrado (público: true)
✅ Bucket 'category-images' encontrado (público: true)

📤 TESTE 2: Upload de Imagem de Teste
--------------------------------------------------
   Fazendo upload: tests/test-1234567890.png
✅ Upload bem-sucedido!
   Path: tests/test-1234567890.png

🔗 TESTE 3: Obter URL Pública
--------------------------------------------------
✅ URL pública gerada:
   https://omyzinorxureifoyzffx.supabase.co/storage/v1/object/public/product-images/tests/test-1234567890.png

📋 TESTE 4: Listar Arquivos no Bucket
--------------------------------------------------
✅ Arquivos encontrados: 1
   - test-1234567890.png (68 bytes)

🗑️  TESTE 5: Remover Imagem de Teste
--------------------------------------------------
✅ Imagem removida com sucesso!

==================================================
✅ TODOS OS TESTES PASSARAM!
   O sistema de upload está funcionando corretamente! 🚀
==================================================
```

**Se falhar:**
- Verifique se `.env.local` existe e contém as variáveis corretas
- Execute `supabase/storage-setup.sql` no Supabase
- Verifique os erros específicos no output

---

## 📄 **OUTROS ARQUIVOS DE TESTE**

### **2. `../supabase/test-storage.sql` - Teste SQL**

Script SQL para verificar a configuração diretamente no Supabase.

**Como usar:**

1. Ir para: https://app.supabase.com
2. Selecionar projeto
3. **SQL Editor** > **New query**
4. Copiar conteúdo de `supabase/test-storage.sql`
5. Executar (RUN)

**O que verifica:**
- ✅ Buckets criados
- ✅ Policies de leitura pública
- ✅ Policies de upload (INSERT)
- ✅ Policies de atualização (UPDATE)
- ✅ Policies de remoção (DELETE)
- ✅ Imagens já enviadas (se houver)

**Resultado esperado:**
- 2 buckets criados
- 8 policies criadas (4 por bucket)
- Buckets públicos

---

### **3. `../public/test-upload.html` - Teste no Browser**

Página HTML interativa para testar o upload diretamente no browser.

**Como usar:**

**Opção A: Localmente**
```bash
npm run dev
```
Depois ir para: http://localhost:3000/test-upload.html

**Opção B: Em Produção**
Ir para: https://creativarts.vercel.app/test-upload.html

**O que testa:**
- ✅ Verificar buckets
- ✅ Upload de imagem de teste
- ✅ URL pública acessível
- ✅ Remover imagem

**Interface:**
- 4 testes sequenciais
- Botões clicáveis
- Resultados em tempo real
- Feedback visual (✅/❌)

---

## 🎯 **QUANDO USAR CADA TESTE**

### **Use `test-upload.js` quando:**
- Quiser teste rápido e automatizado
- Estiver configurando pela primeira vez
- Precisar de output detalhado no terminal
- Quiser integrar em CI/CD

### **Use `test-storage.sql` quando:**
- Quiser verificar configuração do banco
- Precisar ver detalhes das policies
- Quiser contar imagens no storage
- Estiver debugando problemas de permissão

### **Use `test-upload.html` quando:**
- Quiser testar no browser
- Precisar demonstrar para alguém
- Quiser interface visual
- Estiver testando CORS

---

## 🐛 **TROUBLESHOOTING**

### **Erro: "Variáveis de ambiente não encontradas"**

**Solução:**
```bash
# Verificar se .env.local existe
ls -la .env.local

# Verificar conteúdo
cat .env.local
```

Deve conter:
```
NEXT_PUBLIC_SUPABASE_URL=https://omyzinorxureifoyzffx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiI...
```

---

### **Erro: "Bucket não encontrado"**

**Solução:**
1. Executar `supabase/storage-setup.sql` no Supabase
2. Verificar em Storage se buckets foram criados
3. Executar `supabase/test-storage.sql` para confirmar

---

### **Erro: "Policy violation" ou "Permission denied"**

**Solução:**
1. Executar `supabase/storage-setup.sql` novamente
2. Verificar se policies foram criadas:
   ```sql
   SELECT * FROM pg_policies 
   WHERE tablename = 'objects' 
   AND schemaname = 'storage';
   ```
3. Verificar se usuário está autenticado (para upload/delete)

---

### **Erro: "CORS blocked"**

**Solução:**
1. Verificar se bucket é público
2. Adicionar domínio em Supabase > Settings > API > CORS
3. Testar com `curl` primeiro:
   ```bash
   curl -I https://omyzinorxureifoyzffx.supabase.co/storage/v1/object/public/product-images/tests/test.png
   ```

---

## ✅ **CHECKLIST DE TESTES**

Antes de considerar o sistema pronto:

- [ ] `test-upload.js` passa todos os testes
- [ ] `test-storage.sql` retorna 2 buckets e 8 policies
- [ ] `test-upload.html` passa todos os 4 testes
- [ ] Upload manual no backoffice funciona
- [ ] Imagens aparecem no site público
- [ ] Edição e remoção funcionam

---

**Boa sorte com os testes!** 🧪✨

