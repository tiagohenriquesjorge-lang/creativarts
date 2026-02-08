# 🚀 Google Analytics 4 - Início Rápido

## ⚡ **CONFIGURAÇÃO EM 3 PASSOS:**

### **1️⃣ Criar Conta GA4 (5 minutos)**

1. Vá para: https://analytics.google.com/
2. Clique em **"Começar a medir"**
3. Crie uma conta e propriedade
4. Copie o **Measurement ID** (formato: `G-XXXXXXXXXX`)

### **2️⃣ Adicionar ao .env.local (30 segundos)**

Abra `.env.local` e substitua:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Por:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-SEU_ID_AQUI
```

### **3️⃣ Reiniciar Servidor (10 segundos)**

```bash
npm run dev
```

---

## ✅ **PRONTO!**

O Google Analytics 4 está agora a funcionar com:

- ✅ Tracking automático de páginas
- ✅ Eventos de e-commerce (view_item, add_to_cart, purchase)
- ✅ Integração com RGPD (Consent Mode)
- ✅ IP anonimizado
- ✅ 100% GRATUITO

---

## 🧪 **TESTAR:**

1. Abra o site: `http://localhost:3000`
2. Aceite os cookies de analytics
3. Navegue pelo site (produtos, carrinho, checkout)
4. Vá para Google Analytics → **Relatórios** → **Tempo real**
5. Veja os eventos em tempo real! 🎉

---

## 📊 **EVENTOS IMPLEMENTADOS:**

| Evento | Onde |
|--------|------|
| **view_item_list** | Página de produtos |
| **view_item** | Detalhes do produto |
| **add_to_cart** | Adicionar ao carrinho |
| **begin_checkout** | Iniciar checkout |
| **purchase** | Compra concluída |

---

## 📚 **DOCUMENTAÇÃO COMPLETA:**

Veja `GOOGLE_ANALYTICS_SETUP.md` para:
- Configurações avançadas
- Criar conversões
- Configurar funis
- Relatórios disponíveis
- Troubleshooting

---

**Tempo total de configuração:** ~6 minutos ⚡  
**Custo:** 100% GRATUITO 💰  
**Dificuldade:** Fácil 😊

