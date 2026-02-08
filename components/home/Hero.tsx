import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section 
      className="relative bg-gradient-to-br from-brand-yellow via-brand-blue/10 to-brand-red/10 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="container-custom py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Sparkles className="h-5 w-5 text-brand-yellow" aria-hidden="true" />
              <span className="text-sm font-semibold text-brand-gray-dark">
                Personalização Criativa
              </span>
            </div>

            <h1 
              id="hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-brand-gray-dark leading-tight"
            >
              Transforme as suas{' '}
              <span className="text-brand-red">ideias</span> em{' '}
              <span className="text-brand-blue">produtos únicos</span>
            </h1>

            <p className="text-lg md:text-xl text-brand-gray-dark/80 max-w-2xl mx-auto lg:mx-0">
              Crie t-shirts, bonés, porta-chaves, canetas e impressões 3D personalizadas. 
              Qualidade premium, entrega rápida e criatividade sem limites.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link 
                href="/produtos" 
                className="btn-primary inline-flex items-center justify-center group"
              >
                Explorar Produtos
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              
              <Link 
                href="/como-funciona" 
                className="btn-outline inline-flex items-center justify-center"
              >
                Como Funciona
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-8 text-sm text-brand-gray-dark/70">
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Envio Grátis acima de 50€</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Qualidade Garantida</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Suporte Dedicado</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual/Image */}
          <div className="relative lg:h-[500px] animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/20 via-brand-blue/20 to-brand-red/20 rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 flex items-center justify-center h-full">
              {/* Placeholder for hero image - replace with actual product showcase */}
              <div className="text-center space-y-4">
                <div className="w-64 h-64 mx-auto bg-gradient-to-br from-brand-yellow via-brand-blue to-brand-red rounded-full opacity-20"></div>
                <p className="text-brand-gray-dark/60 text-sm">
                  [Imagem de produtos personalizados]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-brand-yellow rounded-full opacity-20 blur-xl" aria-hidden="true"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-brand-blue rounded-full opacity-20 blur-xl" aria-hidden="true"></div>
    </section>
  )
}

