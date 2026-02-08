import { Star, Quote } from 'lucide-react'

export default function SocialProof() {
  const testimonials = [
    {
      id: 1,
      name: 'Maria Silva',
      role: 'Cliente',
      content: 'Adorei a qualidade das t-shirts personalizadas! O processo foi super fácil e o resultado ficou incrível. Recomendo!',
      rating: 5,
      image: '/images/testimonials/avatar-1.jpg',
    },
    {
      id: 2,
      name: 'João Santos',
      role: 'Empresa',
      content: 'Encomendei bonés personalizados para a minha equipa e ficaram perfeitos. Entrega rápida e atendimento excelente.',
      rating: 5,
      image: '/images/testimonials/avatar-2.jpg',
    },
    {
      id: 3,
      name: 'Ana Costa',
      role: 'Designer',
      content: 'A possibilidade de fazer upload das minhas próprias imagens é fantástica. Os produtos têm uma qualidade premium.',
      rating: 5,
      image: '/images/testimonials/avatar-3.jpg',
    },
  ]

  const stats = [
    { value: '10,000+', label: 'Produtos Vendidos' },
    { value: '5,000+', label: 'Clientes Satisfeitos' },
    { value: '4.9/5', label: 'Avaliação Média' },
    { value: '99%', label: 'Taxa de Satisfação' },
  ]

  return (
    <section className="py-16 md:py-24 bg-brand-gray-light" aria-labelledby="testimonials-heading">
      <div className="container-custom">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-brand-red mb-2">
                {stat.value}
              </div>
              <div className="text-brand-gray-dark/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-heading font-bold text-brand-gray-dark mb-4">
            O Que Dizem os Nossos Clientes
          </h2>
          <p className="text-lg text-brand-gray-dark/70 max-w-2xl mx-auto">
            Milhares de clientes satisfeitos confiam na CreativART's
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card p-6 relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-brand-yellow/20" aria-hidden="true" />
              
              {/* Rating */}
              <div className="flex space-x-1 mb-4" aria-label={`Avaliação: ${testimonial.rating} de 5 estrelas`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-brand-yellow text-brand-yellow" aria-hidden="true" />
                ))}
              </div>

              {/* Content */}
              <p className="text-brand-gray-dark mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-yellow to-brand-blue flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-brand-gray-dark">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-brand-gray-dark/60">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-brand-gray-dark/60">
          <div className="flex items-center space-x-2">
            <svg className="h-6 w-6 text-brand-blue" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Pagamento Seguro</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="h-6 w-6 text-brand-blue" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Dados Protegidos (RGPD)</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="h-6 w-6 text-brand-blue" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
            </svg>
            <span className="text-sm font-medium">Envio Rápido</span>
          </div>
        </div>
      </div>
    </section>
  )
}

