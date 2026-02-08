# 🎟️ Setup do Sistema de Cupões

## 📋 Pré-requisitos

A tabela `coupons` já foi criada no `schema.sql` e os cupões de exemplo já foram inseridos no `seed.sql`.

## 🔧 Configuração Adicional

### 1. Executar Função SQL

Execute o ficheiro `coupon-functions.sql` no SQL Editor do Supabase:

1. Aceda a: https://supabase.com/dashboard/project/omyzinorxureifoyzffx/sql/new
2. Copie o conteúdo de `supabase/coupon-functions.sql`
3. Cole no SQL Editor
4. Clique em **RUN**

### 2. Verificar Cupões de Exemplo

Os seguintes cupões já foram criados (se executou o `seed.sql`):

| Código | Tipo | Valor | Mínimo | Validade |
|--------|------|-------|--------|----------|
| `WELCOME10` | Percentagem | 10% | €20 | 30 dias |
| `SUMMER5` | Fixo | €5 | €30 | 60 dias |
| `FIRSTORDER` | Percentagem | 15% | €25 | 90 dias |

## 🧪 Testar o Sistema

### 1. Adicionar Produtos ao Carrinho

1. Vá para http://localhost:3000/produtos
2. Adicione produtos até ter pelo menos €20 no carrinho

### 2. Aplicar Cupão

1. Vá para http://localhost:3000/carrinho
2. No campo "Cupão de Desconto", digite: `WELCOME10`
3. Clique em "Aplicar"
4. Deve ver:
   - ✅ Cupão aplicado com sucesso (fundo verde)
   - ✅ Desconto de 10% calculado
   - ✅ Total atualizado

### 3. Testar Validações

**Cupão Inválido:**
- Digite `INVALID123` → Deve mostrar erro: "Cupão inválido ou não encontrado"

**Valor Mínimo:**
- Com carrinho de €15, tente `WELCOME10` → Deve mostrar: "Valor mínimo de compra: €20.00"

**Cupão Expirado:**
- Crie um cupão com `valid_until` no passado → Deve mostrar: "Este cupão expirou"

## 📊 Estrutura da Tabela Coupons

```sql
CREATE TABLE coupons (
  id UUID PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  type VARCHAR(20) CHECK (type IN ('percentage', 'fixed')),
  value DECIMAL(10, 2) NOT NULL,
  min_purchase_amount DECIMAL(10, 2),
  max_discount_amount DECIMAL(10, 2),
  valid_from TIMESTAMP WITH TIME ZONE NOT NULL,
  valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  applicable_products UUID[],
  applicable_categories UUID[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎯 Funcionalidades Implementadas

- ✅ Validação de cupões em tempo real
- ✅ Tipos de desconto: percentagem e valor fixo
- ✅ Valor mínimo de compra
- ✅ Desconto máximo (cap)
- ✅ Datas de validade
- ✅ Limite de utilizações
- ✅ Produtos/categorias aplicáveis
- ✅ Estado ativo/inativo
- ✅ Feedback visual (verde quando aplicado, vermelho em erro)
- ✅ Loading state durante validação

## 🔐 Segurança

- ✅ Validação server-side (Supabase)
- ✅ Códigos case-insensitive (convertidos para maiúsculas)
- ✅ Proteção contra cupões expirados
- ✅ Proteção contra uso excessivo
- ✅ Validação de valor mínimo

## 📝 Criar Novos Cupões

Para criar novos cupões, execute SQL no Supabase:

```sql
INSERT INTO coupons (
  code, 
  type, 
  value, 
  min_purchase_amount, 
  valid_from, 
  valid_until, 
  usage_limit, 
  is_active
)
VALUES (
  'NATAL2026',           -- Código do cupão
  'percentage',          -- 'percentage' ou 'fixed'
  20,                    -- 20% ou €20
  50,                    -- Mínimo €50
  NOW(),                 -- Válido desde agora
  NOW() + INTERVAL '30 days',  -- Válido por 30 dias
  500,                   -- Máximo 500 usos
  true                   -- Ativo
);
```

## 🚀 Próximos Passos

- [ ] Implementar incremento de `usage_count` no checkout
- [ ] Criar página de admin para gerir cupões
- [ ] Adicionar cupões específicos por utilizador
- [ ] Implementar cupões de primeira compra automáticos
- [ ] Analytics de uso de cupões

