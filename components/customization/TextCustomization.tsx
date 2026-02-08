'use client'

import { useState, useEffect } from 'react'
import { Type, AlertCircle } from 'lucide-react'

interface TextCustomizationProps {
  maxLength?: number
  positions?: string[]
  value: string
  onChange: (text: string, position?: string) => void
  disabled?: boolean
}

export default function TextCustomization({
  maxLength = 50,
  positions = ['frente', 'costas'],
  value,
  onChange,
  disabled = false,
}: TextCustomizationProps) {
  const [text, setText] = useState(value)
  const [selectedPosition, setSelectedPosition] = useState(positions[0])
  const [error, setError] = useState('')

  useEffect(() => {
    setText(value)
  }, [value])

  const handleTextChange = (newText: string) => {
    if (newText.length > maxLength) {
      setError(`Máximo de ${maxLength} caracteres`)
      return
    }
    
    setError('')
    setText(newText)
    onChange(newText, selectedPosition)
  }

  const handlePositionChange = (position: string) => {
    setSelectedPosition(position)
    onChange(text, position)
  }

  const remainingChars = maxLength - text.length
  const isNearLimit = remainingChars <= 10

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Type className="h-5 w-5 text-brand-blue" />
        <h3 className="font-heading font-semibold text-lg">Adicionar Texto</h3>
      </div>

      {/* Position Selection */}
      {positions.length > 1 && (
        <div>
          <label className="block text-sm font-medium text-brand-gray-dark mb-2">
            Posição do texto
          </label>
          <div className="flex gap-2">
            {positions.map((position) => (
              <button
                key={position}
                type="button"
                onClick={() => handlePositionChange(position)}
                disabled={disabled}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${selectedPosition === position
                    ? 'bg-brand-blue text-white shadow-md'
                    : 'bg-white border-2 border-brand-gray-light text-brand-gray-dark hover:border-brand-blue'
                  }
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {position.charAt(0).toUpperCase() + position.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Text Input */}
      <div>
        <label htmlFor="custom-text" className="block text-sm font-medium text-brand-gray-dark mb-2">
          Seu texto personalizado
        </label>
        <textarea
          id="custom-text"
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          disabled={disabled}
          placeholder="Digite seu texto aqui..."
          rows={3}
          className={`
            input-field w-full resize-none
            ${error ? 'border-brand-red focus:ring-brand-red' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        />
        
        {/* Character Counter */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            {error && (
              <div className="flex items-center gap-1 text-brand-red text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </div>
          <span className={`text-sm ${isNearLimit ? 'text-brand-red font-semibold' : 'text-brand-gray-dark/60'}`}>
            {remainingChars} caracteres restantes
          </span>
        </div>
      </div>

      {/* Preview */}
      {text && (
        <div className="bg-brand-gray-light/30 rounded-lg p-4 border-2 border-dashed border-brand-gray-light">
          <p className="text-xs text-brand-gray-dark/60 mb-2 uppercase tracking-wide">Preview</p>
          <p className="font-heading text-xl text-brand-gray-dark break-words">
            {text}
          </p>
          <p className="text-xs text-brand-gray-dark/60 mt-2">
            Posição: <span className="font-semibold">{selectedPosition}</span>
          </p>
        </div>
      )}

      {/* Info */}
      <div className="bg-brand-blue/5 rounded-lg p-3 text-sm text-brand-gray-dark/80">
        <p className="flex items-start gap-2">
          <span className="text-brand-blue mt-0.5">ℹ️</span>
          <span>
            O texto será impresso exatamente como digitado. Verifique a ortografia antes de finalizar.
          </span>
        </p>
      </div>
    </div>
  )
}

