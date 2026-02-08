'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAdmin, onAuthStateChange } from '@/lib/auth/adminAuth'
import { Loader2 } from 'lucide-react'

interface AdminGuardProps {
  children: React.ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    checkAuth()

    // Escutar mudanças no estado de autenticação
    const { data: { subscription } } = onAuthStateChange(async (event) => {
      if (event === 'SIGNED_OUT') {
        router.push('/admin/login')
      } else if (event === 'SIGNED_IN') {
        await checkAuth()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function checkAuth() {
    try {
      const adminStatus = await isAdmin()
      
      if (!adminStatus) {
        router.push('/admin/login')
        return
      }
      
      setAuthorized(true)
    } catch (error) {
      console.error('Auth check error:', error)
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">A verificar permissões...</p>
        </div>
      </div>
    )
  }

  if (!authorized) {
    return null
  }

  return <>{children}</>
}

