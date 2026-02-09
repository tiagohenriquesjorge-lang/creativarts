'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import CustomerAuthGuard from '@/components/auth/CustomerAuthGuard'
import { getCurrentUser } from '@/lib/auth/customerAuth'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Package, MapPin, CreditCard, Calendar, User as UserIcon } from 'lucide-react'
import { useToastStore } from '@/store/toastStore'

export default function OrderDetailPage() {
  return (
    <CustomerAuthGuard>
      <OrderDetailContent />
    </CustomerAuthGuard>
  )
}

function OrderDetailContent() {
  const params = useParams()
  const router = useRouter()
  const toast = useToastStore()

  const [order, setOrder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadOrder()
  }, [params.id])

  const loadOrder = async () => {
    const user = await getCurrentUser()
    if (!user) return

    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            product:products (
              id,
              name,
              images:product_images (url)
            ),
            variant:product_variants (
              id,
              name
            )
          )
        `)
        .eq('id', params.id)
        .eq('customer_email', user.email)
        .single()

      if (error) {
        console.error('Error loading order:', error)
        toast.error('Encomenda não encontrada')
        router.push('/encomendas')
        return
      }

      setOrder(data)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Erro ao carregar encomenda')
      router.push('/encomendas')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; color: string }> = {
      new: { label: 'Nova', color: 'bg-blue-100 text-blue-800' },
      paid: { label: 'Paga', color: 'bg-green-100 text-green-800' },
      processing: { label: 'A Processar', color: 'bg-yellow-100 text-yellow-800' },
      shipped: { label: 'Enviada', color: 'bg-purple-100 text-purple-800' },
      delivered: { label: 'Entregue', color: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Cancelada', color: 'bg-red-100 text-red-800' },
    }

    const config = statusConfig[status] || { label: status, color: 'bg-gray-100 text-gray-800' }

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-brand-blue border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!order) {
    return null
  }

  return (
    <div className="min-h-screen bg-brand-gray-light/30 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/encomendas"
          className="inline-flex items-center gap-2 text-brand-blue hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar às encomendas
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg border-2 border-brand-gray-light p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-brand-gray-dark mb-2">
                Encomenda #{order.order_number}
              </h1>
              <div className="flex items-center gap-2 text-sm text-brand-gray-dark/70">
                <Calendar className="h-4 w-4" />
                {formatDate(order.created_at)}
              </div>
            </div>
            {getStatusBadge(order.status)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items */}
            <div className="bg-white rounded-lg border-2 border-brand-gray-light p-6">
              <h2 className="text-xl font-heading font-bold text-brand-gray-dark mb-4 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Produtos
              </h2>

              <div className="space-y-4">
                {order.order_items?.map((item: any) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-brand-gray-light last:border-0 last:pb-0">
                    {/* Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 bg-brand-gray-light rounded-lg overflow-hidden">
                      {item.product?.images?.[0]?.url ? (
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-8 w-8 text-brand-gray-dark/30" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-brand-gray-dark mb-1">
                        {item.product?.name || 'Produto'}
                      </h3>
                      {item.variant?.name && (
                        <p className="text-sm text-brand-gray-dark/70 mb-1">
                          Variante: {item.variant.name}
                        </p>
                      )}
                      {item.customization && (
                        <div className="mt-2 p-2 bg-brand-yellow/10 rounded text-xs">
                          <p className="font-semibold text-brand-gray-dark mb-1">✨ Personalizado</p>
                          {item.customization.text && (
                            <p className="text-brand-gray-dark/70">
                              Texto: "{item.customization.text}"
                            </p>
                          )}
                        </div>
                      )}
                      <p className="text-sm text-brand-gray-dark/70 mt-2">
                        Quantidade: {item.quantity}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-semibold text-brand-gray-dark">
                        €{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-brand-gray-dark/60">
                        €{item.price.toFixed(2)} cada
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg border-2 border-brand-gray-light p-6">
              <h2 className="text-xl font-heading font-bold text-brand-gray-dark mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Morada de Envio
              </h2>

              <div className="space-y-1 text-brand-gray-dark/80">
                <p className="font-semibold">{order.customer_name}</p>
                <p>{order.shipping_address?.address}</p>
                <p>
                  {order.shipping_address?.postal_code} {order.shipping_address?.city}
                </p>
                <p>{order.shipping_address?.country}</p>
                {order.shipping_address?.notes && (
                  <p className="mt-3 text-sm italic text-brand-gray-dark/60">
                    Notas: {order.shipping_address.notes}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-lg border-2 border-brand-gray-light p-6">
              <h2 className="text-lg font-heading font-bold text-brand-gray-dark mb-4 flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Cliente
              </h2>

              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-brand-gray-dark/60">Nome</p>
                  <p className="font-medium text-brand-gray-dark">{order.customer_name}</p>
                </div>
                <div>
                  <p className="text-brand-gray-dark/60">Email</p>
                  <p className="font-medium text-brand-gray-dark">{order.customer_email}</p>
                </div>
                {order.customer_phone && (
                  <div>
                    <p className="text-brand-gray-dark/60">Telefone</p>
                    <p className="font-medium text-brand-gray-dark">{order.customer_phone}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-lg border-2 border-brand-gray-light p-6">
              <h2 className="text-lg font-heading font-bold text-brand-gray-dark mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Pagamento
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-brand-gray-dark/70">Subtotal</span>
                  <span className="font-medium text-brand-gray-dark">
                    €{(order.total_amount - (order.shipping_cost || 0) + (order.discount_amount || 0)).toFixed(2)}
                  </span>
                </div>

                {order.discount_amount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto</span>
                    <span className="font-medium">-€{order.discount_amount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-brand-gray-dark/70">Envio</span>
                  <span className="font-medium text-brand-gray-dark">
                    {order.shipping_cost > 0 ? `€${order.shipping_cost.toFixed(2)}` : 'Grátis'}
                  </span>
                </div>

                <div className="border-t-2 border-brand-gray-light pt-3 flex justify-between">
                  <span className="font-bold text-brand-gray-dark">Total</span>
                  <span className="font-bold text-brand-blue text-lg">
                    €{order.total_amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

