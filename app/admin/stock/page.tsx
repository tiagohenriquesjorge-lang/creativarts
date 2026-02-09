'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { 
  Package, 
  TrendingDown, 
  TrendingUp, 
  Edit, 
  AlertCircle,
  Download,
  Filter,
  Calendar,
  Search
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface StockHistoryEntry {
  id: string
  product_variant_id: string
  order_id: string | null
  quantity_change: number
  previous_quantity: number
  new_quantity: number
  reason: 'order_created' | 'order_cancelled' | 'manual_adjustment' | 'stock_correction'
  notes: string | null
  created_by: string | null
  created_at: string
  product_variants: {
    id: string
    sku: string
    name: string
    products: {
      id: string
      name: string
    }
  }
  orders: {
    id: string
    order_number: string
  } | null
}

const REASON_CONFIG = {
  order_created: { 
    label: 'Venda', 
    color: 'bg-red-100 text-red-700 border-red-200', 
    icon: TrendingDown 
  },
  order_cancelled: { 
    label: 'Cancelamento', 
    color: 'bg-green-100 text-green-700 border-green-200', 
    icon: TrendingUp 
  },
  manual_adjustment: { 
    label: 'Ajuste Manual', 
    color: 'bg-blue-100 text-blue-700 border-blue-200', 
    icon: Edit 
  },
  stock_correction: { 
    label: 'Correção', 
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200', 
    icon: AlertCircle 
  },
}

export default function StockHistoryPage() {
  const [history, setHistory] = useState<StockHistoryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [reasonFilter, setReasonFilter] = useState<string>('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  useEffect(() => {
    loadHistory()
  }, [])

  async function loadHistory() {
    try {
      const { data, error } = await supabase
        .from('stock_history')
        .select(`
          *,
          product_variants (
            id,
            sku,
            name,
            products (
              id,
              name
            )
          ),
          orders (
            id,
            order_number
          )
        `)
        .order('created_at', { ascending: false })
        .limit(500)

      if (error) throw error

      setHistory(data || [])
    } catch (error) {
      console.error('Error loading stock history:', error)
      alert('Erro ao carregar histórico de stock')
    } finally {
      setLoading(false)
    }
  }

  function getFilteredHistory() {
    return history.filter((entry) => {
      // Search filter
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = 
        entry.product_variants.products.name.toLowerCase().includes(searchLower) ||
        entry.product_variants.name.toLowerCase().includes(searchLower) ||
        entry.product_variants.sku.toLowerCase().includes(searchLower) ||
        (entry.orders?.order_number || '').toLowerCase().includes(searchLower)

      // Reason filter
      const matchesReason = reasonFilter === 'all' || entry.reason === reasonFilter

      // Date filters
      const entryDate = new Date(entry.created_at)
      const matchesDateFrom = !dateFrom || entryDate >= new Date(dateFrom)
      const matchesDateTo = !dateTo || entryDate <= new Date(dateTo + 'T23:59:59')

      return matchesSearch && matchesReason && matchesDateFrom && matchesDateTo
    })
  }

  function exportToCSV() {
    const filteredData = getFilteredHistory()
    
    const headers = ['Data', 'Produto', 'Variante', 'SKU', 'Razão', 'Alteração', 'Stock Anterior', 'Stock Novo', 'Encomenda', 'Notas']
    const rows = filteredData.map((entry) => [
      format(new Date(entry.created_at), 'dd/MM/yyyy HH:mm'),
      entry.product_variants.products.name,
      entry.product_variants.name,
      entry.product_variants.sku,
      REASON_CONFIG[entry.reason].label,
      entry.quantity_change,
      entry.previous_quantity,
      entry.new_quantity,
      entry.orders?.order_number || '-',
      entry.notes || '-'
    ])

    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `historico-stock-${format(new Date(), 'yyyy-MM-dd')}.csv`
    link.click()
  }

  const filteredHistory = getFilteredHistory()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Histórico de Stock</h1>
            <p className="text-gray-600">
              Visualize todos os movimentos de stock do inventário
            </p>
          </div>

          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Download className="w-5 h-5" />
            Exportar CSV
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pesquisar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Produto, SKU, encomenda..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Reason Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Razão
              </label>
              <select
                value={reasonFilter}
                onChange={(e) => setReasonFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Todas</option>
                <option value="order_created">Venda</option>
                <option value="order_cancelled">Cancelamento</option>
                <option value="manual_adjustment">Ajuste Manual</option>
                <option value="stock_correction">Correção</option>
              </select>
            </div>

            {/* Date From */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Início
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Date To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Fim
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              A mostrar <span className="font-semibold">{filteredHistory.length}</span> de{' '}
              <span className="font-semibold">{history.length}</span> movimentos
            </p>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Variante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Razão
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alteração
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Encomenda
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">Nenhum movimento encontrado</p>
                  </td>
                </tr>
              ) : (
                filteredHistory.map((entry) => {
                  const reasonConfig = REASON_CONFIG[entry.reason]
                  const ReasonIcon = reasonConfig.icon
                  const isPositive = entry.quantity_change > 0

                  return (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {format(new Date(entry.created_at), 'dd/MM/yyyy')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {format(new Date(entry.created_at), 'HH:mm')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {entry.product_variants.products.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          SKU: {entry.product_variants.sku}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {entry.product_variants.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${reasonConfig.color}`}>
                          <ReasonIcon className="w-4 h-4" />
                          {reasonConfig.label}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {isPositive ? '+' : ''}{entry.quantity_change}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {entry.previous_quantity} → {entry.new_quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.orders ? (
                          <a
                            href={`/admin/encomendas/${entry.orders.id}`}
                            className="text-sm text-purple-600 hover:text-purple-700 hover:underline"
                          >
                            #{entry.orders.order_number}
                          </a>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

