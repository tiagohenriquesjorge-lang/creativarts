'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, Mail, Home } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import * as gtag from '@/lib/analytics/gtag'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const [orderNumber, setOrderNumber] = useState('')
  const [tracked, setTracked] = useState(false)
  const { items, coupon, getTotal, clearCart } = useCartStore()

  useEffect(() => {
    // Generate order number
    const sessionId = searchParams.get('session_id')
    const number = sessionId ? `CR-${sessionId.slice(-8)}` : `CR-${Date.now().toString().slice(-8)}`
    setOrderNumber(number)

    // Track purchase event (only once)
    if (!tracked && items.length > 0) {
      const total = getTotal()
      gtag.purchase(number, items, total, coupon?.code)
      setTracked(true)
    }

    // Clear cart after tracking
    if (items.length > 0) {
      clearCart()
    }
  }, [searchParams, items, coupon, getTotal, clearCart, tracked])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4 animate-bounce">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-gray-dark mb-2">
              🎉 Pedido Realizado com Sucesso!
            </h1>
            
            <p className="text-lg text-brand-gray-dark/70">
              Obrigado pela sua compra na CreativART's!
            </p>
          </div>

          {/* Order Number */}
          <div className="bg-white rounded-lg border-2 border-green-200 p-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-brand-gray-dark/70 mb-1">
                Número do Pedido
              </p>
              <p className="text-2xl font-heading font-bold text-brand-gray-dark">
                {orderNumber}
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-lg border-2 border-brand-gray-light p-6 mb-6">
            <h2 className="text-xl font-heading font-bold text-brand-gray-dark mb-4">
              Próximos Passos
            </h2>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-blue/10 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-1">
                    1. Confirmação por Email
                  </h3>
                  <p className="text-sm text-brand-gray-dark/70">
                    Receberá um email de confirmação com os detalhes do seu pedido nos próximos minutos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-yellow/10 rounded-full flex items-center justify-center">
                  <Package className="h-5 w-5 text-brand-yellow" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-1">
                    2. Preparação do Pedido
                  </h3>
                  <p className="text-sm text-brand-gray-dark/70">
                    A nossa equipa irá preparar o seu pedido com todo o cuidado. Produtos personalizados podem demorar 2-3 dias úteis.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-red/10 rounded-full flex items-center justify-center">
                  <Home className="h-5 w-5 text-brand-red" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-1">
                    3. Entrega
                  </h3>
                  <p className="text-sm text-brand-gray-dark/70">
                    O seu pedido será entregue em 3-5 dias úteis. Receberá um código de rastreamento assim que for enviado.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Info */}
          <div className="bg-brand-blue/5 rounded-lg p-6 mb-6">
            <h3 className="font-heading font-bold text-brand-gray-dark mb-2">
              Precisa de Ajuda?
            </h3>
            <p className="text-sm text-brand-gray-dark/70 mb-3">
              A nossa equipa está disponível 24/7 para ajudar com qualquer questão sobre o seu pedido.
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="text-brand-gray-dark/70">📧 suporte@creativarts.pt</span>
              <span className="text-brand-gray-dark/70">•</span>
              <span className="text-brand-gray-dark/70">📱 +351 912 345 678</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/produtos"
              className="btn-primary flex-1 text-center"
            >
              Continuar a Comprar
            </Link>
            <Link
              href="/"
              className="btn-outline flex-1 text-center"
            >
              Voltar ao Início
            </Link>
          </div>

          {/* Social Share */}
          <div className="mt-8 text-center">
            <p className="text-sm text-brand-gray-dark/70 mb-3">
              Adorou a experiência? Partilhe connosco! 💛
            </p>
            <div className="flex justify-center gap-3">
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📸</span>
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">💬</span>
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">⭐</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

