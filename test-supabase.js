// Test Supabase Connection
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Testing Supabase Connection...\n')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'NOT FOUND')
console.log('')

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    // Test 1: Fetch categories
    console.log('📋 Test 1: Fetching categories...')
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*')
    
    if (catError) {
      console.error('❌ Error fetching categories:', catError.message)
    } else {
      console.log(`✅ Found ${categories?.length || 0} categories`)
      if (categories && categories.length > 0) {
        console.log('   First category:', categories[0].name)
      }
    }
    console.log('')

    // Test 2: Fetch products
    console.log('📦 Test 2: Fetching products...')
    const { data: products, error: prodError } = await supabase
      .from('products')
      .select('*')
    
    if (prodError) {
      console.error('❌ Error fetching products:', prodError.message)
    } else {
      console.log(`✅ Found ${products?.length || 0} products`)
      if (products && products.length > 0) {
        console.log('   First product:', products[0].name)
      }
    }
    console.log('')

    // Test 3: Fetch products with relations
    console.log('🔗 Test 3: Fetching products with relations...')
    const { data: productsWithRelations, error: relError } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        images:product_images(*)
      `)
      .eq('is_active', true)
    
    if (relError) {
      console.error('❌ Error fetching products with relations:', relError.message)
    } else {
      console.log(`✅ Found ${productsWithRelations?.length || 0} active products with relations`)
      if (productsWithRelations && productsWithRelations.length > 0) {
        const first = productsWithRelations[0]
        console.log('   Product:', first.name)
        console.log('   Category:', first.category?.name || 'N/A')
        console.log('   Images:', first.images?.length || 0)
      }
    }
    console.log('')

    // Summary
    console.log('📊 SUMMARY:')
    console.log('   Categories:', categories?.length || 0)
    console.log('   Products:', products?.length || 0)
    console.log('   Active products:', productsWithRelations?.length || 0)
    console.log('')
    
    if (products && products.length > 0) {
      console.log('✅ Supabase connection is working!')
      console.log('✅ Database has data!')
      console.log('')
      console.log('🎉 You can now test the website at http://localhost:3000/produtos')
    } else {
      console.log('⚠️  Supabase connection works, but no products found.')
      console.log('   Did you run the seed.sql script?')
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

testConnection()

