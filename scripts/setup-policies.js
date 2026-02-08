/**
 * 🔐 SCRIPT DE CONFIGURAÇÃO DAS POLICIES RLS
 * 
 * Este script configura as policies de segurança (RLS) para os buckets.
 * REQUER: SUPABASE_SERVICE_ROLE_KEY no .env.local
 * 
 * Como usar:
 * node scripts/setup-policies.js
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

// Carregar variáveis de ambiente
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('\n🔐 CONFIGURAÇÃO DAS POLICIES RLS\n')
console.log('='.repeat(50))

if (!supabaseUrl) {
  console.error('❌ ERRO: NEXT_PUBLIC_SUPABASE_URL não encontrada!')
  process.exit(1)
}

if (!serviceRoleKey) {
  console.error('❌ ERRO: SUPABASE_SERVICE_ROLE_KEY não encontrada!')
  console.error('\n📝 COMO OBTER A SERVICE ROLE KEY:')
  console.error('   1. Ir para: https://app.supabase.com')
  console.error('   2. Selecionar projeto')
  console.error('   3. Settings > API')
  console.error('   4. Copiar "service_role" key (secret)')
  console.error('   5. Adicionar no .env.local:')
  console.error('      SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...')
  console.error('\n⚠️  ATENÇÃO: Esta chave é SECRETA! Nunca commite no Git!')
  process.exit(1)
}

console.log('✅ Variáveis de ambiente carregadas')

const supabase = createClient(supabaseUrl, serviceRoleKey)

// Ler o script SQL
const sqlScript = fs.readFileSync('supabase/storage-setup.sql', 'utf8')

async function setupPolicies() {
  try {
    console.log('\n📜 Executando script SQL...')
    console.log('-'.repeat(50))
    
    // Executar o script SQL
    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: sqlScript
    })
    
    if (error) {
      // Se a função exec_sql não existir, tentar executar manualmente
      if (error.message.includes('function') || error.message.includes('does not exist')) {
        console.log('⚠️  Função exec_sql não disponível')
        console.log('   Executando SQL manualmente via Supabase Dashboard...')
        console.log('\n📋 INSTRUÇÕES MANUAIS:')
        console.log('   1. Ir para: https://app.supabase.com')
        console.log('   2. Selecionar projeto')
        console.log('   3. SQL Editor > New query')
        console.log('   4. Copiar conteúdo de: supabase/storage-setup.sql')
        console.log('   5. Colar e executar (RUN)')
        console.log('\n   Arquivo: supabase/storage-setup.sql')
        return false
      }
      
      throw error
    }
    
    console.log('✅ Script SQL executado com sucesso!')
    return true
    
  } catch (error) {
    console.error('❌ Erro ao executar SQL:', error.message)
    console.log('\n📋 SOLUÇÃO:')
    console.log('   Execute o SQL manualmente no Supabase Dashboard:')
    console.log('   1. Ir para: https://app.supabase.com')
    console.log('   2. SQL Editor > New query')
    console.log('   3. Copiar conteúdo de: supabase/storage-setup.sql')
    console.log('   4. Executar (RUN)')
    return false
  }
}

setupPolicies().then(success => {
  console.log('\n' + '='.repeat(50))
  if (success) {
    console.log('✅ POLICIES CONFIGURADAS!')
    console.log('   Agora execute: node scripts/test-upload.js')
  } else {
    console.log('⚠️  CONFIGURAÇÃO MANUAL NECESSÁRIA')
    console.log('   Siga as instruções acima')
  }
  console.log('='.repeat(50) + '\n')
  process.exit(success ? 0 : 1)
})

