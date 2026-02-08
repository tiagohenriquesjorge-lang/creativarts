// Google Analytics 4 Configuration and Helper Functions

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

// Check if GA is enabled
export const isGAEnabled = (): boolean => {
  return !!GA_MEASUREMENT_ID && typeof window !== 'undefined'
}

// Initialize GA
export const initGA = () => {
  if (!isGAEnabled()) return

  // GA will be initialized by the script tag in GoogleAnalytics component
  console.log('✅ Google Analytics initialized:', GA_MEASUREMENT_ID)
}

// Page view tracking
export const pageview = (url: string) => {
  if (!isGAEnabled()) return

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

// Event tracking
interface GtagEvent {
  action: string
  category?: string
  label?: string
  value?: number
  [key: string]: any
}

export const event = ({ action, category, label, value, ...params }: GtagEvent) => {
  if (!isGAEnabled()) return

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...params,
  })
}

// E-commerce Events

// View Item List (Product Listing Page)
export const viewItemList = (items: any[], listName: string = 'Product Listing') => {
  if (!isGAEnabled()) return

  window.gtag('event', 'view_item_list', {
    item_list_name: listName,
    items: items.map((item, index) => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category?.name,
      price: item.base_price,
      index: index,
    })),
  })
}

// View Item (Product Detail Page)
export const viewItem = (product: any) => {
  if (!isGAEnabled()) return

  window.gtag('event', 'view_item', {
    currency: 'EUR',
    value: product.base_price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category?.name,
        price: product.base_price,
      },
    ],
  })
}

// Add to Cart
export const addToCart = (product: any, variant?: any, quantity: number = 1, customization?: any) => {
  if (!isGAEnabled()) return

  const price = variant ? product.base_price + variant.price_adjustment : product.base_price
  const itemName = variant ? `${product.name} - ${variant.name}` : product.name

  window.gtag('event', 'add_to_cart', {
    currency: 'EUR',
    value: price * quantity,
    items: [
      {
        item_id: product.id,
        item_name: itemName,
        item_category: product.category?.name,
        item_variant: variant?.name,
        price: price,
        quantity: quantity,
        customization: customization ? 'Yes' : 'No',
      },
    ],
  })
}

// Remove from Cart
export const removeFromCart = (product: any, quantity: number = 1) => {
  if (!isGAEnabled()) return

  window.gtag('event', 'remove_from_cart', {
    currency: 'EUR',
    value: product.base_price * quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category?.name,
        price: product.base_price,
        quantity: quantity,
      },
    ],
  })
}

// Begin Checkout
export const beginCheckout = (items: any[], total: number) => {
  if (!isGAEnabled()) return

  window.gtag('event', 'begin_checkout', {
    currency: 'EUR',
    value: total,
    items: items.map((item) => ({
      item_id: item.product.id,
      item_name: item.product.name,
      item_category: item.product.category?.name,
      price: item.price,
      quantity: item.quantity,
    })),
  })
}

// Purchase
export const purchase = (orderId: string, items: any[], total: number, coupon?: string) => {
  if (!isGAEnabled()) return

  window.gtag('event', 'purchase', {
    transaction_id: orderId,
    currency: 'EUR',
    value: total,
    coupon: coupon,
    items: items.map((item) => ({
      item_id: item.product.id,
      item_name: item.product.name,
      item_category: item.product.category?.name,
      price: item.price,
      quantity: item.quantity,
    })),
  })
}

// Declare gtag on window
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

