'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { Plus, Search, Edit, Trash2, Eye, EyeOff, FolderTree } from 'lucide-react'
import Image from 'next/image'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  parent_id: string | null
  position: number
  is_active: boolean
  created_at: string
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('position', { ascending: true })

      if (error) throw error

      setCategories(data || [])
    } catch (error) {
      console.error('Error loading categories:', error)
    } finally {
      setLoading(false)
    }
  }

  async function toggleCategoryStatus(id: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('categories')
        .update({ is_active: !currentStatus })
        .eq('id', id)

      if (error) throw error

      setCategories(categories.map(c => 
        c.id === id ? { ...c, is_active: !currentStatus } : c
      ))
    } catch (error) {
      console.error('Error toggling category status:', error)
      alert('Erro ao atualizar status da categoria')
    }
  }

  async function deleteCategory(id: string, name: string) {
    if (!confirm(`Tem certeza que deseja apagar a categoria "${name}"?`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)

      if (error) throw error

      setCategories(categories.filter(c => c.id !== id))
      alert('Categoria apagada com sucesso!')
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Erro ao apagar categoria')
    }
  }

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">A carregar categorias...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
          <p className="text-gray-600 mt-1">{categories.length} categorias no total</p>
        </div>
        <Link
          href="/admin/categorias/novo"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          Adicionar Categoria
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar categorias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            Nenhuma categoria encontrada
          </div>
        ) : (
          filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onToggleStatus={toggleCategoryStatus}
              onDelete={deleteCategory}
            />
          ))
        )}
      </div>
    </div>
  )
}

// Componente para cada card de categoria
function CategoryCard({
  category,
  onToggleStatus,
  onDelete
}: {
  category: Category
  onToggleStatus: (id: string, currentStatus: boolean) => void
  onDelete: (id: string, name: string) => void
}) {
  const imageUrl = category.image_url || '/placeholder-category.jpg'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative w-full h-40 bg-gray-100">
        <Image
          src={imageUrl}
          alt={category.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{category.name}</h3>
          <p className="text-sm text-gray-500">{category.slug}</p>
        </div>

        {category.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {category.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <button
            onClick={() => onToggleStatus(category.id, category.is_active)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
              category.is_active
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.is_active ? (
              <>
                <Eye className="w-3 h-3" />
                Ativa
              </>
            ) : (
              <>
                <EyeOff className="w-3 h-3" />
                Inativa
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <Link
              href={`/admin/categorias/${category.id}`}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Editar"
            >
              <Edit className="w-4 h-4" />
            </Link>
            <button
              onClick={() => onDelete(category.id, category.name)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Apagar"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

