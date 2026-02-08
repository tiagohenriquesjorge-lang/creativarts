import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ConsentBanner from '@/components/consent/ConsentBanner'
import ToastContainer from '@/components/ui/ToastContainer'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'CreativART\'s - Produtos Personalizados',
    template: '%s | CreativART\'s'
  },
  description: 'Loja online de produtos personalizados: t-shirts, bonés, porta-chaves, canetas e impressões 3D. Crie o seu produto único!',
  keywords: ['produtos personalizados', 't-shirts personalizadas', 'bonés personalizados', 'impressão 3D', 'brindes personalizados'],
  authors: [{ name: 'CreativART\'s' }],
  creator: 'CreativART\'s',
  publisher: 'CreativART\'s',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: '/',
    siteName: 'CreativART\'s',
    title: 'CreativART\'s - Produtos Personalizados',
    description: 'Loja online de produtos personalizados: t-shirts, bonés, porta-chaves, canetas e impressões 3D.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CreativART\'s',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreativART\'s - Produtos Personalizados',
    description: 'Loja online de produtos personalizados: t-shirts, bonés, porta-chaves, canetas e impressões 3D.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className="smooth-scroll">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="skip-to-main">
          Saltar para o conteúdo principal
        </a>
        
        <Header />
        
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        
        <Footer />

        {/* Google Analytics */}
        <GoogleAnalytics />

        {/* RGPD Consent Banner */}
        <ConsentBanner />

        {/* Toast Notifications */}
        <ToastContainer />
      </body>
    </html>
  )
}

