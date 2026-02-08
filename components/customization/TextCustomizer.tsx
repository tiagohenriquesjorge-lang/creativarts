'use client'

import { useState, useEffect } from 'react'
import { Type, AlertCircle } from 'lucide-react'

interface TextCustomizerProps {
  maxLength?: number
  positions?: string[]
  value?: string
  position?: string
  onChange: (text: string, position: string) => void
}

export default function TextCustomizer({
  maxLength = 30,
  positions = ['Frente', 'Trás', 'Manga Esquerda', 'Manga Direita'],
  value = '',
  position = positions[0],
  onChange,
}: TextCustomizerProps) {
  const [text, setText] = useState(value)
  const [selectedPosition, setSelectedPosition] = useState(position)
  const [charCount, setCharCount] = useState(value.length)

  useEffect(() => {
    onChange(text, selectedPosition)
  }, [text, selectedPosition])

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value
    if (newText.length <= maxLength) {
      setText(newText)
      setCharCount(newText.length)
    }
  }

  const handlePositionChange = (pos: string) => {
    setSelectedPosition(pos)
  }

  const isNearLimit = charCount >= maxLength * 0.8
  const isAtLimit = charCount >= maxLength

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Type className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-gray-900">Personalizar com Texto</h3>
      </div>

      {/* Text Input */}
      <div className="space-y-2">
        <label htmlFor="custom-text" className="block text-sm font-medium text-gray-700">
          Texto Personalizado
        </label>
        <input
          id="custom-text"
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Digite o seu texto aqui..."
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
            isAtLimit ? 'border-red-500' : 'border-gray-300'
          }`}
          maxLength={maxLength}
        />
        
        {/* Character Counter */}
        <div className="flex items-center justify-between text-sm">
          <span className={`${isNearLimit ? 'text-orange-600' : 'text-gray-500'}`}>
            {charCount} / {maxLength} caracteres
          </span>
          {isAtLimit && (
            <span className="flex items-center gap-1 text-red-600">
              <AlertCircle className="w-4 h-4" />
              Limite atingido
            </span>
          )}
        </div>
      </div>

      {/* Position Selection */}
      {positions.length > 1 && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Posição do Texto
          </label>
          <div className="grid grid-cols-2 gap-2">
            {positions.map((pos) => (
              <button
                key={pos}
                type="button"
                onClick={() => handlePositionChange(pos)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedPosition === pos
                    ? 'border-primary bg-primary/5 text-primary font-medium'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      {text && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Pré-visualização:</p>
          <p className="text-lg font-medium text-gray-900 break-words">
            {text}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Posição: {selectedPosition}
          </p>
        </div>
      )}

      {/* Info */}
      <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900">
          <p className="font-medium">Nota importante:</p>
          <p className="text-blue-700 mt-1">
            Produtos personalizados não podem ser devolvidos ou trocados, exceto em caso de defeito.
          </p>
        </div>
      </div>
    </div>
  )
}

