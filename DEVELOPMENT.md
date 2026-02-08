# Guia de Desenvolvimento - CreativART's

## 🛠️ Ambiente de Desenvolvimento

### Requisitos
- Node.js 18+
- npm 9+
- Git
- Editor de código (recomendado: VS Code)

### Extensões VS Code Recomendadas
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

## 📝 Convenções de Código

### TypeScript
- Use tipos explícitos sempre que possível
- Evite `any` - use `unknown` se necessário
- Crie interfaces para objetos complexos em `/types`

### Componentes React
- Use componentes funcionais
- Prefira `const` para declarar componentes
- Use TypeScript para props

```typescript
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export default function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>
}
```

### Naming Conventions
- **Componentes**: PascalCase (`ProductCard.tsx`)
- **Funções**: camelCase (`formatPrice()`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_ITEMS`)
- **Arquivos**: kebab-case para utilitários (`format-price.ts`)

### CSS/Tailwind
- Use classes do Tailwind sempre que possível
- Para estilos customizados, adicione em `globals.css`
- Use a função `cn()` para merge de classes

```typescript
import { cn } from '@/lib/utils/cn'

<div className={cn('base-class', isActive && 'active-class')} />
```

## 🏗️ Estrutura de Componentes

### Organização
```
components/
├── layout/          # Layout components (Header, Footer)
├── home/            # Homepage specific
├── products/        # Product related
├── cart/            # Cart related
├── ui/              # Reusable UI components
└── [feature]/       # Feature-specific components
```

### Exemplo de Componente
```typescript
// components/products/ProductCard.tsx
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="card">
      {/* Component content */}
    </article>
  )
}
```

## 🎨 Styling Guidelines

### Cores da Marca
Use as variáveis CSS ou classes Tailwind:

```css
/* CSS Variables */
var(--color-brand-yellow)
var(--color-brand-blue)
var(--color-brand-red)

/* Tailwind Classes */
bg-brand-yellow
text-brand-blue
border-brand-red
```

### Componentes de UI
Use as classes pré-definidas:

```html
<button class="btn-primary">Ação Principal</button>
<button class="btn-secondary">Ação Secundária</button>
<button class="btn-outline">Ação Terciária</button>

<input class="input-field" />
<div class="card">...</div>
<span class="badge-customizable">Personalizável</span>
```

## 📊 State Management

### Zustand Store
Para estado global (ex: carrinho):

```typescript
// store/exampleStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ExampleState {
  items: Item[]
  addItem: (item: Item) => void
}

export const useExampleStore = create<ExampleState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ 
        items: [...state.items, item] 
      })),
    }),
    { name: 'example-storage' }
  )
)
```

### React State
Para estado local, use `useState`:

```typescript
const [isOpen, setIsOpen] = useState(false)
```

## 🗄️ Database (Supabase)

### Queries
Use o cliente Supabase:

```typescript
import { supabase } from '@/lib/supabase/client'

// Fetch products
const { data, error } = await supabase
  .from('products')
  .select('*, category:categories(*)')
  .eq('is_active', true)
```

### Server-side (Admin)
```typescript
import { supabaseAdmin } from '@/lib/supabase/server'

// Use only in API routes or server components
const { data } = await supabaseAdmin
  .from('orders')
  .select('*')
```

## 🔌 API Routes

### Estrutura
```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Logic here
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Error message' }, { status: 500 })
  }
}
```

## 🧪 Testing (Futuro)

### Unit Tests
```typescript
import { render, screen } from '@testing-library/react'
import ProductCard from './ProductCard'

describe('ProductCard', () => {
  it('renders product name', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Product Name')).toBeInTheDocument()
  })
})
```

## 🚀 Git Workflow

### Branches
- `main` - Produção
- `develop` - Desenvolvimento
- `feature/nome-feature` - Novas funcionalidades
- `fix/nome-bug` - Correções

### Commits
Use mensagens descritivas:

```bash
git commit -m "feat: add product filtering to PLP"
git commit -m "fix: resolve cart quantity update issue"
git commit -m "docs: update installation guide"
```

Prefixos:
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Manutenção

## 📦 Build & Deploy

### Build Local
```bash
npm run build
npm run start
```

### Verificações Antes de Deploy
```bash
npm run lint          # Verificar linting
npm run type-check    # Verificar tipos
npm run build         # Build de produção
```

## 🔍 Debugging

### Console Logs
Use console.log para debugging local, mas remova antes de commit:

```typescript
console.log('Debug:', data)
```

### React DevTools
Instale a extensão React DevTools para inspecionar componentes.

### Network Tab
Use as DevTools do browser para inspecionar requests.

## ⚡ Performance

### Otimizações
- Use `next/image` para imagens
- Lazy load componentes pesados
- Use `useMemo` e `useCallback` quando apropriado
- Evite re-renders desnecessários

### Lighthouse
Execute regularmente:
```bash
npm run build
npm run start
# Abra Chrome DevTools > Lighthouse
```

## 🔐 Segurança

### Variáveis de Ambiente
- Nunca commite `.env.local`
- Use `NEXT_PUBLIC_` apenas para variáveis públicas
- Mantenha secrets no servidor

### Validação
- Valide inputs do utilizador
- Use Zod para validação de schemas
- Sanitize dados antes de guardar

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🆘 Ajuda

Se encontrar problemas:
1. Verifique a documentação
2. Procure em issues existentes
3. Crie uma nova issue com detalhes

