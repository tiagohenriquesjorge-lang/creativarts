'use client'

import { useCartStore } from '@/store/cartStore'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils/format'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Sparkles, Type, Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'

export default function CartPageClient() {
  const { items, removeItem, updateQuantity, applyCoupon, removeCoupon, coupon, discount, getSubtotal, getTotal } = useCartStore()
  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')
  const [isApplying, setIsApplying] = useState(false)

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Introduza um código de cupão')
      return
    }

    setIsApplying(true)
    setCouponError('')

    const result = await applyCoupon(couponCode)

    setIsApplying(false)

    if (result.success) {
      setCouponCode('')
      setCouponError('')
    } else {
      setCouponError(result.error || 'Cupão inválido')
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-brand-gray-light rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="h-12 w-12 text-brand-gray-dark/30" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-brand-gray-dark mb-4">
          O seu carrinho está vazio
        </h2>
        <p className="text-brand-gray-dark/70 mb-8">
          Adicione produtos ao carrinho para continuar
        </p>
        <Link href="/produtos" className="btn-primary inline-flex items-center gap-2">
          Ver Produtos
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    )
  }

  const subtotal = getSubtotal()
  const total = getTotal()
  const shipping = total >= 50 ? 0 : 5.99

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex gap-4">
              {/* Image */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 relative rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item.product.images?.[0]?.url || '/placeholder.png'}
                  alt={item.product.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-4 mb-2">
                  <div>
                    <Link
                      href={`/produtos/${item.product.slug}`}
                      className="font-semibold text-brand-gray-dark hover:text-primary line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                    {item.variant && (
                      <p className="text-sm text-brand-gray-dark/70 mt-1">
                        {item.variant.name}
                      </p>
                    )}
                    {item.customization && (
                      <div className="mt-2 p-3 bg-gradient-to-r from-brand-yellow/10 to-brand-blue/10 rounded-lg border border-brand-yellow/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-brand-blue" />
                          <p className="font-semibold text-brand-gray-dark text-sm">Personalizado</p>
                        </div>
                        {item.customization.text && (
                          <div className="flex items-start gap-2 text-sm mb-1">
                            <Type className="h-4 w-4 text-brand-gray-dark/60 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-brand-gray-dark/70">
                                <span className="font-medium">Texto:</span> "{item.customization.text}"
                              </p>
                              {item.customization.text_position && (
                                <p className="text-brand-gray-dark/60 text-xs">
                                  Posição: {item.customization.text_position}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                        {item.customization.image_url && (
                          <div className="flex items-center gap-2 text-sm">
                            <ImageIcon className="h-4 w-4 text-brand-gray-dark/60 flex-shrink-0" />
                            <p className="text-brand-gray-dark/70">
                              <span className="font-medium">Imagem personalizada</span>
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-brand-gray-dark/50 hover:text-primary transition-colors flex-shrink-0"
                    aria-label="Remover produto"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                {/* Quantity and Price */}
                <div className="flex items-center justify-between mt-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 rounded border-2 border-brand-gray-dark/20 hover:border-primary flex items-center justify-center"
                      aria-label="Diminuir quantidade"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded border-2 border-brand-gray-dark/20 hover:border-primary flex items-center justify-center"
                      aria-label="Aumentar quantidade"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <p className="text-sm text-brand-gray-dark/70">
                      {formatPrice(item.price)} cada
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Continue Shopping */}
        <Link
          href="/produtos"
          className="inline-flex items-center gap-2 text-brand-blue hover:underline"
        >
          ← Continuar a comprar
        </Link>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
          <h2 className="text-xl font-heading font-bold text-brand-gray-dark mb-6">
            Resumo da Encomenda
          </h2>

          {/* Coupon */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-brand-gray-dark mb-2">
              Cupão de Desconto
            </label>
            {coupon ? (
              <div className="flex items-center justify-between p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-green-600" />
                  <div>
                    <span className="font-semibold text-green-900">{coupon.code}</span>
                    <p className="text-xs text-green-700">
                      {coupon.type === 'percentage'
                        ? `${coupon.value}% de desconto`
                        : `€${coupon.value.toFixed(2)} de desconto`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-sm text-green-700 hover:underline"
                >
                  Remover
                </button>
              </div>
            ) : (
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value.toUpperCase())
                      setCouponError('')
                    }}
                    placeholder="Código do cupão"
                    className="input-field flex-1"
                    disabled={isApplying}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="btn-outline px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isApplying}
                  >
                    {isApplying ? 'A validar...' : 'Aplicar'}
                  </button>
                </div>
                {couponError && (
                  <p className="text-sm text-red-600 mt-1">{couponError}</p>
                )}
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="space-y-3 mb-6 pb-6 border-b border-brand-gray-light">
            <div className="flex justify-between text-brand-gray-dark">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between text-brand-yellow">
                <span>Desconto</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-brand-gray-dark">
              <span>Envio</span>
              <span>{shipping === 0 ? 'Grátis' : formatPrice(shipping)}</span>
            </div>
            
            {shipping > 0 && total < 50 && (
              <p className="text-sm text-brand-gray-dark/70">
                Faltam {formatPrice(50 - total)} para envio grátis!
              </p>
            )}
          </div>

          <div className="flex justify-between text-xl font-bold text-brand-gray-dark mb-6">
            <span>Total</span>
            <span className="text-primary">{formatPrice(total + shipping)}</span>
          </div>

          {/* Checkout Button */}
          <Link href="/checkout" className="btn-primary w-full block text-center mb-3">
            Finalizar Compra
          </Link>

          {/* Trust Badges */}
          <div className="text-center text-sm text-brand-gray-dark/70">
            <p>✓ Pagamento 100% seguro</p>
            <p>✓ Envio grátis acima de 50€</p>
            <p>✓ Devoluções em 30 dias</p>
          </div>
        </div>
      </div>
    </div>
  )
}

