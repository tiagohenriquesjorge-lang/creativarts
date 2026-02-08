import { Metadata } from 'next'
import CartPageClient from '@/components/cart/CartPageClient'

export const metadata: Metadata = {
  title: 'Carrinho de Compras',
  description: 'Reveja os seus produtos e finalize a compra',
}

export default function CartPage() {
  return (
    <div className="min-h-screen bg-brand-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-heading font-bold text-brand-gray-dark mb-8">
          Carrinho de Compras
        </h1>
        
        <CartPageClient />
      </div>
    </div>
  )
}

