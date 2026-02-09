'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CustomerAuthGuard from '@/components/auth/CustomerAuthGuard'
import { getCurrentUser } from '@/lib/auth/customerAuth'
import { createClient } from '@/lib/supabase/client'
import { User, Package, LogOut, ChevronRight, Calendar, CreditCard } from 'lucide-react'
import { signOut } from '@/lib/auth/customerAuth'
import { useToastStore } from '@/store/toastStore'

interface Order {
  id: string
  order_number: string
  created_at: string
  status: string
  total_amount: number
  items_count: number
}

export default function OrdersPage() {
  return (
    <CustomerAuthGuard>
      <OrdersContent />
    </CustomerAuthGuard>
  )
}

function OrdersContent() {
  const router = useRouter()
  const toast = useToastStore()

  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    const user = await getCurrentUser()
    if (!user) return

    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          order_number,
          created_at,
          status,
          total_amount,
          order_items (count)
        `)
        .eq('customer_email', user.email)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading orders:', error)
        toast.error('Erro ao carregar encomendas')
        return
      }

      const formattedOrders = data.map((order: any) => ({
        id: order.id,
        order_number: order.order_number,
        created_at: order.created_at,
        status: order.status,
        total_amount: order.total_amount,
        items_count: order.order_items?.[0]?.count || 0,
      }))

      setOrders(formattedOrders)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Erro ao carregar encomendas')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    const result = await signOut()
    if (result.success) {
      toast.success('Logout efetuado com sucesso!')
      router.push('/')
    } else {
      toast.error('Erro ao fazer logout')
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
    })
  }

  return (
    <div className="min-h-screen bg-brand-gray-light/30 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-brand-gray-dark mb-2">
            Minhas Encomendas
          </h1>
          <p className="text-brand-gray-dark/70">
            Acompanhe o estado das suas encomendas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border-2 border-brand-gray-light p-4 space-y-2">
              <Link
                href="/perfil"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brand-gray-light/50 text-brand-gray-dark transition-colors"
              >
                <User className="h-5 w-5" />
                Perfil
              </Link>
              <Link
                href="/encomendas"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-brand-blue/10 text-brand-blue font-medium"
              >
                <Package className="h-5 w-5" />
                Encomendas
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Sair
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="bg-white rounded-lg border-2 border-brand-gray-light p-12 text-center">
                <div className="animate-spin h-12 w-12 border-4 border-brand-blue border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-brand-gray-dark/70">A carregar encomendas...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-lg border-2 border-brand-gray-light p-12 text-center">
                <Package className="h-16 w-16 text-brand-gray-dark/30 mx-auto mb-4" />
                <h3 className="text-xl font-heading font-bold text-brand-gray-dark mb-2">
                  Ainda não tem encomendas
                </h3>
                <p className="text-brand-gray-dark/70 mb-6">
                  Comece a explorar os nossos produtos personalizados!
                </p>
                <Link href="/produtos" className="btn-primary inline-block">
                  Ver Produtos
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/encomendas/${order.id}`}
                    className="block bg-white rounded-lg border-2 border-brand-gray-light p-6 hover:border-brand-blue transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-heading font-bold text-brand-gray-dark mb-1">
                          Encomenda #{order.order_number}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-brand-gray-dark/70">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(order.created_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Package className="h-4 w-4" />
                            {order.items_count} {order.items_count === 1 ? 'item' : 'items'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(order.status)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-brand-gray-light">
                      <div className="flex items-center gap-2 text-brand-gray-dark">
                        <CreditCard className="h-5 w-5" />
                        <span className="font-semibold text-lg">
                          €{order.total_amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-brand-blue font-medium">
                        Ver Detalhes
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

