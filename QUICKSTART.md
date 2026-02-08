# 🚀 Quick Start - CreativART's

Guia rápido para começar em 5 minutos!

## ⚡ Início Rápido (Sem Configurações Externas)

Se quiser apenas ver o projeto a funcionar localmente sem configurar Supabase/Stripe:

### 1. Instalar
```bash
npm install
```

### 2. Criar .env.local
```bash
cp .env.example .env.local
```

### 3. Executar
```bash
npm run dev
```

### 4. Abrir
Abra http://localhost:3000

**Nota**: Sem as configurações externas, algumas funcionalidades não funcionarão (produtos da BD, pagamentos), mas pode ver o design e a estrutura.

---

## 🔧 Configuração Completa (15-20 minutos)

Para ter todas as funcionalidades:

### 1. Supabase (5 min)
1. Criar conta em [supabase.com](https://supabase.com)
2. Criar projeto
3. Copiar URL e keys para `.env.local`
4. Executar scripts SQL (schema, policies, seed)

### 2. Stripe (3 min)
1. Criar conta em [stripe.com](https://stripe.com)
2. Modo teste
3. Copiar keys para `.env.local`

### 3. Resend (2 min)
1. Criar conta em [resend.com](https://resend.com)
2. Copiar API key para `.env.local`

**Guia detalhado**: Ver [INSTALLATION.md](INSTALLATION.md)

---

## 📁 Estrutura Importante

```
creativarts-store/
├── app/
│   ├── page.tsx              ← Homepage
│   ├── layout.tsx            ← Layout principal
│   └── globals.css           ← Estilos
├── components/
│   ├── layout/               ← Header, Footer
│   ├── home/                 ← Componentes homepage
│   └── products/             ← Componentes produtos
├── store/
│   └── cartStore.ts          ← Estado do carrinho
├── types/
│   └── index.ts              ← Tipos TypeScript
└── supabase/
    ├── schema.sql            ← Schema BD
    ├── rls-policies.sql      ← Segurança
    └── seed.sql              ← Dados exemplo
```

---

## 🎨 Brand Colors

```css
Amarelo:  #F9D648  (accent)
Azul:     #00AEEF  (secondary)
Vermelho: #ED1C24  (primary - botões)
Cinza:    #333333  (texto)
```

---

## 🛠️ Scripts Disponíveis

```bash
npm run dev        # Desenvolvimento
npm run build      # Build produção
npm run start      # Servidor produção
npm run lint       # Linter
npm run type-check # Verificar tipos
```

---

## ✅ Checklist Inicial

- [ ] `npm install` executado
- [ ] `.env.local` criado
- [ ] Supabase configurado (opcional)
- [ ] Stripe configurado (opcional)
- [ ] `npm run dev` a funcionar
- [ ] Homepage visível em localhost:3000

---

## 🎯 Próximos Passos

1. ✅ Ver homepage funcionando
2. ⏳ Configurar Supabase (ver produtos reais)
3. ⏳ Implementar PLP (listagem produtos)
4. ⏳ Implementar PDP (detalhes produto)
5. ⏳ Sistema de personalização
6. ⏳ Checkout e pagamentos

---

## 📚 Documentação

- **README.md** - Visão geral do projeto
- **INSTALLATION.md** - Guia completo de instalação
- **ARCHITECTURE.md** - Arquitetura técnica
- **PROJECT_SUMMARY.md** - Resumo do que foi criado

---

## 🆘 Problemas Comuns

### Erro: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Porta 3000 ocupada
```bash
npm run dev -- -p 3001
```

### Erro de TypeScript
```bash
npm run type-check
```

---

## 💡 Dicas

1. **Hot Reload**: Alterações são aplicadas automaticamente
2. **Tailwind**: Use classes do Tailwind para styling
3. **Componentes**: Crie componentes reutilizáveis em `/components`
4. **Types**: Adicione tipos em `/types/index.ts`

---

## 🎉 Está Pronto!

Agora pode começar a desenvolver a loja CreativART's!

Para mais detalhes, consulte a documentação completa.

