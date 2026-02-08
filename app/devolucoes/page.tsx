import type { Metadata } from 'next'
import { Package, RefreshCw, CheckCircle, XCircle, AlertCircle, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Devoluções e Trocas',
  description: 'Política de Devoluções e Trocas da CreativART\'s - 30 dias para devolver produtos não personalizados.',
}

export default function DevolucoesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-red/20 via-brand-gray-light/50 to-brand-red/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center">
                <RefreshCw className="h-8 w-8 text-brand-red" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-gray-dark mb-6">
              Devoluções e Trocas
            </h1>
            <p className="text-xl text-brand-gray-dark/80 leading-relaxed">
              A sua satisfação é a nossa prioridade. Conheça a nossa política de devoluções.
            </p>
          </div>
        </div>
      </section>

      {/* Política de 30 Dias */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 rounded-lg p-8 mb-12">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-8 w-8 text-brand-blue" />
                <h2 className="text-3xl font-heading font-bold text-brand-gray-dark m-0">
                  Política de 30 Dias
                </h2>
              </div>
              <p className="text-lg text-brand-gray-dark/80">
                Tem <strong>30 dias</strong> a contar da data de receção para devolver produtos 
                <strong> não personalizados</strong>, sem necessidade de justificação, 
                de acordo com a legislação portuguesa de proteção do consumidor.
              </p>
            </div>

            {/* Produtos Elegíveis */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Package className="h-6 w-6 text-brand-blue" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark">
                  Produtos Elegíveis para Devolução
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pode Devolver */}
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <h3 className="text-lg font-semibold text-green-900">
                      ✓ Pode Devolver
                    </h3>
                  </div>
                  <ul className="space-y-2 text-green-800">
                    <li>✓ Produtos sem personalização</li>
                    <li>✓ Produtos com defeito de fabrico</li>
                    <li>✓ Produtos enviados por erro</li>
                    <li>✓ Produtos danificados no transporte</li>
                  </ul>
                </div>

                {/* Não Pode Devolver */}
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle className="h-6 w-6 text-red-600" />
                    <h3 className="text-lg font-semibold text-red-900">
                      ✗ Não Pode Devolver
                    </h3>
                  </div>
                  <ul className="space-y-2 text-red-800">
                    <li>✗ Produtos personalizados (exceto defeito)</li>
                    <li>✗ Produtos usados ou lavados</li>
                    <li>✗ Produtos sem embalagem original</li>
                    <li>✗ Produtos sem etiquetas</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Condições */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="h-6 w-6 text-brand-yellow" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark">
                  Condições para Devolução
                </h2>
              </div>
              
              <div className="bg-brand-gray-light/30 rounded-lg p-6">
                <ul className="space-y-3 text-brand-gray-dark/80">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span><strong>Estado original:</strong> O produto deve estar em perfeito estado, não usado e não lavado</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span><strong>Embalagem:</strong> Embalagem original intacta e sem danos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span><strong>Etiquetas:</strong> Todas as etiquetas originais devem estar presentes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span><strong>Prazo:</strong> Dentro de 30 dias a contar da data de receção</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span><strong>Autorização:</strong> Deve contactar-nos antes de enviar a devolução</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Processo de Devolução */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <RefreshCw className="h-6 w-6 text-brand-red" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark">
                  Como Fazer uma Devolução
                </h2>
              </div>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-gray-dark mb-2">
                      Contacte-nos
                    </h3>
                    <p className="text-brand-gray-dark/70">
                      Envie um email para <a href="mailto:devolucoes@creativarts.pt" className="text-brand-blue hover:underline">devolucoes@creativarts.pt</a> com:
                    </p>
                    <ul className="text-sm text-brand-gray-dark/70 mt-2 ml-4 space-y-1">
                      <li>• Número da encomenda</li>
                      <li>• Produto(s) a devolver</li>
                      <li>• Motivo da devolução</li>
                      <li>• Fotos (se aplicável)</li>
                    </ul>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-brand-yellow text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-gray-dark mb-2">
                      Aguarde Autorização
                    </h3>
                    <p className="text-brand-gray-dark/70">
                      Responderemos em até 24 horas com:
                    </p>
                    <ul className="text-sm text-brand-gray-dark/70 mt-2 ml-4 space-y-1">
                      <li>• Confirmação da devolução</li>
                      <li>• Morada para envio</li>
                      <li>• Instruções específicas</li>
                    </ul>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-brand-red text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-gray-dark mb-2">
                      Envie o Produto
                    </h3>
                    <p className="text-brand-gray-dark/70">
                      Embale o produto de forma segura e envie para a morada indicada. 
                      Guarde o comprovativo de envio.
                    </p>
                    <p className="text-sm text-brand-gray-dark/70 mt-2">
                      <strong>Nota:</strong> Os custos de envio são da sua responsabilidade, 
                      exceto em caso de defeito ou erro nosso.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-gray-dark mb-2">
                      Receba o Reembolso
                    </h3>
                    <p className="text-brand-gray-dark/70">
                      Após recebermos e inspecionarmos o produto, processaremos o reembolso 
                      em até <strong>14 dias úteis</strong> para o método de pagamento original.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trocas */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <RefreshCw className="h-6 w-6 text-brand-blue" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark">
                  Trocas
                </h2>
              </div>
              
              <p className="text-brand-gray-dark/80 mb-4">
                Atualmente não fazemos trocas diretas. Se pretende um produto diferente:
              </p>
              <ol className="text-brand-gray-dark/80 space-y-2 ml-6">
                <li>1. Faça a devolução do produto original</li>
                <li>2. Aguarde o reembolso</li>
                <li>3. Faça uma nova encomenda com o produto desejado</li>
              </ol>
            </div>

            {/* Produtos com Defeito */}
            <div className="mb-12">
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                  <h2 className="text-xl font-heading font-bold text-red-900 m-0">
                    Produtos com Defeito ou Danificados
                  </h2>
                </div>
                <p className="text-red-800 mb-4">
                  Se recebeu um produto com defeito, danificado ou errado:
                </p>
                <ul className="text-red-800 space-y-2">
                  <li>✓ Contacte-nos <strong>imediatamente</strong></li>
                  <li>✓ Envie fotos do defeito/dano</li>
                  <li>✓ Não é necessário devolver o produto antes da análise</li>
                  <li>✓ Reembolso total ou substituição gratuita</li>
                  <li>✓ Custos de envio por nossa conta</li>
                </ul>
              </div>
            </div>

            {/* Contacto */}
            <div className="bg-brand-gray-light/30 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-brand-blue" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  Precisa de Ajuda?
                </h2>
              </div>
              <p className="text-brand-gray-dark/80 mb-4">
                A nossa equipa está disponível para ajudar com qualquer questão sobre devoluções:
              </p>
              <ul className="text-brand-gray-dark/80 space-y-2">
                <li><strong>Email Devoluções:</strong> <a href="mailto:devolucoes@creativarts.pt" className="text-brand-blue hover:underline">devolucoes@creativarts.pt</a></li>
                <li><strong>Email Geral:</strong> <a href="mailto:info@creativarts.pt" className="text-brand-blue hover:underline">info@creativarts.pt</a></li>
                <li><strong>Telefone:</strong> +351 912 345 678</li>
                <li><strong>Horário:</strong> Segunda a Sexta, 9h - 18h</li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

