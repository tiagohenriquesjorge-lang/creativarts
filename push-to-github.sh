#!/bin/bash

echo "🚀 Fazendo push para GitHub..."
echo ""
echo "Repositório: https://github.com/tiagohenriquesjorge-lang/creativarts"
echo ""

# Remover remote antigo
git remote remove origin 2>/dev/null

# Adicionar remote com HTTPS
git remote add origin https://github.com/tiagohenriquesjorge-lang/creativarts.git

# Fazer push
echo "Fazendo push..."
git push -u origin main

echo ""
echo "✅ Push completo!"
echo "Veja em: https://github.com/tiagohenriquesjorge-lang/creativarts"

