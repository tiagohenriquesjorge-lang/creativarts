# 🚀 Como Fazer Push para o GitHub

## 📋 PASSO A PASSO:

### 1️⃣ Criar um Personal Access Token

1. Vá para: https://github.com/settings/tokens/new
2. **Note:** `CreativArts Deploy`
3. **Expiration:** 90 days
4. **Marque APENAS:** ✅ `repo` (Full control of private repositories)
5. Clique em **"Generate token"**
6. **COPIE O TOKEN** (começa com `ghp_...`)

### 2️⃣ Executar no Terminal

Abra o terminal e execute:

```bash
cd /Users/tje09/Creativarts

# Remover remote antigo
git remote remove origin

# Adicionar remote novo (substitua SEU_TOKEN pelo token que copiou)
git remote add origin https://SEU_TOKEN@github.com/tiagohenriquesjorge-lang/creativarts.git

# Fazer push
git push -u origin main
```

### 3️⃣ Verificar

Depois de fazer push, veja o código em:
https://github.com/tiagohenriquesjorge-lang/creativarts

---

## 🎯 ALTERNATIVA: Usar GitHub Desktop

Se preferir interface gráfica:

1. Baixe: https://desktop.github.com/
2. Instale e faça login com `tiagohenriquesjorge-lang`
3. File → Add Local Repository → Escolha `/Users/tje09/Creativarts`
4. Clique em "Publish repository"

---

## ✅ Depois de fazer push:

O código estará no GitHub e a Vercel pode fazer deploys automáticos!

