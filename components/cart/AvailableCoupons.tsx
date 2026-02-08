'use client'

import { Tag, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface CouponInfo {
  code: string
  description: string
  type: 'percentage' | 'fixed'
  value: number
  minPurchase?: number
}

const AVAILABLE_COUPONS: CouponInfo[] = [
  {
    code: 'WELCOME10',
    description: '10% de desconto na sua primeira compra',
    type: 'percentage',
    value: 10,
    minPurchase: 20,
  },
  {
    code: 'SUMMER5',
    description: '€5 de desconto em compras acima de €30',
    type: 'fixed',
    value: 5,
    minPurchase: 30,
  },
  {
    code: 'FIRSTORDER',
    description: '15% de desconto para novos clientes',
    type: 'percentage',
    value: 15,
    minPurchase: 25,
  },
]

interface AvailableCouponsProps {
  onApplyCoupon: (code: string) => void
}

export default function AvailableCoupons({ onApplyCoupon }: AvailableCouponsProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleApply = (code: string) => {
    onApplyCoupon(code)
  }

  return (
    <div className="bg-gradient-to-br from-brand-yellow/10 to-brand-blue/10 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="h-5 w-5 text-brand-yellow" />
        <h3 className="font-heading font-bold text-brand-gray-dark">
          Cupões Disponíveis
        </h3>
      </div>

      <div className="space-y-3">
        {AVAILABLE_COUPONS.map((coupon) => (
          <div
            key={coupon.code}
            className="bg-white rounded-lg p-4 border-2 border-brand-gray-light hover:border-brand-yellow transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <code className="px-2 py-1 bg-brand-yellow/20 text-brand-yellow font-bold text-sm rounded">
                    {coupon.code}
                  </code>
                  {coupon.type === 'percentage' ? (
                    <span className="text-xs text-brand-blue font-semibold">
                      {coupon.value}% OFF
                    </span>
                  ) : (
                    <span className="text-xs text-brand-blue font-semibold">
                      €{coupon.value} OFF
                    </span>
                  )}
                </div>
                <p className="text-sm text-brand-gray-dark/70 mb-1">
                  {coupon.description}
                </p>
                {coupon.minPurchase && (
                  <p className="text-xs text-brand-gray-dark/50">
                    Mínimo: €{coupon.minPurchase}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="p-2 hover:bg-brand-gray-light rounded transition-colors"
                  title="Copiar código"
                >
                  {copiedCode === coupon.code ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 text-brand-gray-dark/50" />
                  )}
                </button>
                <button
                  onClick={() => handleApply(coupon.code)}
                  className="text-xs text-brand-blue hover:underline font-semibold"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-brand-gray-dark/50 mt-4 text-center">
        💡 Dica: Apenas um cupão pode ser usado por encomenda
      </p>
    </div>
  )
}

