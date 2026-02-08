import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import ProductDetailClient from '@/components/products/ProductDetailClient'
import type { Product } from '@/types'

interface ProductPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single()

  if (!product) {
    return {
      title: 'Produto não encontrado',
    }
  }

  return {
    title: product.name,
    description: product.description || `${product.name} - Produto personaliz\u00e1vel da CreativART's`,
    openGraph: {
      title: product.name,
      description: product.description || '',
      images: product.images?.[0]?.url ? [product.images[0].url] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Fetch product data
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      images:product_images(*),
      variants:product_variants(*)
    `)
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single()

  if (error || !product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-brand-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductDetailClient product={product as Product} />
      </div>
    </div>
  )
}

