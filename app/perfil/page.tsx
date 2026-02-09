'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CustomerAuthGuard from '@/components/auth/CustomerAuthGuard'
import { getCurrentUser, updateProfile, updatePassword, signOut } from '@/lib/auth/customerAuth'
import { useToastStore } from '@/store/toastStore'
import { User, Mail, Phone, Lock, LogOut, Package, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  return (
    <CustomerAuthGuard>
      <ProfileContent />
    </CustomerAuthGuard>
  )
}

function ProfileContent() {
  const router = useRouter()
  const toast = useToastStore()

  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile')

  // Profile form
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [isSavingProfile, setIsSavingProfile] = useState(false)

  // Password form
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSavingPassword, setIsSavingPassword] = useState(false)

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    const currentUser = await getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      setFullName(currentUser.user_metadata?.full_name || '')
      setPhone(currentUser.user_metadata?.phone || '')
    }
    setIsLoading(false)
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName.trim()) {
      toast.error('Nome é obrigatório')
      return
    }

    setIsSavingProfile(true)

    const result = await updateProfile(fullName, phone)

    if (result.success) {
      toast.success('Perfil atualizado com sucesso!')
      loadUser()
    } else {
      toast.error(result.error || 'Erro ao atualizar perfil')
    }

    setIsSavingProfile(false)
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newPassword || newPassword.length < 6) {
      toast.error('Password deve ter pelo menos 6 caracteres')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('As passwords não coincidem')
      return
    }

    setIsSavingPassword(true)

    const result = await updatePassword(newPassword)

    if (result.success) {
      toast.success('Password atualizada com sucesso!')
      setNewPassword('')
      setConfirmPassword('')
    } else {
      toast.error(result.error || 'Erro ao atualizar password')
    }

    setIsSavingPassword(false)
  }

  const handleLogout = async () => {
    const result = await signOut()
    if (result.success) {
      toast.success('Logout efetuado com sucesso!')
      router.push('/')
    } else {
      toast.error('Erro ao fazer logout')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-brand-blue border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-gray-light/30 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-brand-gray-dark mb-2">
            Minha Conta
          </h1>
          <p className="text-brand-gray-dark/70">
            Gerir os seus dados pessoais e preferências
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border-2 border-brand-gray-light p-4 space-y-2">
              <Link
                href="/perfil"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-brand-blue/10 text-brand-blue font-medium"
              >
                <User className="h-5 w-5" />
                Perfil
              </Link>
              <Link
                href="/encomendas"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brand-gray-light/50 text-brand-gray-dark transition-colors"
              >
                <Package className="h-5 w-5" />
                Encomendas
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Sair
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border-2 border-brand-gray-light p-6">
              {/* Tabs */}
              <div className="flex gap-4 border-b-2 border-brand-gray-light mb-6">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`pb-3 px-4 font-medium transition-colors ${
                    activeTab === 'profile'
                      ? 'border-b-2 border-brand-blue text-brand-blue -mb-0.5'
                      : 'text-brand-gray-dark/60 hover:text-brand-gray-dark'
                  }`}
                >
                  Dados Pessoais
                </button>
                <button
                  onClick={() => setActiveTab('password')}
                  className={`pb-3 px-4 font-medium transition-colors ${
                    activeTab === 'password'
                      ? 'border-b-2 border-brand-blue text-brand-blue -mb-0.5'
                      : 'text-brand-gray-dark/60 hover:text-brand-gray-dark'
                  }`}
                >
                  Alterar Password
                </button>
              </div>

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-gray-dark mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray-dark/40" />
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="input-field pl-10 bg-brand-gray-light/30 cursor-not-allowed"
                      />
                    </div>
                    <p className="mt-1 text-xs text-brand-gray-dark/60">
                      O email não pode ser alterado
                    </p>
                  </div>

                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-brand-gray-dark mb-2">
                      Nome Completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray-dark/40" />
                      <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="input-field pl-10"
                        placeholder="João Silva"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-gray-dark mb-2">
                      Telefone (opcional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray-dark/40" />
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input-field pl-10"
                        placeholder="+351 912 345 678"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingProfile}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSavingProfile ? 'A guardar...' : 'Guardar Alterações'}
                  </button>
                </form>
              )}

              {/* Password Tab */}
              {activeTab === 'password' && (
                <form onSubmit={handleUpdatePassword} className="space-y-6">
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-brand-gray-dark mb-2">
                      Nova Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray-dark/40" />
                      <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input-field pl-10"
                        placeholder="••••••••"
                      />
                    </div>
                    <p className="mt-1 text-xs text-brand-gray-dark/60">
                      Mínimo 6 caracteres
                    </p>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-brand-gray-dark mb-2">
                      Confirmar Nova Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray-dark/40" />
                      <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input-field pl-10"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingPassword}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSavingPassword ? 'A atualizar...' : 'Atualizar Password'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

