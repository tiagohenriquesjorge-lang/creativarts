import Link from 'next/link'
import { Shirt, Crown, Key, Pen, Box } from 'lucide-react'

export default function FeaturedCategories() {
  const categories = [
    {
      name: 'T-Shirts',
      slug: 't-shirts',
      icon: Shirt,
      color: 'bg-brand-red',
      description: 'Personalize a sua t-shirt',
    },
    {
      name: 'Bonés',
      slug: 'bones',
      icon: Crown,
      color: 'bg-brand-blue',
      description: 'Bonés únicos e criativos',
    },
    {
      name: 'Porta-chaves',
      slug: 'porta-chaves',
      icon: Key,
      color: 'bg-brand-yellow',
      description: 'Pequenos detalhes, grande impacto',
    },
    {
      name: 'Canetas',
      slug: 'canetas',
      icon: Pen,
      color: 'bg-secondary',
      description: 'Escreva com estilo',
    },
    {
      name: 'Impressões 3D',
      slug: 'impressoes-3d',
      icon: Box,
      color: 'bg-accent',
      description: 'Dê vida às suas ideias',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-brand-gray-light" aria-labelledby="categories-heading">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 id="categories-heading" className="text-3xl md:text-4xl font-heading font-bold text-brand-gray-dark mb-4">
            Explore as Nossas Categorias
          </h2>
          <p className="text-lg text-brand-gray-dark/70 max-w-2xl mx-auto">
            Descubra a categoria perfeita para o seu próximo projeto criativo
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.slug}
                href={`/produtos?categoria=${category.slug}`}
                className="group card p-6 text-center hover:scale-105 transition-all duration-300 focus-visible-ring"
              >
                <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-semibold text-brand-gray-dark mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-brand-gray-dark/60">
                  {category.description}
                </p>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/categorias" className="btn-outline">
            Ver Todas as Categorias
          </Link>
        </div>
      </div>
    </section>
  )
}

