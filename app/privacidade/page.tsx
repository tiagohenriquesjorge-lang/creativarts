import type { Metadata } from 'next'
import { Shield, Lock, Eye, FileText, UserCheck, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade da CreativART\'s - Como tratamos e protegemos os seus dados pessoais em conformidade com o RGPD.',
}

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue/20 via-brand-gray-light/50 to-brand-blue/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-brand-blue" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-gray-dark mb-6">
              Política de Privacidade
            </h1>
            <p className="text-lg text-brand-gray-dark/80">
              Última atualização: 8 de fevereiro de 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            
            {/* Introdução */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-brand-blue" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  1. Introdução
                </h2>
              </div>
              <p className="text-brand-gray-dark/80">
                A <strong>CreativART's</strong> respeita a sua privacidade e está comprometida em proteger 
                os seus dados pessoais. Esta política de privacidade explica como recolhemos, usamos, 
                armazenamos e protegemos as suas informações em conformidade com o Regulamento Geral 
                de Proteção de Dados (RGPD).
              </p>
            </div>

            {/* Dados que Recolhemos */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-6 w-6 text-brand-yellow" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  2. Dados que Recolhemos
                </h2>
              </div>
              
              <h3 className="text-xl font-semibold text-brand-gray-dark mt-6 mb-3">
                2.1 Dados Fornecidos por Si
              </h3>
              <ul className="text-brand-gray-dark/80 space-y-2">
                <li><strong>Dados de registo:</strong> Nome, email, telefone, morada</li>
                <li><strong>Dados de encomenda:</strong> Informações de envio e faturação</li>
                <li><strong>Dados de pagamento:</strong> Processados de forma segura através do Stripe</li>
                <li><strong>Dados de personalização:</strong> Texto e imagens que carrega para personalizar produtos</li>
                <li><strong>Comunicações:</strong> Mensagens enviadas através do formulário de contacto</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-gray-dark mt-6 mb-3">
                2.2 Dados Recolhidos Automaticamente
              </h3>
              <ul className="text-brand-gray-dark/80 space-y-2">
                <li><strong>Dados de navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas</li>
                <li><strong>Cookies:</strong> Cookies essenciais, analíticos e de marketing (com o seu consentimento)</li>
                <li><strong>Dados de dispositivo:</strong> Tipo de dispositivo, sistema operativo, resolução de ecrã</li>
              </ul>
            </div>

            {/* Como Usamos os Seus Dados */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="h-6 w-6 text-brand-red" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  3. Como Usamos os Seus Dados
                </h2>
              </div>
              <p className="text-brand-gray-dark/80 mb-4">
                Utilizamos os seus dados pessoais para:
              </p>
              <ul className="text-brand-gray-dark/80 space-y-2">
                <li>✅ Processar e entregar as suas encomendas</li>
                <li>✅ Comunicar sobre o estado da sua encomenda</li>
                <li>✅ Processar pagamentos de forma segura</li>
                <li>✅ Personalizar produtos conforme as suas especificações</li>
                <li>✅ Responder às suas questões e pedidos de suporte</li>
                <li>✅ Melhorar a nossa loja e experiência do utilizador</li>
                <li>✅ Enviar newsletters e ofertas (apenas com o seu consentimento)</li>
                <li>✅ Cumprir obrigações legais e fiscais</li>
              </ul>
            </div>

            {/* Base Legal */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-6 w-6 text-brand-blue" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  4. Base Legal para o Tratamento
                </h2>
              </div>
              <p className="text-brand-gray-dark/80 mb-4">
                Tratamos os seus dados com base em:
              </p>
              <ul className="text-brand-gray-dark/80 space-y-2">
                <li><strong>Execução de contrato:</strong> Para processar e entregar encomendas</li>
                <li><strong>Consentimento:</strong> Para marketing e cookies não essenciais</li>
                <li><strong>Interesse legítimo:</strong> Para melhorar os nossos serviços e prevenir fraudes</li>
                <li><strong>Obrigação legal:</strong> Para cumprir requisitos fiscais e contabilísticos</li>
              </ul>
            </div>

            {/* Partilha de Dados */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-brand-yellow" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  5. Partilha de Dados
                </h2>
              </div>
              <p className="text-brand-gray-dark/80 mb-4">
                Podemos partilhar os seus dados com:
              </p>
              <ul className="text-brand-gray-dark/80 space-y-2">
                <li><strong>Processadores de pagamento:</strong> Stripe (para processar pagamentos)</li>
                <li><strong>Transportadoras:</strong> CTT, DPD (para entregar encomendas)</li>
                <li><strong>Fornecedores de serviços:</strong> Supabase (alojamento de dados), Vercel (alojamento web)</li>
                <li><strong>Autoridades:</strong> Quando exigido por lei</li>
              </ul>
              <p className="text-brand-gray-dark/80 mt-4">
                <strong>Nunca vendemos os seus dados a terceiros.</strong>
              </p>
            </div>

            {/* Segurança */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-brand-red" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  6. Segurança dos Dados
                </h2>
              </div>
              <p className="text-brand-gray-dark/80">
                Implementamos medidas técnicas e organizacionais para proteger os seus dados:
              </p>
              <ul className="text-brand-gray-dark/80 space-y-2 mt-4">
                <li>🔒 Encriptação SSL/TLS em todas as comunicações</li>
                <li>🔒 Armazenamento seguro em servidores protegidos</li>
                <li>🔒 Acesso restrito aos dados pessoais</li>
                <li>🔒 Backups regulares e seguros</li>
                <li>🔒 Monitorização contínua de segurança</li>
              </ul>
            </div>

            {/* Retenção de Dados */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-brand-blue" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  7. Retenção de Dados
                </h2>
              </div>
              <p className="text-brand-gray-dark/80">
                Conservamos os seus dados pessoais apenas pelo tempo necessário:
              </p>
              <ul className="text-brand-gray-dark/80 space-y-2 mt-4">
                <li><strong>Dados de encomenda:</strong> 7 anos (obrigação fiscal)</li>
                <li><strong>Dados de conta:</strong> Até solicitar a eliminação</li>
                <li><strong>Dados de marketing:</strong> Até retirar o consentimento</li>
                <li><strong>Cookies:</strong> Conforme definido na política de cookies</li>
              </ul>
            </div>

            {/* Direitos do Titular */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="h-6 w-6 text-brand-yellow" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  8. Os Seus Direitos (RGPD)
                </h2>
              </div>
              <p className="text-brand-gray-dark/80 mb-4">
                Tem os seguintes direitos sobre os seus dados pessoais:
              </p>
              <ul className="text-brand-gray-dark/80 space-y-3">
                <li><strong>✓ Direito de acesso:</strong> Solicitar uma cópia dos seus dados</li>
                <li><strong>✓ Direito de retificação:</strong> Corrigir dados incorretos</li>
                <li><strong>✓ Direito ao apagamento:</strong> Solicitar a eliminação dos seus dados</li>
                <li><strong>✓ Direito à portabilidade:</strong> Receber os seus dados em formato estruturado</li>
                <li><strong>✓ Direito de oposição:</strong> Opor-se ao tratamento dos seus dados</li>
                <li><strong>✓ Direito de limitação:</strong> Limitar o tratamento dos seus dados</li>
                <li><strong>✓ Direito de retirar consentimento:</strong> Retirar o consentimento a qualquer momento</li>
              </ul>
              <p className="text-brand-gray-dark/80 mt-6">
                Para exercer os seus direitos, contacte-nos em: <a href="mailto:privacidade@creativarts.pt" className="text-brand-blue hover:underline">privacidade@creativarts.pt</a>
              </p>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-brand-red" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  9. Cookies
                </h2>
              </div>
              <p className="text-brand-gray-dark/80">
                Utilizamos cookies para melhorar a sua experiência. Pode gerir as suas preferências 
                de cookies através do banner de consentimento. Para mais informações, consulte a nossa 
                Política de Cookies.
              </p>
            </div>

            {/* Alterações */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-brand-blue" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  10. Alterações a Esta Política
                </h2>
              </div>
              <p className="text-brand-gray-dark/80">
                Podemos atualizar esta política periodicamente. Notificaremos sobre alterações 
                significativas através do email ou de um aviso no site.
              </p>
            </div>

            {/* Contacto */}
            <div className="bg-brand-gray-light/30 rounded-lg p-8 mt-12">
              <h2 className="text-2xl font-heading font-bold text-brand-gray-dark mb-4">
                Contacto
              </h2>
              <p className="text-brand-gray-dark/80 mb-4">
                Para questões sobre privacidade e proteção de dados:
              </p>
              <ul className="text-brand-gray-dark/80 space-y-2">
                <li><strong>Email:</strong> <a href="mailto:privacidade@creativarts.pt" className="text-brand-blue hover:underline">privacidade@creativarts.pt</a></li>
                <li><strong>Morada:</strong> Rua da Criatividade, 123, 1000-001 Lisboa, Portugal</li>
                <li><strong>Telefone:</strong> +351 912 345 678</li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

