'use client'

import type { Metadata } from 'next'
import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { useToastStore } from '@/store/toastStore'

export default function ContactosPage() {
  const toast = useToastStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Por favor, preencha todos os campos!')
      return
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Por favor, insira um email válido!')
      return
    }

    setIsSubmitting(true)

    // Simular envio (em produção, aqui faria uma chamada à API)
    setTimeout(() => {
      toast.success('Mensagem enviada com sucesso! Responderemos em breve.')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue/20 via-brand-yellow/10 to-brand-red/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-gray-dark mb-6">
              Entre em Contacto
            </h1>
            <p className="text-xl text-brand-gray-dark/80 leading-relaxed">
              Tem alguma dúvida ou sugestão? Estamos aqui para ajudar!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark mb-6">
                  Informações de Contacto
                </h2>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-brand-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-1">Email</h3>
                  <a 
                    href="mailto:info@creativarts.pt" 
                    className="text-brand-blue hover:underline"
                  >
                    info@creativarts.pt
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-yellow/10 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-brand-yellow" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-1">Telefone</h3>
                  <a 
                    href="tel:+351912345678" 
                    className="text-brand-blue hover:underline"
                  >
                    +351 912 345 678
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-brand-red" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-1">Morada</h3>
                  <p className="text-brand-gray-dark/70">
                    Rua da Criatividade, 123<br />
                    1000-001 Lisboa<br />
                    Portugal
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-brand-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-gray-dark mb-1">Horário</h3>
                  <p className="text-brand-gray-dark/70">
                    Segunda a Sexta: 9h - 18h<br />
                    Sábado: 10h - 14h<br />
                    Domingo: Encerrado
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-brand-gray-light/30 rounded-lg p-8">
                <h2 className="text-2xl font-heading font-bold text-brand-gray-dark mb-6">
                  Envie-nos uma Mensagem
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-gray-dark mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="O seu nome"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-gray-dark mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="seuemail@exemplo.com"
                      required
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-brand-gray-dark mb-2">
                      Assunto *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="input-field"
                      required
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="Informações sobre produtos">Informações sobre produtos</option>
                      <option value="Personalização">Personalização</option>
                      <option value="Encomenda">Estado da encomenda</option>
                      <option value="Devoluções">Devoluções e trocas</option>
                      <option value="Sugestões">Sugestões</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-gray-dark mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="input-field resize-none"
                      placeholder="Escreva a sua mensagem aqui..."
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        A enviar...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

