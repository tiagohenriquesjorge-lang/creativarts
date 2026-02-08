'use client'

import { MapPin, Home, Building2 } from 'lucide-react'

export interface ShippingAddress {
  address: string
  city: string
  postalCode: string
  country: string
  notes?: string
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
            <strong>Envio grátis</strong> para encomendas acima de 50€. Entrega em 3-5 dias úteis.
          </span>
        </p>
      </div>
    </div>
  )
}

