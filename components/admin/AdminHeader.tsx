'use client'

import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/lib/auth/adminAuth'
import { User, Bell } from 'lucide-react'

export default function AdminHeader() {
  const [userEmail, setUserEmail] = useState<string>('')

  useEffect(() => {
    loadUser()
  }, [])

  async function loadUser() {
    const user = await getCurrentUser()
    if (user?.email) {
      setUserEmail(user.email)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - could add breadcrumbs here */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Bem-vindo ao Painel de Administração
          </h2>
        </div>

        {/* Right side - User info */}
        <div className="flex items-center gap-4">
          {/* Notifications (placeholder) */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5" />
            {/* Notification badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">Admin</p>
              <p className="text-xs text-gray-500">{userEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

