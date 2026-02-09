'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { useToastStore } from '@/store/toastStore'
import CheckoutSteps from '@/components/checkout/CheckoutSteps'
import CartReview from '@/components/checkout/CartReview'
import PersonalInfoForm, { PersonalInfo } from '@/components/checkout/PersonalInfoForm'
import ShippingForm, { ShippingAddress } from '@/components/checkout/ShippingForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import { ArrowLeft, ArrowRight, CreditCard } from 'lucide-react'
import Link from 'next/link'
import * as gtag from '@/lib/analytics/gtag'

const steps = [
  { number: 1, title: 'Carrinho', description: 'Reveja os produtos' },
  { number: 2, title: 'Informações', description: 'Dados pessoais' },
  { number: 3, title: 'Envio', description: 'Morada de entrega' },
  { number: 4, title: 'Pagamento', description: 'Finalizar pedido' },
]

const STORAGE_KEY = 'creativarts_checkout_data'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, coupon, discount, applyCoupon, removeCoupon, getSubtotal, getTotal, clearCart, updateQuantity, removeItem } = useCartStore()
  const toast = useToastStore()

  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  // Form data
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nif: '',
  })

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    notes: '',
    shippingMethod: 'standard',
  })

  // Errors
  const [personalInfoErrors, setPersonalInfoErrors] = useState<Partial<Record<keyof PersonalInfo, string>>>({})
  const [shippingErrors, setShippingErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({})

  // Load saved data from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const data = JSON.parse(saved)
        if (data.personalInfo) setPersonalInfo(data.personalInfo)
        if (data.shippingAddress) setShippingAddress(data.shippingAddress)
        if (data.currentStep) setCurrentStep(data.currentStep)
      }
    } catch (error) {
      console.error('Error loading checkout data:', error)
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        personalInfo,
        shippingAddress,
        currentStep,
      }))
    } catch (error) {
      console.error('Error saving checkout data:', error)
    }
  }, [personalInfo, shippingAddress, currentStep])

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
  const getShippingCost = () => {
    if (shippingAddress.shippingMethod === 'express') {
      return 9.99
    }
    // Standard shipping: free over €50
    return subtotal >= 50 ? 0 : 5.99
  }
  const shipping = getShippingCost()
  const total = getTotal() + shipping

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
    if (!shippingAddress.shippingMethod) {
      errors.shippingMethod = 'Selecione um método de envio'
    }

    setShippingErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Navigation handlers
  const handleNext = () => {
    if (currentStep === 1) {
      // Step 1: Cart Review - just move to next step
      setCurrentStep(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (currentStep === 2) {
      // Step 2: Personal Info - validate before moving
      if (validatePersonalInfo()) {
        setCurrentStep(3)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        toast.error('Por favor, preencha todos os campos obrigatórios')
      }
    } else if (currentStep === 3) {
      // Step 3: Shipping - validate before moving
      if (validateShippingAddress()) {
        setCurrentStep(4)
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
          shippingCost: shipping,
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao criar sessão de pagamento')
      }

      const { url } = await response.json()

      // Clear saved checkout data
      localStorage.removeItem(STORAGE_KEY)

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
                <CartReview
                  items={items}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                />
              )}

              {currentStep === 2 && (
                <PersonalInfoForm
                  data={personalInfo}
                  onChange={setPersonalInfo}
                  errors={personalInfoErrors}
                />
              )}

              {currentStep === 3 && (
                <ShippingForm
                  data={shippingAddress}
                  onChange={setShippingAddress}
                  errors={shippingErrors}
                />
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-brand-gray-dark mb-2">
                      Pagamento Seguro
                    </h2>
                    <p className="text-brand-gray-dark/70">
                      Reveja os dados e finalize o seu pedido
                    </p>
                  </div>

                  {/* Payment Methods Info */}
                  <div className="bg-gradient-to-br from-brand-blue/10 to-brand-yellow/10 rounded-lg p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <CreditCard className="h-8 w-8 text-brand-blue" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-brand-gray-dark mb-2">
                          Pagamento Processado por Stripe
                        </h3>
                        <p className="text-sm text-brand-gray-dark/80 mb-3">
                          Pagamento 100% seguro e encriptado. Os seus dados bancários nunca são armazenados nos nossos servidores.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-white rounded-lg p-3 text-center">
                        <p className="text-xs font-semibold text-brand-gray-dark">💳 Cartão</p>
                        <p className="text-xs text-brand-gray-dark/60 mt-1">Visa, Mastercard</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <p className="text-xs font-semibold text-brand-gray-dark">🏦 Multibanco</p>
                        <p className="text-xs text-brand-gray-dark/60 mt-1">Referência MB</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <p className="text-xs font-semibold text-brand-gray-dark">📱 MB WAY</p>
                        <p className="text-xs text-brand-gray-dark/60 mt-1">Pagamento móvel</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <p className="text-xs font-semibold text-brand-gray-dark">🔒 Seguro</p>
                        <p className="text-xs text-brand-gray-dark/60 mt-1">SSL 256-bit</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Review */}
                  <div className="bg-white rounded-lg border-2 border-brand-gray-light p-6">
                    <h3 className="font-heading font-bold text-brand-gray-dark mb-4 flex items-center gap-2">
                      <span>📋</span>
                      Resumo do Pedido
                    </h3>

                    <div className="space-y-4 text-sm">
                      {/* Personal Info */}
                      <div>
                        <p className="font-semibold text-brand-gray-dark mb-2 flex items-center gap-2">
                          <span>👤</span>
                          Dados Pessoais
                        </p>
                        <div className="pl-6 space-y-1">
                          <p className="text-brand-gray-dark/80">
                            {personalInfo.firstName} {personalInfo.lastName}
                          </p>
                          <p className="text-brand-gray-dark/70">{personalInfo.email}</p>
                          <p className="text-brand-gray-dark/70">{personalInfo.phone}</p>
                          {personalInfo.nif && (
                            <p className="text-brand-gray-dark/70">NIF: {personalInfo.nif}</p>
                          )}
                        </div>
                      </div>

                      {/* Shipping Info */}
                      <div className="border-t border-brand-gray-light pt-4">
                        <p className="font-semibold text-brand-gray-dark mb-2 flex items-center gap-2">
                          <span>📦</span>
                          Envio
                        </p>
                        <div className="pl-6 space-y-1">
                          <p className="text-brand-gray-dark/80">{shippingAddress.address}</p>
                          <p className="text-brand-gray-dark/70">
                            {shippingAddress.postalCode} {shippingAddress.city}
                          </p>
                          <p className="text-brand-gray-dark/70">{shippingAddress.country}</p>
                          <p className="text-brand-gray-dark/70 mt-2">
                            <span className="font-medium">Método:</span>{' '}
                            {shippingAddress.shippingMethod === 'express' ? 'Expresso (1-2 dias)' : 'Standard (3-5 dias)'}
                          </p>
                          {shippingAddress.notes && (
                            <p className="text-brand-gray-dark/70 mt-2 italic">
                              Notas: {shippingAddress.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Products */}
                      <div className="border-t border-brand-gray-light pt-4">
                        <p className="font-semibold text-brand-gray-dark mb-2 flex items-center gap-2">
                          <span>🛍️</span>
                          Produtos ({items.length})
                        </p>
                        <div className="pl-6 space-y-2">
                          {items.map((item) => (
                            <div key={item.id} className="flex justify-between text-brand-gray-dark/70">
                              <span>
                                {item.quantity}x {item.product.name}
                                {item.variant?.name && ` (${item.variant.name})`}
                              </span>
                              <span className="font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm">
                    <p className="flex items-start gap-2 text-green-800">
                      <span className="text-lg">🔒</span>
                      <span>
                        <strong>Pagamento 100% Seguro:</strong> Ao clicar em "Finalizar Pedido", será redirecionado para a página de pagamento segura da Stripe. Nenhum dado bancário é armazenado no nosso site.
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-brand-gray-light">
                {currentStep > 1 ? (
                  <button
                    onClick={handleBack}
                    disabled={isProcessing}
                    className="btn-outline flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </button>
                ) : (
                  <Link
                    href="/carrinho"
                    className="btn-outline flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar ao Carrinho
                  </Link>
                )}

                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    disabled={currentStep === 1 && items.length === 0}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continuar
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg px-8 py-3"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                        A processar...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5" />
                        Finalizar Pedido - €{total.toFixed(2)}
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
