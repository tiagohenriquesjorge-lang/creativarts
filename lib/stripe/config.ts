import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const STRIPE_CONFIG = {
  currency: 'eur',
  paymentMethodTypes: ['card', 'multibanco'],
  mode: 'payment',
  successUrl: `${process.env.NEXT_PUBLIC_URL}/checkout/sucesso?session_id={CHECKOUT_SESSION_ID}`,
  cancelUrl: `${process.env.NEXT_PUBLIC_URL}/checkout`,
}

