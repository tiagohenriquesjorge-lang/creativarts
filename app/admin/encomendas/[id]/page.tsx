'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { 
  ArrowLeft, 
  Package, 
  User, 
  MapPin, 
  CreditCard, 
  Printer,
  Download,
  Clock,
  Truck,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'

interface OrderItem {
  id: string
  product_name: string
  variant_name?: string
  quantity: number
  unit_price: number
  total_price: number
  customization?: {
    text?: string
    text_position?: string
    image_url?: string
  }
  product?: {
    id: string
    product_images: { url: string; is_primary: boolean }[]
  }
}

interface Order {
  id: string
  order_number: string
  status: string
  customer_name: string
  customer_email: string
  shipping_address: {
    full_name: string
    address_line1: string
    address_line2?: string
    city: string
    postal_code: string
    country: string
    phone: string
  }
  billing_address: {
    full_name: string
    address_line1: string
    address_line2?: string
    city: string
    postal_code: string
    country: string
  }
  payment_method: string
  payment_intent_id?: string
  subtotal: number
  discount: number
  shipping_cost: number
  tax: number
  total: number
  currency: string
  tracking_number?: string
  notes?: string
  created_at: string
  updated_at: string
  order_items: OrderItem[]
}

const STATUS_CONFIG = {
  new: { label: 'Nova', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Clock },
  paid: { label: 'Paga', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
  processing: { label: 'Processando', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Package },
  shipped: { label: 'Enviada', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: Truck },
  completed: { label: 'Concluída', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
  cancelled: { label: 'Cancelada', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
  refunded: { label: 'Reembolsada', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: XCircle },
}

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (params.id) {
      loadOrder()
    }
  }, [params.id])

  async function loadOrder() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            product:products (
              id,
              product_images (url, is_primary)
            )
          )
        `)
        .eq('id', params.id)
        .single()

      if (error) throw error

      setOrder(data)
    } catch (error) {
      console.error('Error loading order:', error)
      alert('Erro ao carregar encomenda')
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(newStatus: string) {
    if (!order) return
    
    setUpdating(true)
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', order.id)

      if (error) throw error

      setOrder({ ...order, status: newStatus })
      alert('Status atualizado com sucesso!')
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Erro ao atualizar status')
    } finally {
      setUpdating(false)
    }
  }

  function handlePrint() {
    window.print()
  }

  function exportOrderPDF() {
    // Implementação futura: gerar PDF
    alert('Funcionalidade de exportar PDF será implementada em breve')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Encomenda não encontrada</h1>
          <button
            onClick={() => router.push('/admin/encomendas')}
            className="text-purple-600 hover:text-purple-700"
          >
            Voltar para encomendas
          </button>
        </div>
      </div>
    )
  }

  const StatusIcon = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG]?.icon || Clock
  const statusConfig = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.new

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 print:mb-4">
        <button
          onClick={() => router.push('/admin/encomendas')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 print:hidden"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para encomendas
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Encomenda #{order.order_number}
            </h1>
            <p className="text-gray-600">
              Criada em {format(new Date(order.created_at), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
            </p>
          </div>

          <div className="flex gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Printer className="w-5 h-5" />
              Imprimir
            </button>
            <button
              onClick={exportOrderPDF}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Download className="w-5 h-5" />
              Exportar PDF
            </button>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-8">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${statusConfig.color}`}>
          <StatusIcon className="w-5 h-5" />
          <span className="font-medium">{statusConfig.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-6 h-6 text-purple-600" />
              Itens da Encomenda
            </h2>

            <div className="space-y-4">
              {order.order_items.map((item) => {
                const primaryImage = item.product?.product_images?.find(img => img.is_primary)
                const imageUrl = primaryImage?.url || item.product?.product_images?.[0]?.url

                return (
                  <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={item.product_name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.product_name}</h3>
                      {item.variant_name && (
                        <p className="text-sm text-gray-600">Variante: {item.variant_name}</p>
                      )}
                      <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>

                      {/* Customization */}
                      {item.customization && (
                        <div className="mt-2 p-2 bg-purple-50 rounded border border-purple-200">
                          <p className="text-xs font-semibold text-purple-900 mb-1">Personalização:</p>
                          {item.customization.text && (
                            <p className="text-sm text-purple-800">
                              Texto: "{item.customization.text}"
                              {item.customization.text_position && ` (${item.customization.text_position})`}
                            </p>
                          )}
                          {item.customization.image_url && (
                            <p className="text-sm text-purple-800">Imagem personalizada anexada</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Prices */}
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        €{item.unit_price.toFixed(2)} × {item.quantity}
                      </p>
                      <p className="font-semibold text-gray-900">
                        €{item.total_price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>€{order.subtotal.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto</span>
                    <span>-€{order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Envio</span>
                  <span>€{order.shipping_cost.toFixed(2)}</span>
                </div>
                {order.tax > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>IVA</span>
                    <span>€{order.tax.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>€{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-purple-600" />
              Informações de Pagamento
            </h2>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Método de Pagamento</p>
                <p className="font-medium text-gray-900 capitalize">
                  {order.payment_method === 'card' ? 'Cartão de Crédito' :
                   order.payment_method === 'multibanco' ? 'Multibanco' :
                   order.payment_method || 'N/A'}
                </p>
              </div>

              {order.payment_intent_id && (
                <div>
                  <p className="text-sm text-gray-600">ID da Transação</p>
                  <p className="font-mono text-sm text-gray-900">{order.payment_intent_id}</p>
                </div>
              )}

              {order.tracking_number && (
                <div>
                  <p className="text-sm text-gray-600">Número de Rastreio</p>
                  <p className="font-mono text-sm text-gray-900">{order.tracking_number}</p>
                </div>
              )}

              {order.notes && (
                <div>
                  <p className="text-sm text-gray-600">Notas</p>
                  <p className="text-gray-900">{order.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-6 h-6 text-purple-600" />
              Cliente
            </h2>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Nome</p>
                <p className="font-medium text-gray-900">{order.customer_name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-gray-900">{order.customer_email}</p>
              </div>

              {order.shipping_address.phone && (
                <div>
                  <p className="text-sm text-gray-600">Telefone</p>
                  <p className="text-gray-900">{order.shipping_address.phone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-purple-600" />
              Morada de Envio
            </h2>

            <div className="text-gray-900">
              <p className="font-medium">{order.shipping_address.full_name}</p>
              <p>{order.shipping_address.address_line1}</p>
              {order.shipping_address.address_line2 && (
                <p>{order.shipping_address.address_line2}</p>
              )}
              <p>
                {order.shipping_address.postal_code} {order.shipping_address.city}
              </p>
              <p>{order.shipping_address.country}</p>
              {order.shipping_address.phone && (
                <p className="mt-2 text-sm">Tel: {order.shipping_address.phone}</p>
              )}
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-purple-600" />
              Morada de Faturação
            </h2>

            <div className="text-gray-900">
              <p className="font-medium">{order.billing_address.full_name}</p>
              <p>{order.billing_address.address_line1}</p>
              {order.billing_address.address_line2 && (
                <p>{order.billing_address.address_line2}</p>
              )}
              <p>
                {order.billing_address.postal_code} {order.billing_address.city}
              </p>
              <p>{order.billing_address.country}</p>
            </div>
          </div>

          {/* Order Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 print:hidden">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ações</h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Atualizar Status
                </label>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(e.target.value)}
                  disabled={updating}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                >
                  <option value="new">Nova</option>
                  <option value="paid">Paga</option>
                  <option value="processing">Processando</option>
                  <option value="shipped">Enviada</option>
                  <option value="completed">Concluída</option>
                  <option value="cancelled">Cancelada</option>
                  <option value="refunded">Reembolsada</option>
                </select>
              </div>

              {updating && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                  Atualizando...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:mb-4 {
            margin-bottom: 1rem !important;
          }
        }
      `}</style>
    </div>
  )
}

