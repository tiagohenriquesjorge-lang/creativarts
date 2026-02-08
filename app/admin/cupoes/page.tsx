'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { Plus, Search, Trash2, Tag, Percent, Euro, Edit } from 'lucide-react'
import { format } from 'date-fns'

interface Coupon {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  valid_from: string
  valid_until: string
  usage_count: number
  usage_limit: number | null
  is_active: boolean
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadCoupons()
  }, [])

  async function loadCoupons() {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setCoupons(data || [])
    } catch (error) {
      console.error('Error loading coupons:', error)
    } finally {
      setLoading(false)
    }
  }

  async function toggleCouponStatus(id: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('coupons')
        .update({ is_active: !currentStatus })
        .eq('id', id)

      if (error) throw error

      setCoupons(coupons.map(c => 
        c.id === id ? { ...c, is_active: !currentStatus } : c
      ))
    } catch (error) {
      console.error('Error toggling coupon status:', error)
      alert('Erro ao atualizar status do cupão')
    }
  }

  async function deleteCoupon(id: string, code: string) {
    if (!confirm(`Tem certeza que deseja apagar o cupão "${code}"?`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('coupons')
        .delete()
        .eq('id', id)

      if (error) throw error

      setCoupons(coupons.filter(c => c.id !== id))
      alert('Cupão apagado com sucesso!')
    } catch (error) {
      console.error('Error deleting coupon:', error)
      alert('Erro ao apagar cupão')
    }
  }

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">A carregar cupões...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cupões de Desconto</h1>
          <p className="text-gray-600 mt-1">{coupons.length} cupões no total</p>
        </div>
        <Link
          href="/admin/cupoes/novo"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          Criar Cupão
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar cupões..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoupons.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            Nenhum cupão encontrado
          </div>
        ) : (
          filteredCoupons.map((coupon) => {
            const isExpired = new Date(coupon.valid_until) < new Date()
            const isLimitReached = coupon.usage_limit && coupon.usage_count >= coupon.usage_limit

            return (
              <div
                key={coupon.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                      <Tag className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{coupon.code}</h3>
                      <p className="text-sm text-gray-500">
                        {coupon.type === 'percentage' ? (
                          <span className="flex items-center gap-1">
                            <Percent className="w-3 h-3" />
                            {coupon.value}% desconto
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Euro className="w-3 h-3" />
                            €{coupon.value} desconto
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Utilização:</span>
                    <span className="font-medium text-gray-900">
                      {coupon.usage_count} / {coupon.usage_limit || '∞'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Válido até:</span>
                    <span className="font-medium text-gray-900">
                      {format(new Date(coupon.valid_until), 'dd/MM/yyyy')}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="mb-4">
                  {isExpired ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      Expirado
                    </span>
                  ) : isLimitReached ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                      Limite atingido
                    </span>
                  ) : coupon.is_active ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Ativo
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      Inativo
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => toggleCouponStatus(coupon.id, coupon.is_active)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {coupon.is_active ? 'Desativar' : 'Ativar'}
                  </button>
                  <Link
                    href={`/admin/cupoes/${coupon.id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => deleteCoupon(coupon.id, coupon.code)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Apagar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

