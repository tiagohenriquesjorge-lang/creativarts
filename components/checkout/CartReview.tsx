'use client'

import Image from 'next/image'
import { CartItem } from '@/types'
import { Trash2, Plus, Minus, Package } from 'lucide-react'

interface CartReviewProps {
  items: CartItem[]
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
}

export default function CartReview({ items, onUpdateQuantity, onRemoveItem }: CartReviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-brand-gray-dark mb-2">
          Reveja o seu Carrinho
        </h2>
        <p className="text-brand-gray-dark/70">
          Confirme os produtos antes de continuar
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 p-4 bg-white rounded-lg border-2 border-brand-gray-light hover:border-brand-blue/30 transition-colors"
          >
            {/* Product Image */}
            <div className="relative w-20 h-20 flex-shrink-0 bg-brand-gray-light rounded-lg overflow-hidden">
              {item.product.images && item.product.images.length > 0 ? (
                <Image
                  src={item.product.images[0].url}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-brand-gray-dark/30">
                  <Package className="w-8 h-8" />
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-brand-gray-dark mb-1 truncate">
                {item.product.name}
              </h3>

              {item.variant?.name && (
                <p className="text-sm text-brand-gray-dark/70 mb-1">
                  Variante: {item.variant.name}
                </p>
              )}

              {item.customization && (
                <div className="mt-2 p-2 bg-brand-yellow/10 rounded text-xs">
                  <p className="font-semibold text-brand-gray-dark mb-1">
                    ✨ Personalizado
                  </p>
                  {item.customization.text && (
                    <p className="text-brand-gray-dark/70">
                      Texto: "{item.customization.text}"
                      {item.customization.text_position && ` (${item.customization.text_position})`}
                    </p>
                  )}
                  {item.customization.image_url && (
                    <p className="text-brand-gray-dark/70">
                      Com imagem personalizada
                    </p>
                  )}
                </div>
              )}

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-2 bg-brand-gray-light rounded-lg p-1">
                  <button
                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="p-1 hover:bg-white rounded transition-colors"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="w-4 h-4 text-brand-gray-dark" />
                  </button>
                  <span className="w-8 text-center font-semibold text-brand-gray-dark">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-white rounded transition-colors"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="w-4 h-4 text-brand-gray-dark" />
                  </button>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-brand-red hover:bg-brand-red/10 rounded-lg transition-colors"
                  aria-label="Remover item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-brand-gray-dark">
                €{(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="text-sm text-brand-gray-dark/60 mt-1">
                €{item.price.toFixed(2)} cada
              </p>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-brand-gray-dark/60">
            O seu carrinho está vazio
          </p>
        </div>
      )}

      <div className="bg-brand-blue/5 rounded-lg p-4 text-sm text-brand-gray-dark/80">
        <p className="flex items-start gap-2">
          <span className="text-brand-blue mt-0.5">💡</span>
          <span>
            Pode alterar quantidades ou remover produtos antes de continuar para o checkout.
          </span>
        </p>
      </div>
    </div>
  )
}

