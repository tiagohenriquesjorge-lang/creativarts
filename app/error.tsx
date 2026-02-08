'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-gray-light px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Icon */}
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-primary" aria-hidden="true" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-heading font-bold text-brand-gray-dark mb-2">
            Algo correu mal
          </h1>

          {/* Description */}
          <p className="text-brand-gray-dark/70 mb-6">
            Pedimos desculpa pelo inconveniente. Ocorreu um erro inesperado.
          </p>

          {/* Error details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-brand-gray-light p-4 rounded-lg mb-6 text-left">
              <p className="text-xs font-mono text-brand-gray-dark break-all">
                {error.message}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="btn-primary"
            >
              Tentar Novamente
            </button>
            <Link href="/" className="btn-outline">
              Voltar à Página Inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

