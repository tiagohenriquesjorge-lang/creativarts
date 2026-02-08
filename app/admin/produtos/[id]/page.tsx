'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'
import MultipleImageUpload from '@/components/admin/MultipleImageUpload'
import { deleteImage, extractPathFromUrl } from '@/lib/supabase/storage'

interface Category {
  id: string
  name: string
}

interface ImageItem {
  url: string
  is_primary: boolean
  position: number
}

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [images, setImages] = useState<ImageItem[]>([])
  const [originalImages, setOriginalImages] = useState<ImageItem[]>([])

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    short_description: '',
    category_id: '',
    base_price: '',
    is_customizable: false,
    is_active: true,
    featured: false,
    tags: '',
  })

  useEffect(() => {
    loadCategories()
    loadProduct()
  }, [productId])

  async function loadCategories() {
    const { data } = await supabase
      .from('categories')
      .select('id, name')
      .eq('is_active', true)
      .order('name')
    
    setCategories(data || [])
  }

  async function loadProduct() {
    try {
      // Carregar produto
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()

      if (error) throw error

      if (data) {
        setFormData({
          name: data.name || '',
          slug: data.slug || '',
          description: data.description || '',
          short_description: data.short_description || '',
          category_id: data.category_id || '',
          base_price: data.base_price?.toString() || '',
          is_customizable: data.is_customizable || false,
          is_active: data.is_active || false,
          featured: data.featured || false,
          tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
        })
      }

      // Carregar imagens do produto
      const { data: productImages, error: imagesError } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', productId)
        .order('position')

      if (!imagesError && productImages) {
        const imageItems: ImageItem[] = productImages.map((img) => ({
          url: img.image_url,
          is_primary: img.is_primary,
          position: img.position,
        }))
        setImages(imageItems)
        setOriginalImages(imageItems) // Guardar cópia para comparar depois
      }
    } catch (error) {
      console.error('Error loading product:', error)
      alert('Erro ao carregar produto')
    } finally {
      setLoading(false)
    }
  }

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  function handleNameChange(name: string) {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      // 1. Atualizar produto
      const { error: productError } = await supabase
        .from('products')
        .update({
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          short_description: formData.short_description,
          category_id: formData.category_id || null,
          base_price: parseFloat(formData.base_price),
          is_customizable: formData.is_customizable,
          is_active: formData.is_active,
          featured: formData.featured,
          tags: tagsArray,
        })
        .eq('id', productId)

      if (productError) throw productError

      // 2. Atualizar imagens
      await updateProductImages()

      alert('Produto atualizado com sucesso!')
      router.push('/admin/produtos')
    } catch (error: any) {
      console.error('Error updating product:', error)
      alert(`Erro ao atualizar produto: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  async function updateProductImages() {
    try {
      // Encontrar imagens removidas
      const removedImages = originalImages.filter(
        (original) => !images.find((current) => current.url === original.url)
      )

      // Apagar imagens removidas do storage
      for (const img of removedImages) {
        const path = extractPathFromUrl(img.url, 'PRODUCTS')
        if (path) {
          await deleteImage('PRODUCTS', path)
        }
      }

      // Apagar todos os registros de imagens antigas
      await supabase
        .from('product_images')
        .delete()
        .eq('product_id', productId)

      // Inserir novos registros de imagens
      if (images.length > 0) {
        const imageRecords = images.map((img) => ({
          product_id: productId,
          image_url: img.url,
          position: img.position,
          is_primary: img.is_primary,
        }))

        const { error: imagesError } = await supabase
          .from('product_images')
          .insert(imageRecords)

        if (imagesError) {
          console.error('Error saving images:', imagesError)
        }
      }
    } catch (error) {
      console.error('Error updating images:', error)
      // Não falhar a atualização do produto se imagens falharem
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">A carregar produto...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/produtos"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar Produto</h1>
          <p className="text-gray-600 mt-1">Modificar informações do produto</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Produto *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Ex: Caneca Personalizada"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug (URL) *
          </label>
          <input
            type="text"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="caneca-personalizada"
          />
          <p className="text-xs text-gray-500 mt-1">
            URL amigável para o produto (gerado automaticamente)
          </p>
        </div>

        {/* Descrição Curta */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição Curta
          </label>
          <textarea
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Breve descrição do produto..."
          />
        </div>

        {/* Descrição Completa */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição Completa
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Descrição detalhada do produto..."
          />
        </div>

        {/* Upload de Imagens */}
        <MultipleImageUpload
          images={images}
          onImagesChange={setImages}
          maxImages={5}
        />

        {/* Grid: Categoria e Preço */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Preço */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preço Base (€) *
            </label>
            <input
              type="number"
              required
              step="0.01"
              min="0"
              value={formData.base_price}
              onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="19.99"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="caneca, personalizado, presente (separado por vírgulas)"
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.is_customizable}
              onChange={(e) => setFormData({ ...formData, is_customizable: e.target.checked })}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Produto personalizável
            </span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Produto em destaque
            </span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Produto ativo (visível no site)
            </span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <Link
            href="/admin/produtos"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                A guardar...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Guardar Alterações
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

