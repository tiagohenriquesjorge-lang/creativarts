'use client'

import { MapPin, Home, Building2, Truck, Package } from 'lucide-react'

export interface ShippingAddress {
  address: string
  city: string
  postalCode: string
  country: string
  notes?: string
  shippingMethod?: 'standard' | 'express'
}

interface ShippingFormProps {
  data: ShippingAddress
  onChange: (data: ShippingAddress) => void
  errors: Partial<Record<keyof ShippingAddress, string>>
}

export default function ShippingForm({ data, onChange, errors }: ShippingFormProps) {
  const handleChange = (field: keyof ShippingAddress, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-brand-gray-dark mb-2">
          Morada de Envio
        </h2>
        <p className="text-brand-gray-dark/70">
          Para onde devemos enviar o seu pedido?
        </p>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-brand-gray-dark mb-2">
          Morada *
        </label>
        <div className="relative">
          <Home className="absolute left-3 top-3 h-5 w-5 text-brand-gray-dark/40" />
          <input
            type="text"
            id="address"
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className={`input-field pl-10 ${errors.address ? 'border-brand-red' : ''}`}
            placeholder="Rua Example, nº 123, 1º Dto"
          />
        </div>
        {errors.address && (
          <p className="mt-1 text-sm text-brand-red">{errors.address}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-brand-gray-dark mb-2">
            Cidade *
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray-dark/40" />
            <input
              type="text"
              id="city"
              value={data.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className={`input-field pl-10 ${errors.city ? 'border-brand-red' : ''}`}
              placeholder="Lisboa"
            />
          </div>
          {errors.city && (
            <p className="mt-1 text-sm text-brand-red">{errors.city}</p>
          )}
        </div>

        {/* Postal Code */}
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-brand-gray-dark mb-2">
            Código Postal *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray-dark/40" />
            <input
              type="text"
              id="postalCode"
              value={data.postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value)}
              className={`input-field pl-10 ${errors.postalCode ? 'border-brand-red' : ''}`}
              placeholder="1000-001"
            />
          </div>
          {errors.postalCode && (
            <p className="mt-1 text-sm text-brand-red">{errors.postalCode}</p>
          )}
        </div>
      </div>

      {/* Country */}
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-brand-gray-dark mb-2">
          País *
        </label>
        <select
          id="country"
          value={data.country}
          onChange={(e) => handleChange('country', e.target.value)}
          className={`input-field ${errors.country ? 'border-brand-red' : ''}`}
        >
          <option value="">Selecione o país</option>
          <option value="PT">Portugal</option>
          <option value="ES">Espanha</option>
          <option value="FR">França</option>
          <option value="DE">Alemanha</option>
          <option value="IT">Itália</option>
          <option value="UK">Reino Unido</option>
        </select>
        {errors.country && (
          <p className="mt-1 text-sm text-brand-red">{errors.country}</p>
        )}
      </div>

      {/* Shipping Method */}
      <div>
        <label className="block text-sm font-medium text-brand-gray-dark mb-3">
          Método de Envio *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Standard Shipping */}
          <button
            type="button"
            onClick={() => handleChange('shippingMethod', 'standard')}
            className={`
              relative p-4 rounded-lg border-2 text-left transition-all
              ${data.shippingMethod === 'standard'
                ? 'border-brand-blue bg-brand-blue/5'
                : 'border-brand-gray-light hover:border-brand-blue/50'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <Package className={`w-6 h-6 mt-0.5 ${data.shippingMethod === 'standard' ? 'text-brand-blue' : 'text-brand-gray-dark/60'}`} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-brand-gray-dark">Envio Standard</p>
                  <p className="text-sm font-semibold text-brand-gray-dark">Grátis</p>
                </div>
                <p className="text-sm text-brand-gray-dark/70">
                  Entrega em 3-5 dias úteis
                </p>
              </div>
            </div>
            {data.shippingMethod === 'standard' && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-brand-blue rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>

          {/* Express Shipping */}
          <button
            type="button"
            onClick={() => handleChange('shippingMethod', 'express')}
            className={`
              relative p-4 rounded-lg border-2 text-left transition-all
              ${data.shippingMethod === 'express'
                ? 'border-brand-blue bg-brand-blue/5'
                : 'border-brand-gray-light hover:border-brand-blue/50'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <Truck className={`w-6 h-6 mt-0.5 ${data.shippingMethod === 'express' ? 'text-brand-blue' : 'text-brand-gray-dark/60'}`} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-brand-gray-dark">Envio Expresso</p>
                  <p className="text-sm font-semibold text-brand-gray-dark">€9.99</p>
                </div>
                <p className="text-sm text-brand-gray-dark/70">
                  Entrega em 1-2 dias úteis
                </p>
              </div>
            </div>
            {data.shippingMethod === 'express' && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-brand-blue rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        </div>
        {errors.shippingMethod && (
          <p className="mt-2 text-sm text-brand-red">{errors.shippingMethod}</p>
        )}
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-brand-gray-dark mb-2">
          Notas de Entrega (opcional)
        </label>
        <textarea
          id="notes"
          value={data.notes || ''}
          onChange={(e) => handleChange('notes', e.target.value)}
          rows={3}
          className="input-field resize-none"
          placeholder="Ex: Deixar na portaria, tocar à campainha, etc."
        />
      </div>

      <div className="bg-brand-yellow/10 rounded-lg p-4 text-sm text-brand-gray-dark/80">
        <p className="flex items-start gap-2">
          <span className="text-brand-yellow mt-0.5">📦</span>
          <span>
            <strong>Envio grátis</strong> para encomendas acima de 50€ (apenas envio standard).
          </span>
        </p>
      </div>
    </div>
  )
}

