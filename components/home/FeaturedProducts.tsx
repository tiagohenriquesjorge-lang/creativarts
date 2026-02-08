import Link from 'next/link'
import ProductCard from '@/components/products/ProductCard'

// Mock data - replace with actual data from Supabase
const featuredProducts = [
  {
    id: '1',
    name: 'T-Shirt Básica Personalizável',
    slug: 't-shirt-basica',
    description: 'T-shirt 100% algodão, disponível em várias cores',
    short_description: 'T-shirt 100% algodão',
    category_id: '1',
    base_price: 15.99,
    images: [
      {
        id: '1',
        product_id: '1',
        url: '/images/products/tshirt-placeholder.jpg',
        alt_text: 'T-Shirt Básica',
        position: 1,
        is_primary: true,
      },
    ],
    variants: [],
    is_customizable: true,
    tags: ['bestseller', 'novo'],
    is_active: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Boné Snapback Premium',
    slug: 'bone-snapback',
    description: 'Boné ajustável com bordado personalizado',
    short_description: 'Boné ajustável premium',
    category_id: '2',
    base_price: 19.99,
    images: [
      {
        id: '2',
        product_id: '2',
        url: '/images/products/cap-placeholder.jpg',
        alt_text: 'Boné Snapback',
        position: 1,
        is_primary: true,
      },
    ],
    variants: [],
    is_customizable: true,
    tags: ['popular'],
    is_active: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Porta-chaves Acrílico',
    slug: 'porta-chaves-acrilico',
    description: 'Porta-chaves em acrílico com impressão personalizada',
    short_description: 'Porta-chaves acrílico',
    category_id: '3',
    base_price: 4.99,
    images: [
      {
        id: '3',
        product_id: '3',
        url: '/images/products/keychain-placeholder.jpg',
        alt_text: 'Porta-chaves Acrílico',
        position: 1,
        is_primary: true,
      },
    ],
    variants: [],
    is_customizable: true,
    tags: ['económico'],
    is_active: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Caneta Metálica Gravada',
    slug: 'caneta-metalica',
    description: 'Caneta metálica com gravação laser',
    short_description: 'Caneta metálica premium',
    category_id: '4',
    base_price: 12.99,
    images: [
      {
        id: '4',
        product_id: '4',
        url: '/images/products/pen-placeholder.jpg',
        alt_text: 'Caneta Metálica',
        position: 1,
        is_primary: true,
      },
    ],
    variants: [],
    is_customizable: true,
    tags: ['premium'],
    is_active: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="featured-heading">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 id="featured-heading" className="text-3xl md:text-4xl font-heading font-bold text-brand-gray-dark mb-4">
            Produtos em Destaque
          </h2>
          <p className="text-lg text-brand-gray-dark/70 max-w-2xl mx-auto">
            Os nossos produtos mais populares, prontos para personalizar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/produtos" className="btn-primary">
            Ver Todos os Produtos
          </Link>
        </div>
      </div>
    </section>
  )
}

