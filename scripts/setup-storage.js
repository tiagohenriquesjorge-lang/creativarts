/**
 * 🔧 SCRIPT DE CONFIGURAÇÃO AUTOMÁTICA DO STORAGE
 * 
 * Este script configura automaticamente os buckets e policies do Supabase Storage.
 * 
 * Como usar:
 * node scripts/setup-storage.js
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Carregar variáveis de ambiente
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('\n🔧 CONFIGURAÇÃO AUTOMÁTICA DO STORAGE\n')
console.log('='.repeat(50))

// Verificar variáveis de ambiente
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ ERRO: Variáveis de ambiente não encontradas!')
  console.error('   Verifique se .env.local existe e contém:')
  console.error('   - NEXT_PUBLIC_SUPABASE_URL')
  console.error('   - NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

console.log('✅ Variáveis de ambiente carregadas')
console.log(`   URL: ${supabaseUrl}`)

// Criar cliente Supabase
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupStorage() {
  try {
    console.log('\n📦 PASSO 1: Criar Buckets')
    console.log('-'.repeat(50))
    
    // Verificar buckets existentes
    const { data: existingBuckets, error: listError } = await supabase
      .storage
      .listBuckets()
    
    if (listError) {
      console.error('❌ Erro ao listar buckets:', listError.message)
      return false
    }
    
    console.log(`   Buckets existentes: ${existingBuckets.length}`)
    
    // Criar bucket de produtos
    const productBucketExists = existingBuckets.find(b => b.id === 'product-images')
    
    if (!productBucketExists) {
      console.log('   Criando bucket: product-images...')
      const { error: createError1 } = await supabase
        .storage
        .createBucket('product-images', {
          public: true,
          fileSizeLimit: 5242880, // 5MB
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
        })
      
      if (createError1) {
        console.error('   ❌ Erro ao criar product-images:', createError1.message)
      } else {
        console.log('   ✅ Bucket product-images criado!')
      }
    } else {
      console.log('   ✅ Bucket product-images já existe')
      
      // Atualizar para público se não for
      if (!productBucketExists.public) {
        const { error: updateError } = await supabase
          .storage
          .updateBucket('product-images', { public: true })
        
        if (!updateError) {
          console.log('   ✅ Bucket product-images atualizado para público')
        }
      }
    }
    
    // Criar bucket de categorias
    const categoryBucketExists = existingBuckets.find(b => b.id === 'category-images')
    
    if (!categoryBucketExists) {
      console.log('   Criando bucket: category-images...')
      const { error: createError2 } = await supabase
        .storage
        .createBucket('category-images', {
          public: true,
          fileSizeLimit: 5242880, // 5MB
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
        })
      
      if (createError2) {
        console.error('   ❌ Erro ao criar category-images:', createError2.message)
      } else {
        console.log('   ✅ Bucket category-images criado!')
      }
    } else {
      console.log('   ✅ Bucket category-images já existe')
      
      // Atualizar para público se não for
      if (!categoryBucketExists.public) {
        const { error: updateError } = await supabase
          .storage
          .updateBucket('category-images', { public: true })
        
        if (!updateError) {
          console.log('   ✅ Bucket category-images atualizado para público')
        }
      }
    }
    
    console.log('\n✅ PASSO 2: Verificar Configuração')
    console.log('-'.repeat(50))
    
    const { data: finalBuckets } = await supabase
      .storage
      .listBuckets()
    
    const productBucket = finalBuckets.find(b => b.id === 'product-images')
    const categoryBucket = finalBuckets.find(b => b.id === 'category-images')
    
    if (productBucket && categoryBucket) {
      console.log('✅ Bucket product-images: ' + (productBucket.public ? 'PÚBLICO' : 'PRIVADO'))
      console.log('✅ Bucket category-images: ' + (categoryBucket.public ? 'PÚBLICO' : 'PRIVADO'))
      
      if (productBucket.public && categoryBucket.public) {
        console.log('\n🎉 CONFIGURAÇÃO CONCLUÍDA COM SUCESSO!')
        console.log('   Os buckets estão prontos para uso!')
        return true
      } else {
        console.log('\n⚠️  ATENÇÃO: Buckets criados mas não são públicos!')
        console.log('   Execute o script SQL manualmente para configurar policies.')
        return false
      }
    } else {
      console.log('\n❌ ERRO: Buckets não foram criados corretamente')
      console.log('   Execute o script SQL manualmente:')
      console.log('   supabase/storage-setup.sql')
      return false
    }
    
  } catch (error) {
    console.error('❌ Erro inesperado:', error.message)
    return false
  }
}

// Executar configuração
setupStorage().then(success => {
  console.log('\n' + '='.repeat(50))
  if (success) {
    console.log('✅ STORAGE CONFIGURADO!')
    console.log('   Agora execute: node scripts/test-upload.js')
  } else {
    console.log('❌ CONFIGURAÇÃO FALHOU')
    console.log('   Siga as instruções em STORAGE_SETUP.md')
  }
  console.log('='.repeat(50) + '\n')
  process.exit(success ? 0 : 1)
})

