import { Metadata } from 'next'
import { Suspense } from 'react'
import ProductListingClient from '@/components/products/ProductListingClient'

export const metadata: Metadata = {
  title: 'Produtos Personalizados',
  description: 'Explore a nossa coleção de produtos personalizáveis: t-shirts, bonés, porta-chaves, canetas e impressões 3D.',
  openGraph: {
    title: 'Produtos Personalizados | CreativART\'s',
    description: 'Explore a nossa coleção de produtos personalizáveis',
  },
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-brand-gray-light">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-yellow via-brand-blue to-brand-red py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-heading font-bold text-white mb-4">
            Produtos Personalizados
          </h1>
          <p className="text-lg text-white/90">
            Descubra produtos únicos e personalize ao seu gosto
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<ProductListingSkeleton />}>
          <ProductListingClient />
        </Suspense>
      </div>
    </div>
  )
}

// Loading skeleton
function ProductListingSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Skeleton */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="h-6 bg-brand-gray-light rounded animate-pulse" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-brand-gray-light rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Products Skeleton */}
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-square bg-brand-gray-light animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-brand-gray-light rounded animate-pulse" />
                <div className="h-6 bg-brand-gray-light rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

