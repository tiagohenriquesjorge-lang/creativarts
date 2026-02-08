'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, ShoppingBag, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

interface MiniCartProps {
  isOpen: boolean
  onClose: () => void
}

export default function MiniCart({ isOpen, onClose }: MiniCartProps) {
  const { items, removeItem, updateQuantity, getSubtotal, getTotal } = useCartStore()

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const subtotal = getSubtotal()
  const total = getTotal()

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-slide-down"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brand-gray-light">
          <h2 id="cart-title" className="text-xl font-heading font-bold text-brand-gray-dark">
            Carrinho de Compras
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-brand-gray-light rounded-lg transition-colors focus-visible-ring"
            aria-label="Fechar carrinho"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-brand-gray-dark/20 mb-4" aria-hidden="true" />
              <p className="text-brand-gray-dark/60 mb-4">O seu carrinho está vazio</p>
              <button onClick={onClose} className="btn-primary">
                Continuar a Comprar
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const primaryImage = item.product.images?.find((img) => img.is_primary) || item.product.images?.[0]
                const itemTotal = item.price * item.quantity

                return (
                  <li key={item.id} className="flex gap-4 pb-4 border-b border-brand-gray-light">
                    {/* Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 bg-brand-gray-light rounded-lg overflow-hidden">
                      {primaryImage && (
                        <Image
                          src={primaryImage.url}
                          alt={primaryImage.alt_text}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-brand-gray-dark text-sm mb-1 truncate">
                        {item.product.name}
                      </h3>
                      {item.variant && (
                        <p className="text-xs text-brand-gray-dark/60 mb-1">
                          {item.variant.name}
                        </p>
                      )}
                      {item.customization?.text && (
                        <p className="text-xs text-brand-gray-dark/60 mb-1">
                          Texto: "{item.customization.text}"
                        </p>
                      )}
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center border border-brand-gray-dark/20 rounded hover:bg-brand-gray-light transition-colors focus-visible-ring"
                          aria-label="Diminuir quantidade"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center border border-brand-gray-dark/20 rounded hover:bg-brand-gray-light transition-colors focus-visible-ring"
                          aria-label="Aumentar quantidade"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 hover:text-primary transition-colors focus-visible-ring rounded"
                        aria-label="Remover item"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <span className="font-semibold text-brand-red">
                        {new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(itemTotal)}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-brand-gray-light p-6 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span className="text-brand-red">
                {new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(total)}
              </span>
            </div>
            
            <Link href="/checkout" onClick={onClose} className="btn-primary w-full block text-center">
              Finalizar Compra
            </Link>
            
            <Link href="/carrinho" onClick={onClose} className="btn-outline w-full block text-center">
              Ver Carrinho
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

