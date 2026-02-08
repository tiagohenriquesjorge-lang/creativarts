import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/config'
import { supabase } from '@/lib/supabase/client'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Create order in Supabase
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: null, // Guest checkout
            status: 'pending',
            total_price: (session.amount_total || 0) / 100,
            payment_status: 'paid',
            payment_method: 'stripe',
            stripe_session_id: session.id,
            customer_email: session.customer_email,
            customer_name: session.metadata?.customer_name,
            customer_phone: session.metadata?.customer_phone,
            shipping_address: session.metadata?.shipping_address 
              ? JSON.parse(session.metadata.shipping_address)
              : null,
          })
          .select()
          .single()

        if (orderError) {
          console.error('Error creating order:', orderError)
          return NextResponse.json(
            { error: 'Error creating order' },
            { status: 500 }
          )
        }

        // Increment coupon usage if applicable
        if (session.metadata?.coupon_id) {
          await supabase.rpc('increment_coupon_usage', {
            coupon_id: session.metadata.coupon_id,
          })
        }

        // TODO: Send confirmation email
        // TODO: Create order items
        // TODO: Update stock

        console.log('Order created:', order.id)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.error('Payment failed:', paymentIntent.id)
        // TODO: Handle failed payment (notify customer, update order status)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

