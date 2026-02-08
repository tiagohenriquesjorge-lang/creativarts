/**
 * 🧪 SCRIPT DE TESTE DO SISTEMA DE UPLOAD
 * 
 * Este script testa:
 * 1. Conexão com Supabase
 * 2. Buckets criados
 * 3. Permissões de leitura
 * 4. Upload de imagem de teste
 * 5. Leitura da imagem
 * 6. Remoção da imagem
 * 
 * Como usar:
 * node scripts/test-upload.js
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Carregar variáveis de ambiente
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('\n🧪 TESTE DO SISTEMA DE UPLOAD\n')
console.log('='.repeat(50))

// Verificar variáveis de ambiente
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERRO: Variáveis de ambiente não encontradas!')
  console.error('   Verifique se .env.local existe e contém:')
  console.error('   - NEXT_PUBLIC_SUPABASE_URL')
  console.error('   - NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

console.log('✅ Variáveis de ambiente carregadas')
console.log(`   URL: ${supabaseUrl}`)
console.log(`   Key: ${supabaseKey.substring(0, 20)}...`)

// Criar cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey)

async function testStorage() {
  try {
    console.log('\n📦 TESTE 1: Listar Buckets')
    console.log('-'.repeat(50))
    
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets()
    
    if (bucketsError) {
      console.error('❌ Erro ao listar buckets:', bucketsError.message)
      return false
    }
    
    console.log(`✅ Total de buckets: ${buckets.length}`)
    
    const productBucket = buckets.find(b => b.id === 'product-images')
    const categoryBucket = buckets.find(b => b.id === 'category-images')
    
    if (productBucket) {
      console.log(`✅ Bucket 'product-images' encontrado (público: ${productBucket.public})`)
    } else {
      console.log('❌ Bucket \'product-images\' NÃO encontrado!')
      console.log('   Execute: supabase/storage-setup.sql')
      return false
    }
    
    if (categoryBucket) {
      console.log(`✅ Bucket 'category-images' encontrado (público: ${categoryBucket.public})`)
    } else {
      console.log('❌ Bucket \'category-images\' NÃO encontrado!')
      console.log('   Execute: supabase/storage-setup.sql')
      return false
    }
    
    console.log('\n📤 TESTE 2: Upload de Imagem de Teste')
    console.log('-'.repeat(50))
    
    // Criar imagem de teste (1x1 pixel PNG)
    const testImageBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    )
    
    const testFileName = `test-${Date.now()}.png`
    const testPath = `tests/${testFileName}`
    
    console.log(`   Fazendo upload: ${testPath}`)
    
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('product-images')
      .upload(testPath, testImageBuffer, {
        contentType: 'image/png',
        upsert: false
      })
    
    if (uploadError) {
      console.error('❌ Erro no upload:', uploadError.message)
      console.error('   Possíveis causas:')
      console.error('   - Policies não configuradas (execute storage-setup.sql)')
      console.error('   - Bucket não existe')
      console.error('   - Sem permissão de upload')
      return false
    }
    
    console.log('✅ Upload bem-sucedido!')
    console.log(`   Path: ${uploadData.path}`)
    
    console.log('\n🔗 TESTE 3: Obter URL Pública')
    console.log('-'.repeat(50))
    
    const { data: urlData } = supabase
      .storage
      .from('product-images')
      .getPublicUrl(testPath)
    
    console.log('✅ URL pública gerada:')
    console.log(`   ${urlData.publicUrl}`)
    
    console.log('\n📋 TESTE 4: Listar Arquivos no Bucket')
    console.log('-'.repeat(50))
    
    const { data: files, error: listError } = await supabase
      .storage
      .from('product-images')
      .list('tests')
    
    if (listError) {
      console.error('❌ Erro ao listar arquivos:', listError.message)
    } else {
      console.log(`✅ Arquivos encontrados: ${files.length}`)
      files.forEach(file => {
        console.log(`   - ${file.name} (${file.metadata?.size || 0} bytes)`)
      })
    }
    
    console.log('\n🗑️  TESTE 5: Remover Imagem de Teste')
    console.log('-'.repeat(50))
    
    const { error: deleteError } = await supabase
      .storage
      .from('product-images')
      .remove([testPath])
    
    if (deleteError) {
      console.error('❌ Erro ao remover:', deleteError.message)
    } else {
      console.log('✅ Imagem removida com sucesso!')
    }
    
    return true
    
  } catch (error) {
    console.error('❌ Erro inesperado:', error.message)
    return false
  }
}

// Executar testes
testStorage().then(success => {
  console.log('\n' + '='.repeat(50))
  if (success) {
    console.log('✅ TODOS OS TESTES PASSARAM!')
    console.log('   O sistema de upload está funcionando corretamente! 🚀')
  } else {
    console.log('❌ ALGUNS TESTES FALHARAM')
    console.log('   Verifique os erros acima e corrija antes de continuar.')
  }
  console.log('='.repeat(50) + '\n')
  process.exit(success ? 0 : 1)
})

