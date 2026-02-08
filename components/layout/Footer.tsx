import Link from 'next/link'
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { name: 'Todos os Produtos', href: '/produtos' },
      { name: 'T-Shirts', href: '/produtos?categoria=t-shirts' },
      { name: 'Bonés', href: '/produtos?categoria=bones' },
      { name: 'Porta-chaves', href: '/produtos?categoria=porta-chaves' },
      { name: 'Canetas', href: '/produtos?categoria=canetas' },
      { name: 'Impressões 3D', href: '/produtos?categoria=impressoes-3d' },
    ],
    company: [
      { name: 'Sobre Nós', href: '/sobre' },
      { name: 'Contactos', href: '/contactos' },
      { name: 'Como Funciona', href: '/como-funciona' },
    ],
    legal: [
      { name: 'Política de Privacidade', href: '/privacidade' },
      { name: 'Termos e Condições', href: '/termos' },
      { name: 'Política de Devoluções', href: '/devolucoes' },
      { name: 'Política de Cookies', href: '/cookies' },
    ],
  }

  return (
    <footer className="bg-brand-gray-dark text-white mt-20" role="contentinfo">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-bold">
              <span className="text-brand-red">Creativ</span>
              <span className="text-brand-blue">ART's</span>
            </h2>
            <p className="text-brand-gray-light text-sm">
              Transforme as suas ideias em produtos únicos. Personalização de qualidade com criatividade sem limites.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gray-light hover:text-brand-blue transition-colors focus-visible-ring rounded"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gray-light hover:text-brand-blue transition-colors focus-visible-ring rounded"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Loja</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-brand-gray-light hover:text-white transition-colors text-sm focus-visible-ring rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-brand-gray-light hover:text-white transition-colors text-sm focus-visible-ring rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-heading font-semibold text-lg mb-4 mt-6">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-brand-gray-light hover:text-white transition-colors text-sm focus-visible-ring rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-brand-gray-light">
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@creativarts.com" className="hover:text-white transition-colors focus-visible-ring rounded">
                  info@creativarts.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+351123456789" className="hover:text-white transition-colors focus-visible-ring rounded">
                  +351 123 456 789
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Lisboa, Portugal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-brand-gray-light/20 text-center text-sm text-brand-gray-light">
          <p>&copy; {currentYear} CreativART's. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

