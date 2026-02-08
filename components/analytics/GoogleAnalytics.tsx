'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { GA_MEASUREMENT_ID, initGA } from '@/lib/analytics/gtag'

export default function GoogleAnalytics() {
  const [analytics, setAnalytics] = useState(false)

  // Check consent from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return

    const consent = localStorage.getItem('cookie-consent')
    if (consent) {
      const preferences = JSON.parse(consent)
      setAnalytics(preferences.analytics || false)
    }
  }, [])

  // Initialize GA on mount
  useEffect(() => {
    if (analytics) {
      initGA()
    }
  }, [analytics])

  // Don't load GA if no measurement ID or consent not given
  if (!GA_MEASUREMENT_ID || !analytics) {
    return null
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Consent Mode v2
            gtag('consent', 'default', {
              'analytics_storage': '${analytics ? 'granted' : 'denied'}',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure',
              anonymize_ip: true
            });
          `,
        }}
      />
    </>
  )
}

