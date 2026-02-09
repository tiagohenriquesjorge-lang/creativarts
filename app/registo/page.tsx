'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signUp, getCurrentUser } from '@/lib/auth/customerAuth'
import { useToastStore } from '@/store/toastStore'
import { Mail, Lock, Eye, EyeOff, UserPlus, User } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const toast = useToastStore()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{
    fullName?: string
    email?: string
    password?: string
    confirmPassword?: string
  }>({})

  // Check if already logged in
  useEffect(() => {
    checkIfLoggedIn()
  }, [])

  const checkIfLoggedIn = async () => {
    const user = await getCurrentUser()
    if (user) {
      router.push('/perfil')
    }
  }

  const validate = () => {
    const newErrors: any = {}

    if (!fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório'
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Nome deve ter pelo menos 3 caracteres'
    }

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido'
    }

    if (!password) {
      newErrors.password = 'Password é obrigatória'
    } else if (password.length < 6) {
      newErrors.password = 'Password deve ter pelo menos 6 caracteres'
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirme a password'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As passwords não coincidem'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setIsLoading(true)

    try {
      const result = await signUp(email, password, fullName)

      if (!result.success) {
        toast.error(result.error || 'Erro ao criar conta')
        setIsLoading(false)
        return
      }

      toast.success('Conta criada com sucesso! Verifique o seu email.')
      
      // Redirect to login
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (error) {
      console.error('Register error:', error)
      toast.error('Erro ao criar conta. Tente novamente.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-yellow/10 to-brand-blue/10 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-brand-gray-dark mb-2">
            Criar Conta
          </h1>
          <p className="text-brand-gray-dark/70">
            Junte-se a nós e comece a personalizar!
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-lg border-2 border-brand-gray-light p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
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
                  className={`input-field pl-10 ${errors.fullName ? 'border-red-500' : ''}`}
                  placeholder="João Silva"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-gray-dark mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray-dark/40" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="seu@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-brand-gray-dark mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray-dark/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`input-field pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray-dark/40 hover:text-brand-gray-dark"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-brand-gray-dark mb-2">
                Confirmar Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray-dark/40" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`input-field pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray-dark/40 hover:text-brand-gray-dark"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  A criar conta...
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  Criar Conta
                </>
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-brand-gray-dark/70">
              Já tem conta?{' '}
              <Link href="/login" className="text-brand-blue hover:underline font-medium">
                Fazer login
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-brand-gray-dark/70 hover:text-brand-blue hover:underline">
            ← Voltar à loja
          </Link>
        </div>
      </div>
    </div>
  )
}

