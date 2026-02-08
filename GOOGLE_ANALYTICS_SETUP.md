# 📊 Google Analytics 4 (GA4) - Guia de Configuração

## ✅ **O QUE FOI IMPLEMENTADO:**

### **1. Configuração Completa do GA4:**
- ✅ Script do Google Analytics integrado
- ✅ Consent Mode v2 (RGPD compliant)
- ✅ Tracking automático de page views
- ✅ Integração com ConsentBanner

### **2. Eventos de E-commerce Implementados:**

| Evento | Quando é Disparado | Dados Enviados |
|--------|-------------------|----------------|
| **view_item_list** | Página de produtos carrega | Lista de produtos, categoria |
| **view_item** | Página de detalhes do produto | Produto, preço, categoria |
| **add_to_cart** | Adicionar ao carrinho | Produto, variante, quantidade, personalização |
| **remove_from_cart** | Remover do carrinho | Produto, quantidade |
| **begin_checkout** | Iniciar checkout | Itens do carrinho, total |
| **purchase** | Compra concluída | ID do pedido, itens, total, cupão |

### **3. Integração com RGPD:**
- ✅ GA4 só carrega se o utilizador aceitar cookies de analytics
- ✅ Consent Mode v2 implementado
- ✅ IP anonimizado automaticamente
- ✅ Cookies SameSite=None;Secure

---

## 🚀 **COMO CONFIGURAR:**

### **Passo 1: Criar Conta Google Analytics**

1. Vá para: https://analytics.google.com/
2. Clique em **"Começar a medir"** (ou "Start measuring")
3. Crie uma **Conta** (nome: "CreativART's")
4. Crie uma **Propriedade** (nome: "CreativART's Website")
5. Selecione **"Web"** como plataforma
6. Insira o URL: `https://seu-dominio.com` (ou `http://localhost:3000` para teste)

### **Passo 2: Obter o Measurement ID**

1. Após criar a propriedade, você verá um **Measurement ID** no formato: `G-XXXXXXXXXX`
2. Copie este ID

### **Passo 3: Adicionar ao .env.local**

Abra o arquivo `.env.local` e substitua:

```env
# Google Analytics (OPCIONAL)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Por:

```env
# Google Analytics (CONFIGURADO!)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-SEU_ID_AQUI
```

### **Passo 4: Reiniciar o Servidor**

```bash
# Parar o servidor (Ctrl+C)
# Reiniciar
npm run dev
```

---

## 🧪 **COMO TESTAR:**

### **1. Verificar se GA4 está carregando:**

1. Abra o site: `http://localhost:3000`
2. Abra DevTools (F12)
3. Vá para a aba **Console**
4. Aceite os cookies de analytics no banner
5. Você deve ver: `✅ Google Analytics initialized: G-XXXXXXXXXX`

### **2. Testar Eventos em Tempo Real:**

1. Vá para Google Analytics: https://analytics.google.com/
2. Navegue para: **Relatórios** → **Tempo real**
3. Faça ações no site:
   - Visite `/produtos` → Deve aparecer **view_item_list**
   - Clique num produto → Deve aparecer **view_item**
   - Adicione ao carrinho → Deve aparecer **add_to_cart**
   - Vá para checkout → Deve aparecer **begin_checkout**
   - Complete a compra → Deve aparecer **purchase**

### **3. Usar Google Tag Assistant:**

1. Instale a extensão: [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Abra o site
3. Clique no ícone da extensão
4. Clique em **"Enable"** e recarregue a página
5. Você verá todos os eventos sendo disparados

---

## 📈 **EVENTOS PERSONALIZADOS DISPONÍVEIS:**

### **Funções Disponíveis em `lib/analytics/gtag.ts`:**

```typescript
import * as gtag from '@/lib/analytics/gtag'

// Page view
gtag.pageview('/produtos')

// View item list
gtag.viewItemList(products, 'Product Listing')

// View item
gtag.viewItem(product)

// Add to cart
gtag.addToCart(product, variant, quantity, customization)

// Remove from cart
gtag.removeFromCart(product, quantity)

// Begin checkout
gtag.beginCheckout(items, total)

// Purchase
gtag.purchase(orderId, items, total, coupon)

// Custom event
gtag.event({
  action: 'custom_event',
  category: 'engagement',
  label: 'button_click',
  value: 1
})
```

---

## 🎯 **RELATÓRIOS DISPONÍVEIS:**

Após alguns dias de dados, você terá acesso a:

### **1. Relatórios de E-commerce:**
- Receita total
- Transações
- Valor médio do pedido
- Taxa de conversão
- Produtos mais vendidos
- Produtos mais visualizados

### **2. Relatórios de Comportamento:**
- Páginas mais visitadas
- Tempo médio na página
- Taxa de rejeição
- Fluxo de navegação

### **3. Relatórios de Aquisição:**
- Fontes de tráfego
- Campanhas
- Redes sociais
- Pesquisa orgânica

---

## ⚙️ **CONFIGURAÇÕES RECOMENDADAS:**

### **1. Ativar E-commerce Avançado:**

1. Vá para: **Admin** → **Configurações de dados** → **E-commerce**
2. Ative **"Ativar relatórios de e-commerce avançado"**

### **2. Criar Conversões:**

1. Vá para: **Admin** → **Eventos**
2. Marque **"purchase"** como conversão
3. Marque **"add_to_cart"** como conversão (opcional)

### **3. Configurar Funis:**

1. Vá para: **Explorar** → **Análise de funil**
2. Crie um funil:
   - Passo 1: view_item
   - Passo 2: add_to_cart
   - Passo 3: begin_checkout
   - Passo 4: purchase

---

## 🔒 **PRIVACIDADE E RGPD:**

✅ **Totalmente Conforme:**
- IP anonimizado automaticamente
- Consent Mode v2 implementado
- Cookies só carregam com consentimento
- Dados armazenados na UE (configurável)

---

## 💰 **CUSTO:**

**100% GRATUITO!** ✨

- Até 10 milhões de eventos por mês
- Sem limites de utilizadores
- Todos os relatórios incluídos
- Suporte da Google

---

## 📚 **RECURSOS ÚTEIS:**

- [Documentação GA4](https://support.google.com/analytics/answer/9304153)
- [E-commerce Events](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [Consent Mode](https://developers.google.com/tag-platform/security/guides/consent)
- [Google Tag Assistant](https://tagassistant.google.com/)

---

**Criado por:** CreativART's Development Team  
**Data:** 2026-02-08  
**Versão:** 1.0

