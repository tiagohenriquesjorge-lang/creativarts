'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, Image as ImageIcon, Star } from 'lucide-react'
import { uploadImage, deleteImage, extractPathFromUrl } from '@/lib/supabase/storage'

interface ImageItem {
  url: string
  is_primary: boolean
  position: number
}

interface MultipleImageUploadProps {
  images: ImageItem[]
  onImagesChange: (images: ImageItem[]) => void
  maxImages?: number
}

export default function MultipleImageUpload({
  images,
  onImagesChange,
  maxImages = 5,
}: MultipleImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(files: FileList | null) {
    if (!files || files.length === 0) return

    // Verificar limite
    if (images.length + files.length > maxImages) {
      setError(`Máximo de ${maxImages} imagens permitidas`)
      return
    }

    setError(null)
    setUploading(true)

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const result = await uploadImage(file, 'PRODUCTS', 'products')
        
        if ('error' in result) {
          throw new Error(result.error)
        }
        
        return {
          url: result.url,
          is_primary: images.length === 0, // Primeira imagem é primária
          position: images.length,
        }
      })

      const newImages = await Promise.all(uploadPromises)
      onImagesChange([...images, ...newImages])
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer upload')
    } finally {
      setUploading(false)
    }
  }

  async function handleRemove(index: number) {
    if (!confirm('Tem certeza que deseja remover esta imagem?')) return

    setUploading(true)
    setError(null)

    try {
      const imageToRemove = images[index]
      
      // Extrair path da URL
      const path = extractPathFromUrl(imageToRemove.url, 'PRODUCTS')
      
      if (path) {
        // Apagar do storage
        const result = await deleteImage('PRODUCTS', path)
        
        if (!result.success) {
          setError(result.error || 'Erro ao remover imagem')
          return
        }
      }

      // Remover da lista
      const newImages = images.filter((_, i) => i !== index)
      
      // Reajustar posições
      const reindexed = newImages.map((img, i) => ({
        ...img,
        position: i,
        is_primary: i === 0 ? true : img.is_primary, // Se removeu a primária, primeira vira primária
      }))

      onImagesChange(reindexed)
    } catch (err: any) {
      setError(err.message || 'Erro ao remover imagem')
    } finally {
      setUploading(false)
    }
  }

  function setPrimary(index: number) {
    const newImages = images.map((img, i) => ({
      ...img,
      is_primary: i === index,
    }))
    onImagesChange(newImages)
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

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files)
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Imagens do Produto ({images.length}/{maxImages})
      </label>

      {/* Grid de Imagens */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                <Image
                  src={image.url}
                  alt={`Imagem ${index + 1}`}
                  fill
                  className="object-cover"
                />

                {/* Badge Primária */}
                {image.is_primary && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded">
                    Principal
                  </div>
                )}
              </div>

              {/* Botões de Ação */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                {!image.is_primary && (
                  <button
                    type="button"
                    onClick={() => setPrimary(index)}
                    className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    title="Definir como principal"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  title="Remover"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            relative w-full h-48 border-2 border-dashed rounded-lg
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
                  {dragActive ? 'Solte as imagens aqui' : 'Clique ou arraste imagens'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG ou WebP (máx. 5MB cada)
                </p>
                <p className="text-xs text-gray-500">
                  Pode adicionar até {maxImages - images.length} imagens
                </p>
              </div>
            </>
          )}

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            onChange={(e) => handleFileChange(e.target.files)}
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
        A primeira imagem será a imagem principal. Clique na estrela para mudar.
      </p>
    </div>
  )
}

