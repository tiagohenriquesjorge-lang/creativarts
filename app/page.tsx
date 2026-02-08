import Hero from '@/components/home/Hero'
import FeaturedCategories from '@/components/home/FeaturedCategories'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import SocialProof from '@/components/home/SocialProof'
import HowItWorks from '@/components/home/HowItWorks'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Início',
  description: 'Crie produtos personalizados únicos na CreativART\'s. T-shirts, bonés, porta-chaves, canetas e impressões 3D.',
  openGraph: {
    title: 'CreativART\'s - Produtos Personalizados',
    description: 'Crie produtos personalizados únicos. T-shirts, bonés, porta-chaves, canetas e impressões 3D.',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Above the fold */}
      <Hero />

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* How It Works */}
      <HowItWorks />

      {/* Social Proof / Testimonials */}
      <SocialProof />
    </>
  )
}

