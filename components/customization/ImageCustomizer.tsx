'use client'

import { useState, useRef } from 'react'
import { Upload, X, AlertCircle, Image as ImageIcon, Check } from 'lucide-react'
import { uploadImage } from '@/lib/supabase/storage'

interface ImageCustomizerProps {
  maxSizeMB?: number
  value?: string
  onImageChange: (imageUrl: string | null, file: File | null) => void
}

export default function ImageCustomizer({
  maxSizeMB = 5,
  value,
  onImageChange,
}: ImageCustomizerProps) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setError(null)

    // Validate file type
    if (!selectedFile.type.startsWith('image/')) {
      setError('Por favor, selecione apenas ficheiros de imagem (JPG, PNG, etc.)')
      return
    }

    // Validate file size
    const fileSizeMB = selectedFile.size / (1024 * 1024)
    if (fileSizeMB > maxSizeMB) {
      setError(`O ficheiro é muito grande. Tamanho máximo: ${maxSizeMB}MB`)
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
      setFile(selectedFile)
      onImageChange(reader.result as string, selectedFile)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleRemove = () => {
    setPreview(null)
    setFile(null)
    setError(null)
    onImageChange(null, null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-gray-900">Personalizar com Imagem</h3>
      </div>

      {/* Upload Area */}
      {!preview ? (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <button
            type="button"
            onClick={handleUploadClick}
            disabled={uploading}
            className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                <Upload className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-900">
                  Clique para fazer upload
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  PNG, JPG, GIF até {maxSizeMB}MB
                </p>
              </div>
            </div>
          </button>
        </div>
      ) : (
        /* Preview */
        <div className="relative">
          <div className="relative aspect-square w-full max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-gray-200">
            <img
              src={preview}
              alt="Preview da imagem personalizada"
              className="w-full h-full object-contain bg-gray-50"
            />
          </div>
          
          {/* Remove Button */}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* File Info */}
          {file && (
            <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-green-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-green-700">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-900">{error}</p>
        </div>
      )}

      {/* Guidelines */}
      <div className="space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-900">Recomendações:</p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Use imagens de alta qualidade (mínimo 300 DPI)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Formatos PNG com fundo transparente funcionam melhor</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Evite imagens com direitos de autor</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

