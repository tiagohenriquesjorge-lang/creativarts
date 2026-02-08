# Guia de Resolução de Problemas

## 🔧 Problemas Comuns e Soluções

### 1. Erro: "Module not found" ou "Cannot find module"

**Problema**: Dependências não instaladas ou corrompidas.

**Solução**:
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install

# Ou usar cache limpo
npm ci
```

---

### 2. Erro: "Missing Supabase environment variables"

**Problema**: Variáveis de ambiente não configuradas.

**Solução**:
1. Verifique se `.env.local` existe
2. Copie de `.env.example` se necessário:
   ```bash
   cp .env.example .env.local
   ```
3. Preencha as variáveis do Supabase
4. Reinicie o servidor:
   ```bash
   npm run dev
   ```

---

### 3. Porta 3000 já está em uso

**Problema**: Outra aplicação está usando a porta 3000.

**Solução**:
```bash
# Usar outra porta
npm run dev -- -p 3001

# Ou matar o processo na porta 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

### 4. Erro de TypeScript

**Problema**: Erros de tipo no código.

**Solução**:
```bash
# Verificar erros
npm run type-check

# Limpar cache do TypeScript
rm -rf .next
npm run dev
```

---

### 5. Tailwind CSS não funciona

**Problema**: Classes do Tailwind não aplicadas.

**Solução**:
1. Verifique se `tailwind.config.ts` está correto
2. Verifique se `globals.css` importa o Tailwind:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
3. Reinicie o servidor
4. Limpe o cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

---

### 6. Imagens não carregam

**Problema**: Next.js Image não funciona.

**Solução**:
1. Verifique se o domínio está em `next.config.js`:
   ```javascript
   images: {
     remotePatterns: [
       {
         protocol: 'https',
         hostname: '**.supabase.co',
       },
     ],
   }
   ```
2. Use caminho correto:
   ```tsx
   <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
   ```

---

### 7. Supabase: "Failed to fetch"

**Problema**: Não consegue conectar ao Supabase.

**Solução**:
1. Verifique as credenciais em `.env.local`
2. Confirme que o projeto Supabase está ativo
3. Verifique a URL (deve terminar em `.supabase.co`)
4. Teste a conexão:
   ```typescript
   const { data, error } = await supabase.from('products').select('*')
   console.log(data, error)
   ```

---

### 8. RLS Policy: "Row level security policy violation"

**Problema**: Políticas de segurança bloqueiam acesso.

**Solução**:
1. Verifique se executou `rls-policies.sql`
2. Para desenvolvimento, pode desativar RLS temporariamente:
   ```sql
   ALTER TABLE products DISABLE ROW LEVEL SECURITY;
   ```
3. **Importante**: Reative antes de produção!

---

### 9. Carrinho não persiste

**Problema**: Itens do carrinho desaparecem ao recarregar.

**Solução**:
1. Verifique se Zustand persist está configurado
2. Limpe o LocalStorage:
   ```javascript
   localStorage.clear()
   ```
3. Verifique o console para erros

---

### 10. Build falha

**Problema**: `npm run build` falha.

**Solução**:
```bash
# Verificar erros de lint
npm run lint

# Verificar erros de tipo
npm run type-check

# Limpar e rebuildar
rm -rf .next
npm run build
```

---

### 11. Fontes não carregam

**Problema**: Google Fonts não aparecem.

**Solução**:
1. Verifique a importação em `globals.css`:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
   ```
2. Ou use Next.js Font:
   ```typescript
   import { Inter } from 'next/font/google'
   const inter = Inter({ subsets: ['latin'] })
   ```

---

### 12. Hot Reload não funciona

**Problema**: Mudanças não aparecem automaticamente.

**Solução**:
1. Reinicie o servidor
2. Limpe o cache:
   ```bash
   rm -rf .next
   npm run dev
   ```
3. Verifique se não há erros no console

---

### 13. Erro: "Hydration failed"

**Problema**: Diferença entre server e client render.

**Solução**:
1. Não use `localStorage` ou `window` no render inicial
2. Use `useEffect` para código client-side:
   ```typescript
   useEffect(() => {
     // Código que usa window/localStorage
   }, [])
   ```
3. Use `'use client'` se necessário

---

### 14. Stripe: "Invalid API Key"

**Problema**: Chave do Stripe incorreta.

**Solução**:
1. Verifique se está em modo teste
2. Copie a chave correta do dashboard
3. Verifique se usou a chave certa:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (começa com `pk_`)
   - `STRIPE_SECRET_KEY` (começa com `sk_`)

---

### 15. CSS não atualiza

**Problema**: Mudanças no CSS não aparecem.

**Solução**:
1. Hard refresh: `Ctrl+Shift+R` (Windows) ou `Cmd+Shift+R` (Mac)
2. Limpe o cache do browser
3. Reinicie o servidor

---

## 🐛 Debug Geral

### Verificar Logs
```bash
# Console do browser (F12)
# Terminal onde o servidor está rodando
```

### Verificar Variáveis de Ambiente
```typescript
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
```

### Verificar Estado do Zustand
```typescript
const cartState = useCartStore.getState()
console.log('Cart:', cartState)
```

---

## 📞 Ainda com Problemas?

1. **Verifique a documentação**:
   - README.md
   - INSTALLATION.md
   - DEVELOPMENT.md

2. **Procure no código**:
   - Verifique exemplos em componentes existentes
   - Leia os comentários no código

3. **Recursos externos**:
   - [Next.js Docs](https://nextjs.org/docs)
   - [Supabase Docs](https://supabase.com/docs)
   - [Tailwind Docs](https://tailwindcss.com/docs)

4. **Crie uma issue**:
   - Descreva o problema
   - Inclua mensagens de erro
   - Passos para reproduzir

---

**Última atualização**: 2026-02-06

