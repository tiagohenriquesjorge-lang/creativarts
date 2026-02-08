'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

export default function NewCouponPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: '',
    min_purchase_amount: '',
    max_discount_amount: '',
    valid_from: new Date().toISOString().split('T')[0],
    valid_until: '',
    usage_limit: '',
    is_active: true,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('coupons')
        .insert([{
          code: formData.code.toUpperCase(),
          type: formData.type,
          value: parseFloat(formData.value),
          min_purchase_amount: formData.min_purchase_amount ? parseFloat(formData.min_purchase_amount) : null,
          max_discount_amount: formData.max_discount_amount ? parseFloat(formData.max_discount_amount) : null,
          valid_from: new Date(formData.valid_from).toISOString(),
          valid_until: new Date(formData.valid_until).toISOString(),
          usage_limit: formData.usage_limit ? parseInt(formData.usage_limit) : null,
          is_active: formData.is_active,
        }])
        .select()

      if (error) throw error

      alert('Cupão criado com sucesso!')
      router.push('/admin/cupoes')
    } catch (error: any) {
      console.error('Error creating coupon:', error)
      alert(`Erro ao criar cupão: ${error.message}`)
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Novo Cupão</h1>
          <p className="text-gray-600 mt-1">Crie um novo cupão de desconto</p>
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
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                A guardar...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Criar Cupão
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

