import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product, ProductVariant, CartItemCustomization } from '@/types'
import { validateCoupon, type Coupon } from '@/lib/services/couponService'

interface CartState {
  items: CartItem[]
  couponCode?: string
  coupon?: Coupon
  discount: number
  addItem: (
    product: Product,
    variant?: ProductVariant,
    quantity?: number,
    customization?: CartItemCustomization
  ) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  updateCustomization: (itemId: string, customization: CartItemCustomization) => void
  applyCoupon: (code: string) => Promise<{ success: boolean; error?: string }>
  removeCoupon: () => void
  clearCart: () => void
  getSubtotal: () => number
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: undefined,
      coupon: undefined,
      discount: 0,

      addItem: (product, variant, quantity = 1, customization) => {
        const state = get()
        const price = variant 
          ? product.base_price + variant.price_adjustment 
          : product.base_price

        // Check if item already exists (same product, variant, and customization)
        const existingItemIndex = state.items.findIndex(
          (item) =>
            item.product_id === product.id &&
            item.variant_id === variant?.id &&
            JSON.stringify(item.customization) === JSON.stringify(customization)
        )

        if (existingItemIndex > -1) {
          // Update quantity of existing item
          const newItems = [...state.items]
          newItems[existingItemIndex].quantity += quantity
          set({ items: newItems })
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}-${variant?.id || 'no-variant'}-${Date.now()}`,
            product_id: product.id,
            product,
            variant_id: variant?.id,
            variant,
            quantity,
            customization,
            price,
          }
          set({ items: [...state.items, newItem] })
        }
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }))
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }))
      },

      updateCustomization: (itemId, customization) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, customization } : item
          ),
        }))
      },

      applyCoupon: async (code) => {
        try {
          const state = get()
          const subtotal = state.getSubtotal()
          const productIds = state.items.map((item) => item.product_id)

          const result = await validateCoupon(code, subtotal, productIds)

          if (result.valid && result.coupon && result.discount !== undefined) {
            set({
              couponCode: code.toUpperCase(),
              coupon: result.coupon,
              discount: result.discount
            })
            return { success: true }
          } else {
            return { success: false, error: result.error }
          }
        } catch (error) {
          console.error('Error applying coupon:', error)
          return { success: false, error: 'Erro ao validar cupão. Tente novamente.' }
        }
      },

      removeCoupon: () => {
        set({ couponCode: undefined, coupon: undefined, discount: 0 })
      },

      clearCart: () => {
        set({ items: [], couponCode: undefined, coupon: undefined, discount: 0 })
      },

      getSubtotal: () => {
        const state = get()
        return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },

      getTotal: () => {
        const state = get()
        const subtotal = state.getSubtotal()
        // TODO: Add shipping and tax calculation
        return subtotal - state.discount
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

