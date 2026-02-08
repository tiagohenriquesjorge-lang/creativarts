'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react'
import MiniCart from '@/components/cart/MiniCart'
import { useCartStore } from '@/store/cartStore'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const cartItemsCount = useCartStore((state) => 
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  )

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
            <Link
              href="/conta"
              className="hidden sm:block p-2 text-brand-gray-dark hover:text-primary transition-colors focus-visible-ring rounded-lg"
              aria-label="Minha conta"
            >
              <User className="h-6 w-6" aria-hidden="true" />
            </Link>

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

