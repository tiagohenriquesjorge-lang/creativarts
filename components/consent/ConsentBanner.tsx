'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, X, Settings } from 'lucide-react'

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      const savedPreferences = JSON.parse(consent)
      setPreferences(savedPreferences)
      applyConsent(savedPreferences)
    }
  }, [])

  const applyConsent = (prefs: typeof preferences) => {
    // Apply consent to analytics and marketing scripts
    if (typeof window !== 'undefined') {
      // Google Analytics Consent Mode
      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: prefs.analytics ? 'granted' : 'denied',
          ad_storage: prefs.marketing ? 'granted' : 'denied',
        })
      }

      // You can add more consent implementations here
      // e.g., Facebook Pixel, etc.
    }
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    setPreferences(allAccepted)
    saveConsent(allAccepted)
  }

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    setPreferences(onlyNecessary)
    saveConsent(onlyNecessary)
  }

  const handleSavePreferences = () => {
    saveConsent(preferences)
  }

  const saveConsent = (prefs: typeof preferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs))
    applyConsent(prefs)
    setShowBanner(false)
    setShowSettings(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
      <div className="container-custom">
        <div className="bg-white rounded-lg shadow-2xl border border-brand-gray-light max-w-4xl mx-auto">
          {!showSettings ? (
            // Main Banner
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <Cookie className="h-8 w-8 text-brand-yellow flex-shrink-0 mt-1" aria-hidden="true" />
                
                <div className="flex-1">
                  <h2 className="text-xl font-heading font-bold text-brand-gray-dark mb-2">
                    Utilizamos Cookies
                  </h2>
                  <p className="text-brand-gray-dark/70 mb-4">
                    Utilizamos cookies para melhorar a sua experiência, analisar o tráfego do site e personalizar conteúdo. 
                    Pode escolher quais cookies aceitar.{' '}
                    <Link href="/cookies" className="text-brand-blue hover:underline focus-visible-ring rounded">
                      Saiba mais
                    </Link>
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleAcceptAll}
                      className="btn-primary"
                    >
                      Aceitar Todos
                    </button>
                    <button
                      onClick={handleRejectAll}
                      className="btn-outline"
                    >
                      Rejeitar Todos
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="btn-outline inline-flex items-center justify-center"
                    >
                      <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
                      Personalizar
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleRejectAll}
                  className="p-2 hover:bg-brand-gray-light rounded-lg transition-colors focus-visible-ring flex-shrink-0"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : (
            // Settings Panel
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-heading font-bold text-brand-gray-dark mb-4">
                Preferências de Cookies
              </h2>

              <div className="space-y-4 mb-6">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between p-4 bg-brand-gray-light rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-brand-gray-dark mb-1">
                      Cookies Necessários
                    </h3>
                    <p className="text-sm text-brand-gray-dark/70">
                      Essenciais para o funcionamento do site. Não podem ser desativados.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="w-5 h-5 rounded border-brand-gray-dark/20"
                      aria-label="Cookies necessários (sempre ativos)"
                    />
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-4 bg-brand-gray-light rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-brand-gray-dark mb-1">
                      Cookies de Análise
                    </h3>
                    <p className="text-sm text-brand-gray-dark/70">
                      Ajudam-nos a entender como os visitantes interagem com o site.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="w-5 h-5 rounded border-brand-gray-dark/20 text-primary focus:ring-primary"
                      aria-label="Cookies de análise"
                    />
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start justify-between p-4 bg-brand-gray-light rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-brand-gray-dark mb-1">
                      Cookies de Marketing
                    </h3>
                    <p className="text-sm text-brand-gray-dark/70">
                      Utilizados para mostrar anúncios relevantes e medir a eficácia das campanhas.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                      className="w-5 h-5 rounded border-brand-gray-dark/20 text-primary focus:ring-primary"
                      aria-label="Cookies de marketing"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={handleSavePreferences} className="btn-primary">
                  Guardar Preferências
                </button>
                <button onClick={() => setShowSettings(false)} className="btn-outline">
                  Voltar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
