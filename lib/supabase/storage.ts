import { supabase } from './client'

// Configuração dos buckets
export const STORAGE_BUCKETS = {
  PRODUCTS: 'product-images',
  CATEGORIES: 'category-images',
} as const

// Configuração de validação
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

/**
 * Valida um arquivo de imagem
 */
export function validateImage(file: File): { valid: boolean; error?: string } {
  // Verificar tipo
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Formato inválido. Use JPG, PNG ou WebP.',
    }
  }

  // Verificar tamanho
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'Arquivo muito grande. Máximo: 5MB.',
    }
  }

  return { valid: true }
}

/**
 * Gera um nome único para o arquivo
 */
function generateFileName(originalName: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 9)
  const extension = originalName.split('.').pop()
  return `${timestamp}-${random}.${extension}`
}

/**
 * Faz upload de uma imagem para o Supabase Storage
 */
export async function uploadImage(
  file: File,
  bucket: keyof typeof STORAGE_BUCKETS,
  folder?: string
): Promise<{ url: string; path: string } | { error: string }> {
  try {
    // Validar arquivo
    const validation = validateImage(file)
    if (!validation.valid) {
      return { error: validation.error! }
    }

    // Gerar nome único
    const fileName = generateFileName(file.name)
    const filePath = folder ? `${folder}/${fileName}` : fileName

    // Upload para Supabase Storage
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKETS[bucket])
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Upload error:', error)
      return { error: `Erro ao fazer upload: ${error.message}` }
    }

    // Obter URL pública
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKETS[bucket])
      .getPublicUrl(data.path)

    return {
      url: urlData.publicUrl,
      path: data.path,
    }
  } catch (error: any) {
    console.error('Upload exception:', error)
    return { error: `Erro inesperado: ${error.message}` }
  }
}

/**
 * Apaga uma imagem do Supabase Storage
 */
export async function deleteImage(
  bucket: keyof typeof STORAGE_BUCKETS,
  path: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKETS[bucket])
      .remove([path])

    if (error) {
      console.error('Delete error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Delete exception:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Obtém a URL pública de uma imagem
 */
export function getPublicUrl(
  bucket: keyof typeof STORAGE_BUCKETS,
  path: string
): string {
  const { data } = supabase.storage
    .from(STORAGE_BUCKETS[bucket])
    .getPublicUrl(path)

  return data.publicUrl
}

/**
 * Extrai o path de uma URL do Supabase Storage
 */
export function extractPathFromUrl(url: string, bucket: keyof typeof STORAGE_BUCKETS): string | null {
  try {
    const bucketName = STORAGE_BUCKETS[bucket]
    const pattern = new RegExp(`/storage/v1/object/public/${bucketName}/(.+)`)
    const match = url.match(pattern)
    return match ? match[1] : null
  } catch {
    return null
  }
}

