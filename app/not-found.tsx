import Link from 'next/link'
import { Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-yellow/10 via-brand-blue/10 to-brand-red/10 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-blue to-brand-yellow">
            404
          </h1>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
          <div className="w-20 h-20 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-10 w-10 text-brand-gray-dark" aria-hidden="true" />
          </div>

          <h2 className="text-3xl font-heading font-bold text-brand-gray-dark mb-4">
            Página Não Encontrada
          </h2>

          <p className="text-lg text-brand-gray-dark/70 mb-8">
            Desculpe, não conseguimos encontrar a página que procura. 
            Talvez tenha sido movida ou o link esteja incorreto.
          </p>

          {/* Suggestions */}
          <div className="bg-brand-gray-light rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-brand-gray-dark mb-3">
              Sugestões:
            </h3>
            <ul className="text-left space-y-2 text-brand-gray-dark/70">
              <li>• Verifique se o endereço está correto</li>
              <li>• Volte à página anterior</li>
              <li>• Explore os nossos produtos</li>
              <li>• Use a pesquisa para encontrar o que procura</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Voltar à Página Inicial
            </Link>
            <Link href="/produtos" className="btn-secondary">
              Ver Produtos
            </Link>
          </div>
        </div>

        {/* Popular Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/produtos" className="text-brand-blue hover:underline">
            Produtos
          </Link>
          <span className="text-brand-gray-dark/30">•</span>
          <Link href="/categorias" className="text-brand-blue hover:underline">
            Categorias
          </Link>
          <span className="text-brand-gray-dark/30">•</span>
          <Link href="/sobre" className="text-brand-blue hover:underline">
            Sobre
          </Link>
          <span className="text-brand-gray-dark/30">•</span>
          <Link href="/contactos" className="text-brand-blue hover:underline">
            Contactos
          </Link>
        </div>
      </div>
    </div>
  )
}

