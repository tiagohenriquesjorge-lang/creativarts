import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_CONFIG } from '@/lib/stripe/config'
import type { CartItem } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, coupon, personalInfo, shippingAddress } = body

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Carrinho vazio' },
        { status: 400 }
      )
    }

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    )

    let discount = 0
    if (coupon) {
      if (coupon.type === 'percentage') {
        discount = (subtotal * coupon.value) / 100
      } else if (coupon.type === 'fixed') {
        discount = coupon.value
      }
      if (coupon.max_discount_amount && discount > coupon.max_discount_amount) {
        discount = coupon.max_discount_amount
      }
      if (discount > subtotal) {
        discount = subtotal
      }
    }

    const shipping = subtotal >= 50 ? 0 : 5.99
    const total = subtotal - discount + shipping

    // Create Stripe line items
    const lineItems = items.map((item: CartItem) => ({
      price_data: {
        currency: STRIPE_CONFIG.currency,
        product_data: {
          name: item.product.name,
          description: item.variant?.name || undefined,
          images: item.product.images?.[0]?.url ? [item.product.images[0].url] : [],
          metadata: {
            product_id: item.product_id,
            variant_id: item.variant_id || '',
            customization: item.customization ? JSON.stringify(item.customization) : '',
          },
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }))

    // Add shipping as line item if applicable
    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: STRIPE_CONFIG.currency,
          product_data: {
            name: 'Envio',
            description: 'Custos de envio',
          },
          unit_amount: Math.round(shipping * 100),
        },
        quantity: 1,
      })
    }

    // Add discount as line item if applicable
    if (discount > 0) {
      lineItems.push({
        price_data: {
          currency: STRIPE_CONFIG.currency,
          product_data: {
            name: `Desconto - ${coupon.code}`,
            description: coupon.type === 'percentage' 
              ? `${coupon.value}% de desconto` 
              : `€${coupon.value} de desconto`,
          },
          unit_amount: -Math.round(discount * 100), // Negative amount for discount
        },
        quantity: 1,
      })
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: STRIPE_CONFIG.paymentMethodTypes as any,
      mode: STRIPE_CONFIG.mode as any,
      line_items: lineItems,
      success_url: STRIPE_CONFIG.successUrl,
      cancel_url: STRIPE_CONFIG.cancelUrl,
      customer_email: personalInfo.email,
      metadata: {
        customer_name: `${personalInfo.firstName} ${personalInfo.lastName}`,
        customer_phone: personalInfo.phone,
        shipping_address: JSON.stringify(shippingAddress),
        coupon_id: coupon?.id || '',
        coupon_code: coupon?.code || '',
      },
      shipping_address_collection: {
        allowed_countries: ['PT', 'ES', 'FR', 'DE', 'IT', 'GB'],
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Erro ao criar sessão de pagamento' },
      { status: 500 }
    )
  }
}

