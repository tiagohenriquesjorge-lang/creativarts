import Link from 'next/link'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0]
  const formattedPrice = new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(product.base_price)

  return (
    <article className="card group overflow-hidden">
      <Link href={`/produtos/${product.slug}`} className="block focus-visible-ring rounded-lg">
        {/* Image Container */}
        <div className="relative w-full h-64 bg-brand-gray-light overflow-hidden">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt_text}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority={priority}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-yellow/20 to-brand-blue/20">
              <span className="text-brand-gray-dark/40 text-sm">Sem imagem</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.is_customizable && (
              <span className="badge-customizable shadow-md">
                <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
                Personalizável
              </span>
            )}
            {product.tags.includes('novo') && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white shadow-md">
                Novo
              </span>
            )}
            {product.tags.includes('bestseller') && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-white shadow-md">
                Bestseller
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-heading font-semibold text-lg text-brand-gray-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          {product.short_description && (
            <p className="text-sm text-brand-gray-dark/60 mb-3 line-clamp-2">
              {product.short_description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-brand-red">
              {formattedPrice}
            </span>
            
            <span className="text-sm text-brand-blue font-medium group-hover:underline">
              Ver detalhes →
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

