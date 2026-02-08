'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

export default function EditCouponPage() {
  const router = useRouter()
  const params = useParams()
  const couponId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: '',
    min_purchase_amount: '',
    max_discount_amount: '',
    valid_from: '',
    valid_until: '',
    usage_limit: '',
    is_active: true,
  })

  useEffect(() => {
    loadCoupon()
  }, [couponId])

  async function loadCoupon() {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('id', couponId)
        .single()

      if (error) throw error

      if (data) {
        setFormData({
          code: data.code || '',
          type: data.type || 'percentage',
          value: data.value?.toString() || '',
          min_purchase_amount: data.min_purchase_amount?.toString() || '',
          max_discount_amount: data.max_discount_amount?.toString() || '',
          valid_from: data.valid_from ? new Date(data.valid_from).toISOString().split('T')[0] : '',
          valid_until: data.valid_until ? new Date(data.valid_until).toISOString().split('T')[0] : '',
          usage_limit: data.usage_limit?.toString() || '',
          is_active: data.is_active || false,
        })
      }
    } catch (error) {
      console.error('Error loading coupon:', error)
      alert('Erro ao carregar cupão')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      const { error } = await supabase
        .from('coupons')
        .update({
          code: formData.code.toUpperCase(),
          type: formData.type,
          value: parseFloat(formData.value),
          min_purchase_amount: formData.min_purchase_amount ? parseFloat(formData.min_purchase_amount) : null,
          max_discount_amount: formData.max_discount_amount ? parseFloat(formData.max_discount_amount) : null,
          valid_from: new Date(formData.valid_from).toISOString(),
          valid_until: new Date(formData.valid_until).toISOString(),
          usage_limit: formData.usage_limit ? parseInt(formData.usage_limit) : null,
          is_active: formData.is_active,
        })
        .eq('id', couponId)

      if (error) throw error

      alert('Cupão atualizado com sucesso!')
      router.push('/admin/cupoes')
    } catch (error: any) {
      console.error('Error updating coupon:', error)
      alert(`Erro ao atualizar cupão: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">A carregar cupão...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/cupoes"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar Cupão</h1>
          <p className="text-gray-600 mt-1">Modificar informações do cupão</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Código */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Código do Cupão *
          </label>
          <input
            type="text"
            required
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent uppercase"
            placeholder="VERAO2024"
          />
          <p className="text-xs text-gray-500 mt-1">
            Use letras maiúsculas e números (sem espaços)
          </p>
        </div>

        {/* Tipo e Valor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Desconto *
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'percentage' | 'fixed' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="percentage">Percentagem (%)</option>
              <option value="fixed">Valor Fixo (€)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor *
            </label>
            <div className="relative">
              <input
                type="number"
                required
                step="0.01"
                min="0"
                max={formData.type === 'percentage' ? '100' : undefined}
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={formData.type === 'percentage' ? '10' : '5.00'}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                {formData.type === 'percentage' ? '%' : '€'}
              </span>
            </div>
          </div>
        </div>

        {/* Limites */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compra Mínima (€)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.min_purchase_amount}
              onChange={(e) => setFormData({ ...formData, min_purchase_amount: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Desconto Máximo (€)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.max_discount_amount}
              onChange={(e) => setFormData({ ...formData, max_discount_amount: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Sem limite"
            />
          </div>
        </div>

        {/* Datas de Validade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Válido Desde *
            </label>
            <input
              type="date"
              required
              value={formData.valid_from}
              onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Válido Até *
            </label>
            <input
              type="date"
              required
              value={formData.valid_until}
              onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Limite de Utilização */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Limite de Utilizações
          </label>
          <input
            type="number"
            min="1"
            value={formData.usage_limit}
            onChange={(e) => setFormData({ ...formData, usage_limit: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Sem limite"
          />
          <p className="text-xs text-gray-500 mt-1">
            Deixe em branco para uso ilimitado
          </p>
        </div>

        {/* Ativo */}
        <div>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Cupão ativo (disponível para uso)
            </span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <Link
            href="/admin/cupoes"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                A guardar...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Guardar Alterações
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

