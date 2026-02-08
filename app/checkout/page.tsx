'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { useToastStore } from '@/store/toastStore'
import CheckoutSteps from '@/components/checkout/CheckoutSteps'
import PersonalInfoForm, { PersonalInfo } from '@/components/checkout/PersonalInfoForm'
import ShippingForm, { ShippingAddress } from '@/components/checkout/ShippingForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import { ArrowLeft, ArrowRight, CreditCard } from 'lucide-react'
import Link from 'next/link'
import * as gtag from '@/lib/analytics/gtag'

const steps = [
  { number: 1, title: 'Informações', description: 'Dados pessoais' },
  { number: 2, title: 'Envio', description: 'Morada de entrega' },
  { number: 3, title: 'Pagamento', description: 'Método de pagamento' },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, coupon, discount, applyCoupon, removeCoupon, getSubtotal, getTotal, clearCart } = useCartStore()
  const toast = useToastStore()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  // Form data
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    notes: '',
  })

  // Errors
  const [personalInfoErrors, setPersonalInfoErrors] = useState<Partial<Record<keyof PersonalInfo, string>>>({})
  const [shippingErrors, setShippingErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({})

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      toast.warning('O seu carrinho está vazio!')
      router.push('/produtos')
    } else {
      // Track begin_checkout event
      const total = getTotal()
      gtag.beginCheckout(items, total)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, router])

  // Calculate totals
  const subtotal = getSubtotal()
  const shipping = subtotal >= 50 ? 0 : 5.99
  const total = getTotal()

  // Validation functions
  const validatePersonalInfo = (): boolean => {
    const errors: Partial<Record<keyof PersonalInfo, string>> = {}

    if (!personalInfo.firstName.trim()) {
      errors.firstName = 'Campo obrigatório'
    }
    if (!personalInfo.lastName.trim()) {
      errors.lastName = 'Campo obrigatório'
    }
    if (!personalInfo.email.trim()) {
      errors.email = 'Campo obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
      errors.email = 'Email inválido'
    }
    if (!personalInfo.phone.trim()) {
      errors.phone = 'Campo obrigatório'
    }

    setPersonalInfoErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateShippingAddress = (): boolean => {
    const errors: Partial<Record<keyof ShippingAddress, string>> = {}

    if (!shippingAddress.address.trim()) {
      errors.address = 'Campo obrigatório'
    }
    if (!shippingAddress.city.trim()) {
      errors.city = 'Campo obrigatório'
    }
    if (!shippingAddress.postalCode.trim()) {
      errors.postalCode = 'Campo obrigatório'
    }
    if (!shippingAddress.country) {
      errors.country = 'Campo obrigatório'
    }

    setShippingErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Navigation handlers
  const handleNext = () => {
    if (currentStep === 1) {
      if (validatePersonalInfo()) {
        setCurrentStep(2)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        toast.error('Por favor, preencha todos os campos obrigatórios')
      }
    } else if (currentStep === 2) {
      if (validateShippingAddress()) {
        setCurrentStep(3)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        toast.error('Por favor, preencha todos os campos obrigatórios')
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async () => {
    setIsProcessing(true)

    try {
      // Create Stripe Checkout Session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          coupon,
          personalInfo,
          shippingAddress,
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao criar sessão de pagamento')
      }

      const { url } = await response.json()

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url
      } else {
        throw new Error('URL de pagamento não recebida')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('Erro ao processar o pedido. Tente novamente.')
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/carrinho"
            className="inline-flex items-center gap-2 text-brand-gray-dark/70 hover:text-brand-blue transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao carrinho
          </Link>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-gray-dark">
            Finalizar Compra
          </h1>
        </div>

        {/* Steps */}
        <CheckoutSteps currentStep={currentStep} steps={steps} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Forms */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border-2 border-brand-gray-light p-6">
              {currentStep === 1 && (
                <PersonalInfoForm
                  data={personalInfo}
                  onChange={setPersonalInfo}
                  errors={personalInfoErrors}
                />
              )}

              {currentStep === 2 && (
                <ShippingForm
                  data={shippingAddress}
                  onChange={setShippingAddress}
                  errors={shippingErrors}
                />
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-brand-gray-dark mb-2">
                      Pagamento
                    </h2>
                    <p className="text-brand-gray-dark/70">
                      Escolha o método de pagamento
                    </p>
                  </div>

                  <div className="bg-brand-yellow/10 rounded-lg p-6 text-center">
                    <CreditCard className="h-12 w-12 text-brand-blue mx-auto mb-4" />
                    <p className="text-brand-gray-dark font-medium mb-2">
                      Integração de pagamento em desenvolvimento
                    </p>
                    <p className="text-sm text-brand-gray-dark/70">
                      Em breve: Stripe, PayPal, Multibanco e MB WAY
                    </p>
                  </div>

                  {/* Order Review */}
                  <div className="bg-brand-gray-light/30 rounded-lg p-6">
                    <h3 className="font-heading font-bold text-brand-gray-dark mb-4">
                      Revisão do Pedido
                    </h3>

                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-medium text-brand-gray-dark mb-1">Dados Pessoais:</p>
                        <p className="text-brand-gray-dark/70">
                          {personalInfo.firstName} {personalInfo.lastName}
                        </p>
                        <p className="text-brand-gray-dark/70">{personalInfo.email}</p>
                        <p className="text-brand-gray-dark/70">{personalInfo.phone}</p>
                      </div>

                      <div className="border-t border-brand-gray-light pt-3">
                        <p className="font-medium text-brand-gray-dark mb-1">Morada de Envio:</p>
                        <p className="text-brand-gray-dark/70">{shippingAddress.address}</p>
                        <p className="text-brand-gray-dark/70">
                          {shippingAddress.postalCode} {shippingAddress.city}
                        </p>
                        <p className="text-brand-gray-dark/70">{shippingAddress.country}</p>
                        {shippingAddress.notes && (
                          <p className="text-brand-gray-dark/70 mt-2 italic">
                            Notas: {shippingAddress.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-brand-gray-light">
                {currentStep > 1 ? (
                  <button
                    onClick={handleBack}
                    className="btn-outline flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    onClick={handleNext}
                    className="btn-primary flex items-center gap-2"
                  >
                    Continuar
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        A processar...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4" />
                        Finalizar Pedido
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              total={total}
              coupon={coupon}
              onApplyCoupon={applyCoupon}
              onRemoveCoupon={removeCoupon}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
