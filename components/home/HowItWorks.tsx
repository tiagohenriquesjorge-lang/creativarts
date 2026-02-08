import { Search, Palette, ShoppingBag, Truck } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Escolha o Produto',
      description: 'Navegue pelo nosso catálogo e selecione o produto que deseja personalizar',
      icon: Search,
      color: 'bg-brand-red',
    },
    {
      number: 2,
      title: 'Personalize',
      description: 'Adicione texto, imagens ou escolha entre os nossos designs pré-definidos',
      icon: Palette,
      color: 'bg-brand-blue',
    },
    {
      number: 3,
      title: 'Finalize a Compra',
      description: 'Adicione ao carrinho e complete o pagamento de forma segura',
      icon: ShoppingBag,
      color: 'bg-brand-yellow',
    },
    {
      number: 4,
      title: 'Receba em Casa',
      description: 'Produzimos e enviamos o seu produto personalizado em poucos dias',
      icon: Truck,
      color: 'bg-secondary',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="how-it-works-heading">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-heading font-bold text-brand-gray-dark mb-4">
            Como Funciona
          </h2>
          <p className="text-lg text-brand-gray-dark/70 max-w-2xl mx-auto">
            Criar o seu produto personalizado é simples e rápido
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                {/* Connector Line (hidden on mobile, shown on desktop) */}
                {index < steps.length - 1 && (
                  <div 
                    className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-brand-gray-light z-0"
                    aria-hidden="true"
                  />
                )}

                <div className="relative z-10 text-center">
                  {/* Icon Circle */}
                  <div className={`${step.color} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon className="h-12 w-12 text-white" aria-hidden="true" />
                  </div>

                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-gray-dark text-white font-bold text-sm mb-4">
                    {step.number}
                  </div>

                  {/* Content */}
                  <h3 className="font-heading font-semibold text-xl text-brand-gray-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-brand-gray-dark/70">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

