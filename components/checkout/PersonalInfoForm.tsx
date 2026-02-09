'use client'

import { User, Mail, Phone } from 'lucide-react'

export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  nif?: string
}

interface PersonalInfoFormProps {
  data: PersonalInfo
  onChange: (data: PersonalInfo) => void
  errors: Partial<Record<keyof PersonalInfo, string>>
}

export default function PersonalInfoForm({ data, onChange, errors }: PersonalInfoFormProps) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-brand-gray-dark mb-2">
          Informações Pessoais
        </h2>
        <p className="text-brand-gray-dark/70">
          Preencha os seus dados para continuar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-brand-gray-dark mb-2">
            Primeiro Nome *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray-dark/40" />
            <input
              type="text"
              id="firstName"
              value={data.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`input-field pl-10 ${errors.firstName ? 'border-brand-red' : ''}`}
              placeholder="João"
            />
          </div>
          {errors.firstName && (
            <p className="mt-1 text-sm text-brand-red">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-brand-gray-dark mb-2">
            Último Nome *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray-dark/40" />
            <input
              type="text"
              id="lastName"
              value={data.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={`input-field pl-10 ${errors.lastName ? 'border-brand-red' : ''}`}
              placeholder="Silva"
            />
          </div>
          {errors.lastName && (
            <p className="mt-1 text-sm text-brand-red">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-gray-dark mb-2">
          Email *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray-dark/40" />
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`input-field pl-10 ${errors.email ? 'border-brand-red' : ''}`}
            placeholder="joao.silva@exemplo.com"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-brand-red">{errors.email}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-brand-gray-dark mb-2">
            Telefone *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray-dark/40" />
            <input
              type="tel"
              id="phone"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`input-field pl-10 ${errors.phone ? 'border-brand-red' : ''}`}
              placeholder="+351 912 345 678"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-brand-red">{errors.phone}</p>
          )}
        </div>

        {/* NIF */}
        <div>
          <label htmlFor="nif" className="block text-sm font-medium text-brand-gray-dark mb-2">
            NIF (opcional)
          </label>
          <input
            type="text"
            id="nif"
            value={data.nif || ''}
            onChange={(e) => handleChange('nif', e.target.value)}
            className="input-field"
            placeholder="123456789"
            maxLength={9}
          />
          <p className="mt-1 text-xs text-brand-gray-dark/60">
            Para fatura com NIF
          </p>
        </div>
      </div>

      <div className="bg-brand-blue/5 rounded-lg p-4 text-sm text-brand-gray-dark/80">
        <p className="flex items-start gap-2">
          <span className="text-brand-blue mt-0.5">🔒</span>
          <span>
            Os seus dados estão seguros e serão usados apenas para processar o seu pedido.
          </span>
        </p>
      </div>
    </div>
  )
}

