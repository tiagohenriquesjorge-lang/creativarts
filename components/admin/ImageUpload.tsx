'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { uploadImage, deleteImage, STORAGE_BUCKETS, extractPathFromUrl } from '@/lib/supabase/storage'

interface ImageUploadProps {
  bucket: keyof typeof STORAGE_BUCKETS
  currentImageUrl?: string
  onImageUploaded: (url: string) => void
  onImageRemoved?: () => void
  label?: string
  folder?: string
}

export default function ImageUpload({
  bucket,
  currentImageUrl,
  onImageUploaded,
  onImageRemoved,
  label = 'Imagem',
  folder,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(file: File | null) {
    if (!file) return

    setError(null)
    setUploading(true)

    try {
      // Criar preview local
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload para Supabase
      const result = await uploadImage(file, bucket, folder)

      if ('error' in result) {
        setError(result.error)
        setPreview(currentImageUrl || null)
      } else {
        onImageUploaded(result.url)
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer upload')
      setPreview(currentImageUrl || null)
    } finally {
      setUploading(false)
    }
  }

  async function handleRemove() {
    if (!currentImageUrl) return

    if (!confirm('Tem certeza que deseja remover esta imagem?')) return

    setUploading(true)
    setError(null)

    try {
      // Extrair path da URL
      const path = extractPathFromUrl(currentImageUrl, bucket)
      
      if (path) {
        // Apagar do storage
        const result = await deleteImage(bucket, path)
        
        if (!result.success) {
          setError(result.error || 'Erro ao remover imagem')
          return
        }
      }

      // Limpar preview e notificar
      setPreview(null)
      if (onImageRemoved) {
        onImageRemoved()
      } else {
        onImageUploaded('')
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao remover imagem')
    } finally {
      setUploading(false)
    }
  }

  function handleDrag(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* Preview ou Upload Area */}
      {preview ? (
        <div className="relative group">
          <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
          
          {/* Botão Remover */}
          {!uploading && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
              title="Remover imagem"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Loading Overlay */}
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
        </div>
      ) : (
        // Upload Area
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            relative w-full h-64 border-2 border-dashed rounded-lg
            flex flex-col items-center justify-center gap-4
            transition-colors cursor-pointer
            ${dragActive
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
            }
            ${uploading ? 'pointer-events-none opacity-50' : ''}
          `}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? (
            <>
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
              <p className="text-sm text-gray-600">A fazer upload...</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                {dragActive ? (
                  <Upload className="w-8 h-8 text-purple-600" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-purple-600" />
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  {dragActive ? 'Solte a imagem aqui' : 'Clique ou arraste uma imagem'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG ou WebP (máx. 5MB)
                </p>
              </div>
            </>
          )}

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            className="hidden"
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Helper Text */}
      <p className="text-xs text-gray-500">
        Recomendado: 800x800px ou superior para melhor qualidade
      </p>
    </div>
  )
}

