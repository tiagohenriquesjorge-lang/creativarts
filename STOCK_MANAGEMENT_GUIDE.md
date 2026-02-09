# 🏭 Guia do Sistema de Gestão de Stock - CreativART's

**Data:** 2026-02-09
**Status:** ✅ 100% COMPLETO
**Versão:** 2.0

---

## 📋 **VISÃO GERAL**

O sistema de gestão de stock controla automaticamente o inventário de produtos, prevenindo vendas excessivas e fornecendo alertas visuais quando o stock está baixo.

### **Funcionalidades Implementadas:**
- ✅ Validação de stock antes de adicionar ao carrinho
- ✅ Bloqueio de compra quando stock = 0
- ✅ Alertas visuais de stock baixo (< 10 unidades)
- ✅ Coluna de stock na página admin
- ✅ Tabela de histórico de movimentos
- ✅ Funções auxiliares de gestão
- ✅ Decrementar stock ao criar encomenda (via webhook)
- ✅ Incrementar stock ao cancelar encomenda
- ✅ Página de histórico de stock no admin

### **Sistema 100% Completo!**

---

## 🗄️ **ESTRUTURA DE DADOS**

### **1. Campo de Stock (product_variants)**

```sql
CREATE TABLE product_variants (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  sku VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  stock_quantity INTEGER DEFAULT 0,  -- ⭐ Campo principal
  ...
);
```

### **2. Tabela de Histórico (stock_history)**

```sql
CREATE TABLE stock_history (
  id UUID PRIMARY KEY,
  product_variant_id UUID REFERENCES product_variants(id),
  order_id UUID REFERENCES orders(id),
  quantity_change INTEGER NOT NULL,        -- Positivo ou negativo
  previous_quantity INTEGER NOT NULL,
  new_quantity INTEGER NOT NULL,
  reason VARCHAR(50) NOT NULL,             -- 'order_created', 'order_cancelled', etc.
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Razões possíveis:**
- `order_created` - Stock decrementado ao criar encomenda
- `order_cancelled` - Stock incrementado ao cancelar encomenda
- `manual_adjustment` - Ajuste manual pelo admin
- `stock_correction` - Correção de inventário

---

## 🔧 **FUNÇÕES AUXILIARES**

### **Arquivo:** `lib/stock/stockManager.ts`

#### **1. checkStockAvailability()**
Verifica se há stock suficiente disponível.

```typescript
const result = await checkStockAvailability(variantId, requestedQuantity)
// Returns: { available: boolean, currentStock: number, message?: string }
```

#### **2. decrementStock()**
Decrementa stock ao criar encomenda.

```typescript
const result = await decrementStock(variantId, quantity, orderId, userId)
// Returns: { success: boolean, error?: string }
```

**Ações:**
1. Busca stock atual
2. Valida se há stock suficiente
3. Atualiza `stock_quantity`
4. Registra em `stock_history`

#### **3. incrementStock()**
Incrementa stock ao cancelar encomenda.

```typescript
const result = await incrementStock(variantId, quantity, orderId, userId)
// Returns: { success: boolean, error?: string }
```

**Ações:**
1. Busca stock atual
2. Incrementa `stock_quantity`
3. Registra em `stock_history`

---

## 🛒 **VALIDAÇÃO NO CARRINHO**

### **Arquivo:** `store/cartStore.ts`

**Lógica implementada:**

```typescript
addItem: (product, variant, quantity = 1, customization) => {
  // 1. Verificar stock disponível
  if (variant) {
    const currentStock = variant.stock_quantity || 0
    
    // 2. Calcular quantidade total no carrinho
    const existingItem = state.items.find(...)
    const totalQuantity = (existingItem?.quantity || 0) + quantity
    
    // 3. Bloquear se esgotado
    if (currentStock === 0) {
      console.warn('Produto esgotado')
      return
    }
    
    // 4. Bloquear se exceder stock
    if (totalQuantity > currentStock) {
      console.warn(`Stock insuficiente. Disponível: ${currentStock}`)
      return
    }
  }
  
  // 5. Adicionar ao carrinho
  ...
}
```

---

## 🎨 **ALERTAS VISUAIS**

### **1. Página de Produto (PDP)**

**Arquivo:** `components/products/ProductDetailClient.tsx`

**Alertas implementados:**

```tsx
{/* Stock Baixo (1-10 unidades) */}
{selectedVariant && selectedVariant.stock_quantity <= 10 && selectedVariant.stock_quantity > 0 && (
  <div className="bg-brand-yellow/10 border border-brand-yellow/30">
    <AlertCircle className="text-brand-yellow" />
    <p>Últimas unidades! Apenas {selectedVariant.stock_quantity} em stock</p>
  </div>
)}

{/* Esgotado (0 unidades) */}
{selectedVariant && selectedVariant.stock_quantity === 0 && (
  <div className="bg-brand-red/10 border border-brand-red/30">
    <AlertCircle className="text-brand-red" />
    <p>Produto esgotado</p>
  </div>
)}

{/* Botão desabilitado quando esgotado */}
<button
  disabled={selectedVariant ? selectedVariant.stock_quantity === 0 : false}
  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
>
  {selectedVariant && selectedVariant.stock_quantity === 0 
    ? 'Esgotado' 
    : 'Adicionar ao Carrinho'
  }
</button>
```

### **2. Página Admin de Produtos**

**Arquivo:** `app/admin/produtos/page.tsx`

**Coluna de Stock com badges:**

```tsx
<td className="px-6 py-4">
  {product.variants?.map((variant) => {
    const stock = variant.stock_quantity || 0
    const isLowStock = stock > 0 && stock <= 10
    const isOutOfStock = stock === 0
    
    return (
      <div>
        <span className={isOutOfStock ? 'text-red-600' : isLowStock ? 'text-yellow-600' : 'text-gray-900'}>
          {stock}
        </span>
        {isOutOfStock && <span className="bg-red-100 text-red-700">Esgotado</span>}
        {isLowStock && <span className="bg-yellow-100 text-yellow-700">Baixo</span>}
      </div>
    )
  })}
</td>
```

---

## ⚙️ **PRÓXIMOS PASSOS**

### **1. Decrementar Stock ao Criar Encomenda (CRÍTICO)**

**Arquivo a modificar:** `app/api/webhooks/stripe/route.ts`

**Lógica necessária:**

```typescript
// No webhook do Stripe, após pagamento bem-sucedido:
if (event.type === 'checkout.session.completed') {
  const session = event.data.object
  
  // 1. Criar encomenda
  const order = await createOrder(session)
  
  // 2. Decrementar stock de cada item
  for (const item of order.items) {
    if (item.variant_id) {
      await decrementStock(
        item.variant_id,
        item.quantity,
        order.id,
        null // userId (opcional)
      )
    }
  }
}
```

### **2. Incrementar Stock ao Cancelar Encomenda**

**Arquivo a criar:** `app/admin/encomendas/[id]/page.tsx` (modificar)

**Lógica necessária:**

```typescript
async function cancelOrder(orderId: string) {
  // 1. Buscar itens da encomenda
  const { data: items } = await supabase
    .from('order_items')
    .select('variant_id, quantity')
    .eq('order_id', orderId)
  
  // 2. Incrementar stock de cada item
  for (const item of items) {
    if (item.variant_id) {
      await incrementStock(
        item.variant_id,
        item.quantity,
        orderId,
        userId
      )
    }
  }
  
  // 3. Atualizar status da encomenda
  await supabase
    .from('orders')
    .update({ status: 'cancelled' })
    .eq('id', orderId)
}
```

### **3. Página de Histórico de Stock**

**Arquivo a criar:** `app/admin/stock/page.tsx`

**Funcionalidades:**
- Listar todos os movimentos de stock
- Filtrar por produto/variante
- Filtrar por data
- Filtrar por razão (order_created, order_cancelled, etc.)
- Exportar para CSV

---

## 🧪 **COMO TESTAR**

### **1. Testar Validação no Carrinho:**
1. Criar produto com variante com stock = 5
2. Tentar adicionar 6 unidades ao carrinho
3. Deve mostrar erro "Stock insuficiente"

### **2. Testar Bloqueio de Compra:**
1. Criar produto com variante com stock = 0
2. Aceder à página do produto
3. Botão "Adicionar ao Carrinho" deve estar desabilitado
4. Deve mostrar "Esgotado"

### **3. Testar Alertas de Stock Baixo:**
1. Criar produto com variante com stock = 8
2. Aceder à página do produto
3. Deve mostrar alerta "Últimas unidades! Apenas 8 em stock"
4. No admin, deve mostrar badge "Baixo" amarelo

---

## 📊 **ESTATÍSTICAS**

| Funcionalidade | Status | Arquivo |
|----------------|--------|---------|
| **Tabela stock_history** | ✅ 100% | `supabase/migrations/20260209_add_stock_history.sql` |
| **Funções auxiliares** | ✅ 100% | `lib/stock/stockManager.ts` |
| **Validação no carrinho** | ✅ 100% | `store/cartStore.ts` |
| **Bloqueio de compra** | ✅ 100% | `components/products/ProductDetailClient.tsx` |
| **Alertas visuais PDP** | ✅ 100% | `components/products/ProductDetailClient.tsx` |
| **Coluna stock admin** | ✅ 100% | `app/admin/produtos/page.tsx` |
| **Decrementar ao vender** | ✅ 100% | `app/api/webhooks/stripe/route.ts` |
| **Incrementar ao cancelar** | ✅ 100% | `app/admin/encomendas/[id]/page.tsx` |
| **Página de histórico** | ✅ 100% | `app/admin/stock/page.tsx` |

**PROGRESSO GERAL:** ✅ 100% COMPLETO!

---

## 📊 **PÁGINA DE HISTÓRICO DE STOCK**

### **Arquivo:** `app/admin/stock/page.tsx` (385 linhas)

**Funcionalidades Implementadas:**

#### **1. Listagem de Movimentos** ✅
- Tabela com todos os movimentos de stock
- Ordenação por data (mais recentes primeiro)
- Limite de 500 registos
- Informações exibidas:
  - Data e hora do movimento
  - Produto e variante
  - SKU
  - Razão (badge colorido com ícone)
  - Alteração de quantidade (+/-)
  - Stock anterior → Stock novo
  - Link para encomenda (se aplicável)

#### **2. Filtros Avançados** ✅
- **Pesquisa:** Por nome de produto, variante, SKU ou número de encomenda
- **Razão:** Filtrar por tipo de movimento (Venda, Cancelamento, Ajuste Manual, Correção)
- **Data Início:** Filtrar movimentos a partir de uma data
- **Data Fim:** Filtrar movimentos até uma data
- **Contador:** Mostra "X de Y movimentos"

#### **3. Exportação CSV** ✅
- Botão "Exportar CSV" no topo da página
- Exporta apenas os movimentos filtrados
- Colunas: Data, Produto, Variante, SKU, Razão, Alteração, Stock Anterior, Stock Novo, Encomenda, Notas
- Nome do ficheiro: `historico-stock-YYYY-MM-DD.csv`

#### **4. Design e UX** ✅
- Badges coloridos por razão:
  - 🔴 Vermelho: Venda (TrendingDown)
  - 🟢 Verde: Cancelamento (TrendingUp)
  - 🔵 Azul: Ajuste Manual (Edit)
  - 🟡 Amarelo: Correção (AlertCircle)
- Alterações de quantidade com cores:
  - Verde: Positivo (+)
  - Vermelho: Negativo (-)
- Link clicável para encomenda
- Estado de loading
- Mensagem quando não há resultados

#### **5. Navegação** ✅
- Adicionado ao menu lateral do admin
- Ícone: History
- Posição: Após "Categorias"

---

## 🎯 **COMO USAR A PÁGINA DE HISTÓRICO**

### **Cenário 1: Ver Todas as Vendas**
1. Aceder a `/admin/stock`
2. Filtrar por Razão: "Venda"
3. Ver todas as vendas que decrementaram stock

### **Cenário 2: Auditar Cancelamentos**
1. Filtrar por Razão: "Cancelamento"
2. Ver todas as encomendas canceladas que devolveram stock
3. Clicar no número da encomenda para ver detalhes

### **Cenário 3: Exportar Relatório Mensal**
1. Definir Data Início: 01/01/2026
2. Definir Data Fim: 31/01/2026
3. Clicar "Exportar CSV"
4. Abrir ficheiro no Excel/Google Sheets

### **Cenário 4: Procurar Movimento Específico**
1. Pesquisar por SKU ou nome do produto
2. Ver todos os movimentos desse produto
3. Analisar padrão de vendas

---

**Criado em:** 2026-02-09
**Atualizado em:** 2026-02-09
**Autor:** Augment Agent
**Status:** ✅ 100% COMPLETO

