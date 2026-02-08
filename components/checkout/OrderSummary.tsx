'use client'

import Image from 'next/image'
import { formatPrice } from '@/lib/utils/format'
import type { CartItem } from '@/types'
import type { Coupon } from '@/lib/services/couponService'
import { Sparkles, Tag } from 'lucide-react'
import { useState } from 'react'

interface OrderSummaryProps {
  items: CartItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  coupon?: Coupon
  onApplyCoupon: (code: string) => Promise<{ success: boolean; error?: string }>
  onRemoveCoupon: () => void
}

export default function OrderSummary({
  items,
  subtotal,
  shipping,
  discount,
  total,
  coupon,
  onApplyCoupon,
  onRemoveCoupon,
}: OrderSummaryProps) {
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

    const result = await onApplyCoupon(couponCode)

    setIsApplying(false)

    if (result.success) {
      setCouponCode('')
      setCouponError('')
    } else {
      setCouponError(result.error || 'Cupão inválido')
    }
  }

  return (
    <div className="bg-brand-gray-light/30 rounded-lg p-6 sticky top-4">
      <h2 className="text-xl font-heading font-bold text-brand-gray-dark mb-4">
        Resumo do Pedido
      </h2>

      {/* Items */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0 bg-white">
              <Image
                src={item.product.images?.[0]?.url || '/placeholder.png'}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-brand-gray-dark line-clamp-2">
                {item.product.name}
              </p>
              {item.variant && (
                <p className="text-xs text-brand-gray-dark/60 mt-0.5">
                  {item.variant.name}
                </p>
              )}
              {item.customization && (
                <div className="flex items-center gap-1 mt-1">
                  <Sparkles className="h-3 w-3 text-brand-blue" />
                  <span className="text-xs text-brand-blue font-medium">
                    Personalizado
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-brand-gray-dark/60">
                  Qtd: {item.quantity}
                </span>
                <span className="text-sm font-semibold text-brand-gray-dark">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon Section */}
      <div className="border-t-2 border-brand-gray-light pt-4 mb-4">
        <label className="block text-sm font-semibold text-brand-gray-dark mb-2">
          Cupão de Desconto
        </label>
        {coupon ? (
          <div className="flex items-center justify-between p-3 bg-green-50 border-2 border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-green-600" />
              <div>
                <span className="font-semibold text-green-900 text-sm">{coupon.code}</span>
                <p className="text-xs text-green-700">
                  {coupon.type === 'percentage'
                    ? `${coupon.value}% de desconto`
                    : `€${coupon.value.toFixed(2)} de desconto`}
                </p>
              </div>
            </div>
            <button
              onClick={onRemoveCoupon}
              className="text-xs text-green-700 hover:underline"
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
                className="input-field flex-1 text-sm"
                disabled={isApplying}
              />
              <button
                onClick={handleApplyCoupon}
                className="btn-outline px-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isApplying}
              >
                {isApplying ? 'A validar...' : 'Aplicar'}
              </button>
            </div>
            {couponError && (
              <p className="text-xs text-red-600 mt-1">{couponError}</p>
            )}
          </div>
        )}
      </div>

      {/* Totals */}
      <div className="border-t-2 border-brand-gray-light pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-brand-gray-dark/70">Subtotal</span>
          <span className="font-medium text-brand-gray-dark">
            {formatPrice(subtotal)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-brand-gray-dark/70">Desconto</span>
            <span className="font-medium text-green-600">
              -{formatPrice(discount)}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-brand-gray-dark/70">Envio</span>
          <span className="font-medium text-brand-gray-dark">
            {shipping === 0 ? (
              <span className="text-green-600">Grátis</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>

        <div className="border-t-2 border-brand-gray-light pt-3 flex justify-between">
          <span className="text-lg font-heading font-bold text-brand-gray-dark">
            Total
          </span>
          <span className="text-lg font-heading font-bold text-brand-red">
            {formatPrice(total + shipping)}
          </span>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-6 pt-6 border-t-2 border-brand-gray-light space-y-2">
        <div className="flex items-center gap-2 text-sm text-brand-gray-dark/70">
          <span className="text-green-500">✓</span>
          <span>Pagamento 100% seguro</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-brand-gray-dark/70">
          <span className="text-green-500">✓</span>
          <span>Devoluções em 30 dias</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-brand-gray-dark/70">
          <span className="text-green-500">✓</span>
          <span>Suporte ao cliente 24/7</span>
        </div>
      </div>
    </div>
  )
}

