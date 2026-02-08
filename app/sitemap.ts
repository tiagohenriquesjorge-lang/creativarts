import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.creativarts.com'

  // Static pages
  const staticPages = [
    '',
    '/produtos',
    '/categorias',
    '/sobre',
    '/contactos',
    '/como-funciona',
    '/privacidade',
    '/termos',
    '/devolucoes',
    '/cookies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // TODO: Add dynamic product pages
  // Fetch products from Supabase and add to sitemap
  // const products = await getProducts()
  // const productPages = products.map((product) => ({
  //   url: `${baseUrl}/produtos/${product.slug}`,
  //   lastModified: new Date(product.updated_at),
  //   changeFrequency: 'daily' as const,
  //   priority: 0.9,
  // }))

  return [...staticPages]
}

