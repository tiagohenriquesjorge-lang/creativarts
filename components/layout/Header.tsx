'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X, Search, User, LogOut, Package, UserCircle } from 'lucide-react'
import MiniCart from '@/components/cart/MiniCart'
import { useCartStore } from '@/store/cartStore'
import { getCurrentUser, signOut } from '@/lib/auth/customerAuth'
import { useToastStore } from '@/store/toastStore'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  const toast = useToastStore()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  const cartItemsCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    const currentUser = await getCurrentUser()
    setUser(currentUser)
    setIsLoadingUser(false)
  }

  const handleLogout = async () => {
    const result = await signOut()
    if (result.success) {
      toast.success('Logout efetuado com sucesso!')
      setUser(null)
      setUserMenuOpen(false)
      router.push('/')
    } else {
      toast.error('Erro ao fazer logout')
    }
  }

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Produtos', href: '/produtos' },
    { name: 'Categorias', href: '/categorias' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Contactos', href: '/contactos' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container-custom" aria-label="Navegação principal">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center space-x-2 focus-visible-ring rounded-lg"
              aria-label="CreativART's - Página inicial"
            >
              <div className="text-2xl md:text-3xl font-heading font-bold">
                <span className="text-brand-red">Creativ</span>
                <span className="text-brand-blue">ART's</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-brand-gray-dark hover:text-primary font-medium transition-colors focus-visible-ring rounded px-2 py-1"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              type="button"
              className="p-2 text-brand-gray-dark hover:text-primary transition-colors focus-visible-ring rounded-lg"
              aria-label="Pesquisar"
            >
              <Search className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* User Account */}
            <div className="hidden sm:block relative">
              {!isLoadingUser && (
                <>
                  {user ? (
                    <>
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="p-2 text-brand-gray-dark hover:text-primary transition-colors focus-visible-ring rounded-lg"
                        aria-label="Menu de utilizador"
                      >
                        <UserCircle className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* User Dropdown */}
                      {userMenuOpen && (
                        <>
                          {/* Backdrop */}
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setUserMenuOpen(false)}
                          />

                          {/* Menu */}
                          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border-2 border-brand-gray-light z-50">
                            <div className="p-4 border-b border-brand-gray-light">
                              <p className="font-semibold text-brand-gray-dark truncate">
                                {user.user_metadata?.full_name || 'Utilizador'}
                              </p>
                              <p className="text-sm text-brand-gray-dark/70 truncate">
                                {user.email}
                              </p>
                            </div>

                            <div className="py-2">
                              <Link
                                href="/perfil"
                                onClick={() => setUserMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-2 text-brand-gray-dark hover:bg-brand-gray-light/50 transition-colors"
                              >
                                <User className="h-4 w-4" />
                                Meu Perfil
                              </Link>
                              <Link
                                href="/encomendas"
                                onClick={() => setUserMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-2 text-brand-gray-dark hover:bg-brand-gray-light/50 transition-colors"
                              >
                                <Package className="h-4 w-4" />
                                Minhas Encomendas
                              </Link>
                            </div>

                            <div className="border-t border-brand-gray-light py-2">
                              <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <LogOut className="h-4 w-4" />
                                Sair
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="p-2 text-brand-gray-dark hover:text-primary transition-colors focus-visible-ring rounded-lg"
                      aria-label="Fazer login"
                    >
                      <User className="h-6 w-6" aria-hidden="true" />
                    </Link>
                  )}
                </>
              )}
            </div>

            {/* Cart */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-brand-gray-dark hover:text-primary transition-colors focus-visible-ring rounded-lg"
              aria-label={`Carrinho de compras, ${cartItemsCount} ${cartItemsCount === 1 ? 'item' : 'itens'}`}
            >
              <ShoppingCart className="h-6 w-6" aria-hidden="true" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 text-brand-gray-dark hover:text-primary transition-colors focus-visible-ring rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Menu de navegação"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-brand-gray-light animate-slide-down">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-brand-gray-dark hover:text-primary font-medium transition-colors focus-visible-ring rounded px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/conta"
                className="text-brand-gray-dark hover:text-primary font-medium transition-colors focus-visible-ring rounded px-2 py-1 sm:hidden"
                onClick={() => setMobileMenuOpen(false)}
              >
                Minha Conta
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Mini Cart Sidebar */}
      <MiniCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  )
}

