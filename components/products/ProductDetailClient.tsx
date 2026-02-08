'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useToastStore } from '@/store/toastStore'
import type { Product, ProductVariant, CartItemCustomization } from '@/types'
import { formatPrice } from '@/lib/utils/format'
import { ShoppingCart, Heart, Share2, Truck, RotateCcw, Shield, ChevronLeft, Sparkles } from 'lucide-react'
import TextCustomization from '@/components/customization/TextCustomization'
import ImageUpload from '@/components/customization/ImageUpload'
import ProductPreview from '@/components/customization/ProductPreview'
import * as gtag from '@/lib/analytics/gtag'

interface ProductDetailClientProps {
  product: Product
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null
  )
  const [quantity, setQuantity] = useState(1)
  const [showCustomization, setShowCustomization] = useState(false)

  // Customization state
  const [customization, setCustomization] = useState<CartItemCustomization>({
    text: '',
    text_position: 'frente',
    image_url: undefined,
    image_file: undefined,
  })

  const addItem = useCartStore((state) => state.addItem)
  const toast = useToastStore()

  // Customization handlers
  const handleTextChange = (text: string, position?: string) => {
    setCustomization(prev => ({
      ...prev,
      text,
      text_position: position || prev.text_position,
    }))
  }

  const handleImageChange = (imageUrl: string | null, file: File | null) => {
    setCustomization(prev => ({
      ...prev,
      image_url: imageUrl || undefined,
      image_file: file || undefined,
    }))
  }

  const handleAddToCart = () => {
    // Prepare customization data (only if product is customizable and has customization)
    const hasCustomization = product.is_customizable && (customization.text || customization.image_url)
    const customizationData = hasCustomization ? customization : undefined

    addItem(
      product,
      selectedVariant || undefined,
      quantity,
      customizationData
    )

    // Track add to cart event
    gtag.addToCart(product, selectedVariant || undefined, quantity, customizationData)

    // Show success toast
    if (hasCustomization) {
      toast.success('✨ Produto personalizado adicionado ao carrinho!')
    } else {
      toast.success('🛒 Produto adicionado ao carrinho!')
    }
  }

  // Track view_item event on mount
  useEffect(() => {
    gtag.viewItem(product)
  }, [product])

  const images = product.images || []
  const currentPrice = selectedVariant
    ? product.base_price + selectedVariant.price_adjustment
    : product.base_price
  const hasCustomization = customization.text || customization.image_url

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-brand-gray-dark/70 mb-6">
        <Link href="/" className="hover:text-primary">Início</Link>
        <span>/</span>
        <Link href="/produtos" className="hover:text-primary">Produtos</Link>
        <span>/</span>
        <Link href={`/produtos?categoria=${product.category_id}`} className="hover:text-primary">
          {product.category?.name}
        </Link>
        <span>/</span>
        <span className="text-brand-gray-dark">{product.name}</span>
      </nav>

      {/* Back Button */}
      <Link
        href="/produtos"
        className="inline-flex items-center gap-2 text-brand-blue hover:underline mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar aos produtos
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images Gallery */}
        <div>
          {/* Main Image */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
            <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
              {images.length > 0 ? (
                <Image
                  src={images[selectedImage]?.url || '/placeholder.png'}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-brand-gray-light">
                  <span className="text-brand-gray-dark/50">Sem imagem</span>
                </div>
              )}

              {product.is_customizable && (
                <div className="absolute top-4 right-4">
                  <span className="badge-customizable">Personalizável</span>
                </div>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-full h-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-transparent hover:border-brand-gray-dark/20'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={`${product.name} - ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 25vw, 12vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-brand-gray-dark mb-4">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mb-6">
            <p className="text-3xl font-bold text-primary">
              {formatPrice(currentPrice)}
            </p>
            {product.is_customizable && (
              <p className="text-sm text-brand-gray-dark/70 mt-1">
                + custo de personalização (se aplicável)
              </p>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div className="mb-6">
              <p className="text-brand-gray-dark leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <label className="block font-semibold text-brand-gray-dark mb-3">
                Opções:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={variant.stock_quantity === 0}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedVariant?.id === variant.id
                        ? 'border-primary bg-primary text-white'
                        : variant.stock_quantity === 0
                        ? 'border-brand-gray-light bg-brand-gray-light text-brand-gray-dark/50 cursor-not-allowed'
                        : 'border-brand-gray-dark/20 hover:border-primary'
                    }`}
                  >
                    {variant.name}
                    {variant.stock_quantity === 0 && ' (Esgotado)'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="block font-semibold text-brand-gray-dark mb-3">
              Quantidade:
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border-2 border-brand-gray-dark/20 hover:border-primary flex items-center justify-center"
              >
                -
              </button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border-2 border-brand-gray-dark/20 hover:border-primary flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Customization Toggle */}
          {product.is_customizable && (
            <div className="mb-6">
              <button
                onClick={() => setShowCustomization(!showCustomization)}
                className={`
                  w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all
                  ${showCustomization
                    ? 'border-brand-blue bg-brand-blue/5'
                    : 'border-brand-gray-light hover:border-brand-blue'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-brand-blue" />
                  <span className="font-semibold text-brand-gray-dark">
                    Personalizar este produto
                  </span>
                </div>
                <span className="text-sm text-brand-gray-dark/60">
                  {showCustomization ? '▼' : '▶'}
                </span>
              </button>

              {showCustomization && (
                <div className="mt-4 p-6 bg-brand-gray-light/30 rounded-lg border-2 border-brand-gray-light space-y-6">
                  {/* Text Customization */}
                  {product.customization_options?.allow_text && (
                    <TextCustomization
                      maxLength={product.customization_options.max_text_length}
                      positions={product.customization_options.text_positions}
                      value={customization.text || ''}
                      onChange={handleTextChange}
                    />
                  )}

                  {/* Image Upload */}
                  {product.customization_options?.allow_image_upload && (
                    <ImageUpload
                      maxSizeMB={product.customization_options.max_image_size_mb}
                      allowedFormats={product.customization_options.allowed_image_formats}
                      value={customization.image_url || null}
                      onChange={handleImageChange}
                    />
                  )}

                  {/* Product Preview */}
                  {(customization.text || customization.image_url) && (
                    <ProductPreview
                      productImage={images[0]?.url || '/placeholder.png'}
                      customText={customization.text}
                      customTextPosition={customization.text_position}
                      customImage={customization.image_url}
                      productName={product.name}
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Add to Cart */}
          <div className="space-y-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant && product.variants && product.variants.length > 0}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              {hasCustomization ? 'Adicionar Produto Personalizado' : 'Adicionar ao Carrinho'}
            </button>

            {product.is_customizable && !showCustomization && (
              <p className="text-sm text-center text-brand-gray-dark/60">
                💡 Clique em "Personalizar" para adicionar texto ou imagem
              </p>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 p-4 bg-brand-gray-light rounded-lg">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm">Envio grátis +50€</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-primary" />
              <span className="text-sm">Devoluções 30 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">Pagamento seguro</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="btn-outline flex-1 flex items-center justify-center gap-2">
              <Heart className="h-5 w-5" />
              Favoritos
            </button>
            <button className="btn-outline flex-1 flex items-center justify-center gap-2">
              <Share2 className="h-5 w-5" />
              Partilhar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

