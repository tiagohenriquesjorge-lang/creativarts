'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import type { Product, Category } from '@/types'
import ProductCard from './ProductCard'
import ProductFilters from './ProductFilters'
import { SlidersHorizontal } from 'lucide-react'
import * as gtag from '@/lib/analytics/gtag'

export default function ProductListingClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  
  // Get filters from URL
  const categoryFilter = searchParams.get('categoria')
  const sortBy = searchParams.get('ordenar') || 'newest'
  const minPrice = searchParams.get('preco_min')
  const maxPrice = searchParams.get('preco_max')
  const customizable = searchParams.get('personalizavel')

  useEffect(() => {
    console.log('🔄 ProductListingClient: useEffect triggered')
    fetchCategories()
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, sortBy, minPrice, maxPrice, customizable])

  async function fetchCategories() {
    console.log('📋 Fetching categories...')
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('name')

    if (error) {
      console.error('❌ Error fetching categories:', error)
    } else if (data) {
      console.log('✅ Categories loaded:', data.length)
      setCategories(data)
    }
  }

  async function fetchProducts() {
    console.log('📦 Fetching products...')
    console.log('🔧 Filters:', { categoryFilter, sortBy, minPrice, maxPrice, customizable })
    setLoading(true)

    try {
      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          images:product_images(*)
        `)
        .eq('is_active', true)

      // Apply filters
      if (categoryFilter) {
        query = query.eq('category_id', categoryFilter)
      }

      if (minPrice) {
        query = query.gte('base_price', parseFloat(minPrice))
      }

      if (maxPrice) {
        query = query.lte('base_price', parseFloat(maxPrice))
      }

      if (customizable === 'true') {
        query = query.eq('is_customizable', true)
      }

      // Apply sorting
      switch (sortBy) {
        case 'price_asc':
          query = query.order('base_price', { ascending: true })
          break
        case 'price_desc':
          query = query.order('base_price', { ascending: false })
          break
        case 'name':
          query = query.order('name')
          break
        default: // newest
          query = query.order('created_at', { ascending: false })
      }

      const { data, error } = await query

      if (error) {
        console.error('❌ Error fetching products:', error)
        console.error('❌ Error details:', JSON.stringify(error, null, 2))
      } else if (data) {
        console.log('✅ Products loaded:', data.length)
        console.log('📦 First product:', data[0])
        setProducts(data as Product[])

        // Track view_item_list event
        if (data.length > 0) {
          gtag.viewItemList(data, 'Product Listing Page')
        }
      } else {
        console.warn('⚠️ No products returned from query')
      }
    } catch (err) {
      console.error('❌ Exception in fetchProducts:', err)
    } finally {
      setLoading(false)
      console.log('✅ Loading complete')
    }
  }

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    
    router.push(`/produtos?${params.toString()}`)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn-outline w-full flex items-center justify-center gap-2"
        >
          <SlidersHorizontal className="h-5 w-5" />
          Filtros
        </button>
      </div>

      {/* Filters Sidebar */}
      <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
        <ProductFilters
          categories={categories}
          selectedCategory={categoryFilter}
          sortBy={sortBy}
          minPrice={minPrice}
          maxPrice={maxPrice}
          customizable={customizable === 'true'}
          onFilterChange={updateFilters}
        />
      </div>

      {/* Products Grid */}
      <div className="lg:col-span-3">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-brand-gray-dark">
            <span className="font-semibold">{products.length}</span> produto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
          </p>
          
          {/* Sort Dropdown (Mobile) */}
          <select
            value={sortBy}
            onChange={(e) => updateFilters('ordenar', e.target.value)}
            className="input-field py-2 lg:hidden"
          >
            <option value="newest">Mais recentes</option>
            <option value="price_asc">Preço: Baixo → Alto</option>
            <option value="price_desc">Preço: Alto → Baixo</option>
            <option value="name">Nome A-Z</option>
          </select>
        </div>

        {/* Products */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-brand-gray-dark/70">Nenhum produto encontrado</p>
            <button
              onClick={() => router.push('/produtos')}
              className="btn-outline mt-4"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index === 0} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

