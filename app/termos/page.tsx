import type { Metadata } from 'next'
import { FileText, ShoppingCart, CreditCard, Truck, Shield, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Termos e Condições',
  description: 'Termos e Condições de Uso da CreativART\'s - Condições de venda, pagamento, envio e garantias.',
}

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-yellow/20 via-brand-gray-light/50 to-brand-yellow/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-brand-yellow/10 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-brand-yellow" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-gray-dark mb-6">
              Termos e Condições
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
                  1. Aceitação dos Termos
                </h2>
              </div>
              <p className="text-brand-gray-dark/80">
                Ao aceder e utilizar o site <strong>CreativART's</strong> (www.creativarts.pt), 
                concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. 
                Se não concordar com estes termos, não deve utilizar este site.
              </p>
            </div>

            {/* Informações da Empresa */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-brand-yellow" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  2. Informações da Empresa
                </h2>
              </div>
              <ul className="text-brand-gray-dark/80 space-y-2">
                <li><strong>Nome:</strong> CreativART's, Lda.</li>
                <li><strong>NIF:</strong> 123456789</li>
                <li><strong>Morada:</strong> Rua da Criatividade, 123, 1000-001 Lisboa, Portugal</li>
                <li><strong>Email:</strong> info@creativarts.pt</li>
                <li><strong>Telefone:</strong> +351 912 345 678</li>
              </ul>
            </div>

            {/* Produtos e Serviços */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <ShoppingCart className="h-6 w-6 text-brand-red" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  3. Produtos e Personalização
                </h2>
              </div>
              
              <h3 className="text-xl font-semibold text-brand-gray-dark mt-6 mb-3">
                3.1 Descrição dos Produtos
              </h3>
              <p className="text-brand-gray-dark/80">
                Fazemos todos os esforços para apresentar descrições e imagens precisas dos produtos. 
                No entanto, as cores podem variar ligeiramente devido às configurações do monitor.
              </p>

              <h3 className="text-xl font-semibold text-brand-gray-dark mt-6 mb-3">
                3.2 Personalização
              </h3>
              <ul className="text-brand-gray-dark/80 space-y-2">
                <li>É da responsabilidade do cliente fornecer conteúdo (texto/imagens) adequado e legal</li>
                <li>Não aceitamos conteúdo ofensivo, difamatório ou que viole direitos de autor</li>
                <li>Reservamo-nos o direito de recusar encomendas com conteúdo inadequado</li>
                <li>Produtos personalizados não podem ser devolvidos, exceto em caso de defeito</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-gray-dark mt-6 mb-3">
                3.3 Disponibilidade
              </h3>
              <p className="text-brand-gray-dark/80">
                Todos os produtos estão sujeitos a disponibilidade. Reservamo-nos o direito de 
                descontinuar produtos sem aviso prévio.
              </p>
            </div>

            {/* Preços e Pagamento */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="h-6 w-6 text-brand-blue" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  4. Preços e Pagamento
                </h2>
              </div>
              
              <h3 className="text-xl font-semibold text-brand-gray-dark mt-6 mb-3">
                4.1 Preços
              </h3>
              <ul className="text-brand-gray-dark/80 space-y-2">
                <li>Todos os preços estão em Euros (€) e incluem IVA à taxa legal em vigor</li>
                <li>Os preços podem ser alterados sem aviso prévio</li>
                <li>O preço aplicável é o que está em vigor no momento da encomenda</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-gray-dark mt-6 mb-3">
                4.2 Métodos de Pagamento
              </h3>
              <p className="text-brand-gray-dark/80">
                Aceitamos os seguintes métodos de pagamento:
              </p>
              <ul className="text-brand-gray-dark/80 space-y-2 mt-2">
                <li>💳 Cartão de crédito/débito (Visa, Mastercard, American Express)</li>
                <li>💳 MB Way</li>
                <li>💳 Multibanco</li>
              </ul>
              <p className="text-brand-gray-dark/80 mt-4">
                Os pagamentos são processados de forma segura através do <strong>Stripe</strong>.
              </p>

              <h3 className="text-xl font-semibold text-brand-gray-dark mt-6 mb-3">
                4.3 Confirmação de Pagamento
              </h3>
              <p className="text-brand-gray-dark/80">
                A encomenda só será processada após confirmação do pagamento. 
                Receberá um email de confirmação assim que o pagamento for aprovado.
              </p>
            </div>

            {/* Envio e Entrega */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="h-6 w-6 text-brand-yellow" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  5. Envio e Entrega
                </h2>
              </div>
              
              <h3 className="text-xl font-semibold text-brand-gray-dark mt-6 mb-3">
                5.1 Áreas de Entrega
              </h3>
              <p className="text-brand-gray-dark/80">
                Entregamos em Portugal Continental, Ilhas e países da União Europeia.
              </p>

              <h3 className="text-xl font-semibold text-brand-gray-dark mt-6 mb-3">
                5.2 Prazos de Entrega
              </h3>
              <ul className="text-brand-gray-dark/80 space-y-2">
                <li><strong>Produção:</strong> 3-5 dias úteis</li>
                <li><strong>Envio Portugal Continental:</strong> 2-3 dias úteis após produção</li>
                <li><strong>Envio Ilhas:</strong> 5-7 dias úteis após produção</li>
                <li><strong>Envio UE:</strong> 7-10 dias úteis após produção</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-gray-dark mt-6 mb-3">
                5.3 Custos de Envio
              </h3>
              <ul className="text-brand-gray-dark/80 space-y-2">
                <li>Portugal Continental: 4,99€ (GRÁTIS acima de 50€)</li>
                <li>Ilhas: 9,99€</li>
                <li>União Europeia: 14,99€</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-gray-dark mt-6 mb-3">
                5.4 Rastreamento
              </h3>
              <p className="text-brand-gray-dark/80">
                Todas as encomendas incluem código de rastreamento enviado por email.
              </p>
            </div>

            {/* Direito de Livre Resolução */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-brand-red" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  6. Direito de Livre Resolução (30 dias)
                </h2>
              </div>
              <p className="text-brand-gray-dark/80 mb-4">
                De acordo com a legislação portuguesa, tem 30 dias para devolver produtos 
                <strong> não personalizados</strong> sem necessidade de justificação.
              </p>
              
              <h3 className="text-xl font-semibold text-brand-gray-dark mt-6 mb-3">
                6.1 Condições
              </h3>
              <ul className="text-brand-gray-dark/80 space-y-2">
                <li>✓ Produto em estado original, não usado e com etiquetas</li>
                <li>✓ Embalagem original intacta</li>
                <li>✓ Prazo de 30 dias a contar da receção</li>
                <li>✗ Produtos personalizados NÃO são elegíveis (exceto defeito)</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-gray-dark mt-6 mb-3">
                6.2 Processo de Devolução
              </h3>
              <ol className="text-brand-gray-dark/80 space-y-2">
                <li>1. Contacte-nos em info@creativarts.pt</li>
                <li>2. Aguarde autorização e instruções</li>
                <li>3. Envie o produto para a morada indicada</li>
                <li>4. Reembolso processado em 14 dias após receção</li>
              </ol>

              <p className="text-brand-gray-dark/80 mt-4">
                <strong>Nota:</strong> Os custos de envio de devolução são da responsabilidade do cliente, 
                exceto em caso de defeito ou erro da nossa parte.
              </p>
            </div>

            {/* Garantia */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-brand-blue" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  7. Garantia
                </h2>
              </div>
              <p className="text-brand-gray-dark/80">
                Todos os produtos têm garantia de 2 anos contra defeitos de fabrico, 
                conforme legislação portuguesa. Esta garantia não cobre:
              </p>
              <ul className="text-brand-gray-dark/80 space-y-2 mt-4">
                <li>✗ Desgaste normal</li>
                <li>✗ Uso inadequado</li>
                <li>✗ Lavagem incorreta</li>
                <li>✗ Danos causados pelo cliente</li>
              </ul>
            </div>

            {/* Limitação de Responsabilidade */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-brand-yellow" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  8. Limitação de Responsabilidade
                </h2>
              </div>
              <p className="text-brand-gray-dark/80">
                A CreativART's não se responsabiliza por:
              </p>
              <ul className="text-brand-gray-dark/80 space-y-2 mt-4">
                <li>Atrasos de entrega causados por transportadoras</li>
                <li>Conteúdo fornecido pelo cliente que viole direitos de terceiros</li>
                <li>Erros de personalização causados por ficheiros de baixa qualidade</li>
                <li>Indisponibilidade temporária do site</li>
              </ul>
            </div>

            {/* Propriedade Intelectual */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-brand-red" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  9. Propriedade Intelectual
                </h2>
              </div>
              <p className="text-brand-gray-dark/80">
                Todo o conteúdo do site (textos, imagens, logótipos, design) é propriedade da 
                CreativART's e está protegido por direitos de autor. É proibida a reprodução 
                sem autorização prévia.
              </p>
            </div>

            {/* Lei Aplicável */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-brand-blue" />
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark m-0">
                  10. Lei Aplicável e Resolução de Litígios
                </h2>
              </div>
              <p className="text-brand-gray-dark/80 mb-4">
                Estes termos são regidos pela lei portuguesa. Em caso de litígio, 
                pode recorrer a:
              </p>
              <ul className="text-brand-gray-dark/80 space-y-2">
                <li><strong>Livro de Reclamações:</strong> Disponível no site e em formato físico</li>
                <li><strong>Centro de Arbitragem de Conflitos de Consumo:</strong> www.cniacc.pt</li>
                <li><strong>Portal da Queixa:</strong> www.portaldaqueixa.com</li>
              </ul>
            </div>

            {/* Contacto */}
            <div className="bg-brand-gray-light/30 rounded-lg p-8 mt-12">
              <h2 className="text-2xl font-heading font-bold text-brand-gray-dark mb-4">
                Contacto
              </h2>
              <p className="text-brand-gray-dark/80 mb-4">
                Para questões sobre estes termos e condições:
              </p>
              <ul className="text-brand-gray-dark/80 space-y-2">
                <li><strong>Email:</strong> <a href="mailto:info@creativarts.pt" className="text-brand-blue hover:underline">info@creativarts.pt</a></li>
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

