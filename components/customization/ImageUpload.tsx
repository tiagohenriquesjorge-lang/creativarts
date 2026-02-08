'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, AlertCircle, Image as ImageIcon, Check } from 'lucide-react'

interface ImageUploadProps {
  maxSizeMB?: number
  allowedFormats?: string[]
  value: string | null
  onChange: (imageUrl: string | null, file: File | null) => void
  disabled?: boolean
}

export default function ImageUpload({
  maxSizeMB = 5,
  allowedFormats = ['image/jpeg', 'image/png', 'image/svg+xml'],
  value,
  onChange,
  disabled = false,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number): string => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!allowedFormats.includes(file.type)) {
      const formats = allowedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')
      return `Formato não suportado. Use: ${formats}`
    }

    // Check file size
    const maxBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxBytes) {
      return `Imagem muito grande. Máximo: ${maxSizeMB}MB (atual: ${formatFileSize(file.size)})`
    }

    return null
  }

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file)
    
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      setPreview(result)
      onChange(result, file)
    }
    reader.readAsDataURL(file)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleRemove = () => {
    setPreview(null)
    setError('')
    onChange(null, null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <ImageIcon className="h-5 w-5 text-brand-blue" />
        <h3 className="font-heading font-semibold text-lg">Adicionar Imagem</h3>
      </div>

      {/* Upload Area */}
      {!preview ? (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-all duration-200
            ${isDragging 
              ? 'border-brand-blue bg-brand-blue/5 scale-[1.02]' 
              : 'border-brand-gray-light hover:border-brand-blue hover:bg-brand-gray-light/30'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={allowedFormats.join(',')}
            onChange={handleFileInputChange}
            disabled={disabled}
            className="hidden"
          />

          <Upload className="h-12 w-12 mx-auto mb-4 text-brand-gray-dark/40" />
          
          <p className="text-brand-gray-dark font-medium mb-1">
            Clique para fazer upload ou arraste a imagem
          </p>
          <p className="text-sm text-brand-gray-dark/60">
            {allowedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')} até {maxSizeMB}MB
          </p>
        </div>
      ) : (
        /* Preview */
        <div className="relative bg-brand-gray-light/30 rounded-lg p-4 border-2 border-brand-gray-light">
          <button
            onClick={handleRemove}
            disabled={disabled}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-brand-red hover:text-white transition-colors z-10"
            aria-label="Remover imagem"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative aspect-square max-w-xs mx-auto rounded-lg overflow-hidden bg-white">
            <Image
              src={preview}
              alt="Preview da imagem personalizada"
              fill
              className="object-contain"
            />
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600">
            <Check className="h-4 w-4" />
            <span>Imagem carregada com sucesso</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-brand-red/10 border border-brand-red/20 rounded-lg text-brand-red text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Info */}
      <div className="bg-brand-yellow/10 rounded-lg p-3 text-sm text-brand-gray-dark/80">
        <p className="flex items-start gap-2">
          <span className="text-brand-yellow mt-0.5">⚠️</span>
          <span>
            Para melhores resultados, use imagens com fundo transparente (PNG) e alta resolução.
          </span>
        </p>
      </div>
    </div>
  )
}

