import type { Metadata } from 'next'
import { Heart, Users, Sparkles, Target, Award, Zap } from 'lucide-react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça a CreativART\'s - A sua loja de produtos personalizados. Transformamos as suas ideias em produtos únicos desde 2024.',
}

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-yellow/20 via-brand-blue/10 to-brand-red/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-gray-dark mb-6">
              Sobre a CreativART's
            </h1>
            <p className="text-xl text-brand-gray-dark/80 leading-relaxed">
              Transformamos as suas ideias em produtos únicos e personalizados. 
              Cada criação conta uma história, a sua história.
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="h-8 w-8 text-brand-red" />
              <h2 className="text-3xl font-heading font-bold text-brand-gray-dark">
                A Nossa História
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-brand-gray-dark/80 leading-relaxed mb-4">
                A <strong>CreativART's</strong> nasceu em 2024 com uma missão simples mas poderosa: 
                democratizar a personalização de produtos e tornar cada item verdadeiramente único.
              </p>
              
              <p className="text-brand-gray-dark/80 leading-relaxed mb-4">
                Começámos com t-shirts personalizadas e rapidamente expandimos para bonés, 
                porta-chaves, canetas e até impressões 3D. O que nos move é a paixão por 
                transformar ideias em realidade e ver o sorriso dos nossos clientes quando 
                recebem os seus produtos personalizados.
              </p>
              
              <p className="text-brand-gray-dark/80 leading-relaxed">
                Hoje, somos uma referência em produtos personalizados em Portugal, 
                com milhares de clientes satisfeitos e centenas de projetos únicos criados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 bg-brand-gray-light/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Missão */}
            <div className="bg-white rounded-lg p-8 shadow-sm border-2 border-brand-gray-light">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-gray-dark mb-3">
                Missão
              </h3>
              <p className="text-brand-gray-dark/70">
                Proporcionar produtos personalizados de alta qualidade, 
                transformando ideias em realidade com criatividade e excelência.
              </p>
            </div>

            {/* Visão */}
            <div className="bg-white rounded-lg p-8 shadow-sm border-2 border-brand-gray-light">
              <div className="w-12 h-12 bg-brand-yellow/10 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-brand-yellow" />
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-gray-dark mb-3">
                Visão
              </h3>
              <p className="text-brand-gray-dark/70">
                Ser a referência em personalização de produtos em Portugal, 
                reconhecida pela qualidade, inovação e satisfação dos clientes.
              </p>
            </div>

            {/* Valores */}
            <div className="bg-white rounded-lg p-8 shadow-sm border-2 border-brand-gray-light">
              <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-brand-red" />
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-gray-dark mb-3">
                Valores
              </h3>
              <p className="text-brand-gray-dark/70">
                Criatividade, qualidade, compromisso com o cliente, 
                inovação constante e paixão pelo que fazemos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O Que Nos Diferencia */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-brand-gray-dark mb-8 text-center">
              O Que Nos Diferencia
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-brand-blue/10 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-brand-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-2">
                    Qualidade Premium
                  </h3>
                  <p className="text-sm text-brand-gray-dark/70">
                    Utilizamos apenas materiais de alta qualidade e técnicas de impressão profissionais.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-brand-yellow/10 rounded-full flex items-center justify-center">
                    <Zap className="h-5 w-5 text-brand-yellow" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-2">
                    Entrega Rápida
                  </h3>
                  <p className="text-sm text-brand-gray-dark/70">
                    Produção e envio em 3-5 dias úteis. Envio grátis acima de 50€.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-brand-red/10 rounded-full flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-brand-red" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-2">
                    Personalização Total
                  </h3>
                  <p className="text-sm text-brand-gray-dark/70">
                    Adicione texto, imagens e escolha cores. Cada produto é único como você.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-brand-blue/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-brand-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-2">
                    Atendimento Personalizado
                  </h3>
                  <p className="text-sm text-brand-gray-dark/70">
                    Equipa dedicada para ajudar em cada etapa do seu projeto.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-brand-yellow/10 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-brand-yellow" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-2">
                    Garantia de Satisfação
                  </h3>
                  <p className="text-sm text-brand-gray-dark/70">
                    30 dias para devoluções. Se não ficar satisfeito, devolvemos o seu dinheiro.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-brand-red/10 rounded-full flex items-center justify-center">
                    <Target className="h-5 w-5 text-brand-red" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-2">
                    Preços Competitivos
                  </h3>
                  <p className="text-sm text-brand-gray-dark/70">
                    Melhor relação qualidade-preço do mercado. Sem custos escondidos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-brand-blue via-brand-blue/90 to-brand-blue/80">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Pronto para Criar Algo Único?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Explore os nossos produtos e comece a personalizar hoje mesmo!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/produtos"
                className="btn-primary bg-brand-yellow text-brand-gray-dark hover:bg-brand-yellow/90"
              >
                Ver Produtos
              </a>
              <a
                href="/contactos"
                className="btn-outline border-white text-white hover:bg-white hover:text-brand-blue"
              >
                Fale Connosco
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

