import { Metadata } from 'next'
import AdminGuard from '@/components/admin/AdminGuard'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export const metadata: Metadata = {
  title: 'Admin - CreativART\'s',
  description: 'Painel de administração CreativART\'s',
  robots: 'noindex, nofollow', // Não indexar páginas de admin
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <AdminSidebar />
        
        {/* Main Content */}
        <div className="lg:pl-64">
          {/* Header */}
          <AdminHeader />
          
          {/* Page Content */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  )
}

