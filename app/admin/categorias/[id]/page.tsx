'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

interface Category {
  id: string
  name: string
}

export default function EditCategoryPage() {
  const router = useRouter()
  const params = useParams()
  const categoryId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image_url: '',
    parent_id: '',
    position: '0',
    is_active: true,
  })

  useEffect(() => {
    loadCategories()
    loadCategory()
  }, [categoryId])

  async function loadCategories() {
    const { data } = await supabase
      .from('categories')
      .select('id, name')
      .eq('is_active', true)
      .neq('id', categoryId) // Não mostrar a própria categoria como pai
      .order('name')
    
    setCategories(data || [])
  }

  async function loadCategory() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', categoryId)
        .single()

      if (error) throw error

      if (data) {
        setFormData({
          name: data.name || '',
          slug: data.slug || '',
          description: data.description || '',
          image_url: data.image_url || '',
          parent_id: data.parent_id || '',
          position: data.position?.toString() || '0',
          is_active: data.is_active || false,
        })
      }
    } catch (error) {
      console.error('Error loading category:', error)
      alert('Erro ao carregar categoria')
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
      const { error } = await supabase
        .from('categories')
        .update({
          name: formData.name,
          slug: formData.slug,
          description: formData.description || null,
          image_url: formData.image_url || null,
          parent_id: formData.parent_id || null,
          position: parseInt(formData.position),
          is_active: formData.is_active,
        })
        .eq('id', categoryId)

      if (error) throw error

      alert('Categoria atualizada com sucesso!')
      router.push('/admin/categorias')
    } catch (error: any) {
      console.error('Error updating category:', error)
      alert(`Erro ao atualizar categoria: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">A carregar categoria...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/categorias"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar Categoria</h1>
          <p className="text-gray-600 mt-1">Modificar informações da categoria</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome da Categoria *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Ex: Canecas"
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
            placeholder="canecas"
          />
          <p className="text-xs text-gray-500 mt-1">
            URL amigável para a categoria (gerado automaticamente)
          </p>
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Breve descrição da categoria..."
          />
        </div>

        {/* URL da Imagem */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL da Imagem
          </label>
          <input
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="https://exemplo.com/imagem.jpg"
          />
          <p className="text-xs text-gray-500 mt-1">
            URL completo da imagem da categoria
          </p>
        </div>

        {/* Grid: Categoria Pai e Posição */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Categoria Pai */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria Pai
            </label>
            <select
              value={formData.parent_id}
              onChange={(e) => setFormData({ ...formData, parent_id: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Nenhuma (categoria principal)</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Para criar subcategorias
            </p>
          </div>

          {/* Posição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Posição
            </label>
            <input
              type="number"
              min="0"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">
              Ordem de exibição (menor = primeiro)
            </p>
          </div>
        </div>

        {/* Ativa */}
        <div>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Categoria ativa (visível no site)
            </span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <Link
            href="/admin/categorias"
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

