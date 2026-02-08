'use client'

import type { Category } from '@/types'
import { X } from 'lucide-react'

interface ProductFiltersProps {
  categories: Category[]
  selectedCategory: string | null
  sortBy: string
  minPrice: string | null
  maxPrice: string | null
  customizable: boolean
  onFilterChange: (key: string, value: string | null) => void
}

export default function ProductFilters({
  categories,
  selectedCategory,
  sortBy,
  minPrice,
  maxPrice,
  customizable,
  onFilterChange,
}: ProductFiltersProps) {
  const hasActiveFilters = selectedCategory || minPrice || maxPrice || customizable

  const clearAllFilters = () => {
    onFilterChange('categoria', null)
    onFilterChange('preco_min', null)
    onFilterChange('preco_max', null)
    onFilterChange('personalizavel', null)
    onFilterChange('ordenar', 'newest')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-heading font-bold text-brand-gray-dark">
          Filtros
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            Limpar
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-brand-gray-dark mb-3">Categoria</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={!selectedCategory}
              onChange={() => onFilterChange('categoria', null)}
              className="text-primary focus:ring-primary"
            />
            <span className="text-brand-gray-dark">Todas</span>
          </label>
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category.id}
                onChange={() => onFilterChange('categoria', category.id)}
                className="text-primary focus:ring-primary"
              />
              <span className="text-brand-gray-dark">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-brand-gray-dark mb-3">Preço</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-brand-gray-dark/70 mb-1 block">Mínimo</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={minPrice || ''}
              onChange={(e) => onFilterChange('preco_min', e.target.value || null)}
              placeholder="0.00"
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="text-sm text-brand-gray-dark/70 mb-1 block">Máximo</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={maxPrice || ''}
              onChange={(e) => onFilterChange('preco_max', e.target.value || null)}
              placeholder="100.00"
              className="input-field w-full"
            />
          </div>
        </div>
      </div>

      {/* Customizable */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={customizable}
            onChange={(e) => onFilterChange('personalizavel', e.target.checked ? 'true' : null)}
            className="rounded text-primary focus:ring-primary"
          />
          <span className="text-brand-gray-dark">Apenas personalizáveis</span>
        </label>
      </div>

      {/* Sort (Desktop) */}
      <div className="hidden lg:block">
        <h3 className="font-semibold text-brand-gray-dark mb-3">Ordenar por</h3>
        <select
          value={sortBy}
          onChange={(e) => onFilterChange('ordenar', e.target.value)}
          className="input-field w-full"
        >
          <option value="newest">Mais recentes</option>
          <option value="price_asc">Preço: Baixo → Alto</option>
          <option value="price_desc">Preço: Alto → Baixo</option>
          <option value="name">Nome A-Z</option>
        </select>
      </div>

      {/* Quick Price Filters */}
      <div>
        <h3 className="font-semibold text-brand-gray-dark mb-3">Faixas de preço</h3>
        <div className="space-y-2">
          <button
            onClick={() => {
              onFilterChange('preco_min', '0')
              onFilterChange('preco_max', '10')
            }}
            className="text-sm text-brand-blue hover:underline block"
          >
            Até 10€
          </button>
          <button
            onClick={() => {
              onFilterChange('preco_min', '10')
              onFilterChange('preco_max', '25')
            }}
            className="text-sm text-brand-blue hover:underline block"
          >
            10€ - 25€
          </button>
          <button
            onClick={() => {
              onFilterChange('preco_min', '25')
              onFilterChange('preco_max', '50')
            }}
            className="text-sm text-brand-blue hover:underline block"
          >
            25€ - 50€
          </button>
          <button
            onClick={() => {
              onFilterChange('preco_min', '50')
              onFilterChange('preco_max', null)
            }}
            className="text-sm text-brand-blue hover:underline block"
          >
            Mais de 50€
          </button>
        </div>
      </div>
    </div>
  )
}

