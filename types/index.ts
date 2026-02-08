// Product Types
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  short_description?: string
  category_id: string
  category?: Category
  base_price: number
  images?: ProductImage[]
  variants?: ProductVariant[]
  is_customizable: boolean
  customization_options?: CustomizationOptions
  tags: string[]
  is_active: boolean
  featured: boolean
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
}

export interface ProductImage {
  id: string
  product_id: string
  url: string
  alt_text: string
  position: number
  is_primary: boolean
}

export interface ProductVariant {
  id: string
  product_id: string
  sku: string
  name: string
  color?: string
  size?: string
  material?: string
  price_adjustment: number
  stock_quantity: number
  is_active: boolean
  image_url?: string
}

export interface CustomizationOptions {
  allow_text: boolean
  max_text_length?: number
  text_positions?: string[]
  allow_image_upload: boolean
  max_image_size_mb?: number
  allowed_image_formats?: string[]
  preview_template_url?: string
}

// Category Types
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  parent_id?: string
  position: number
  is_active: boolean
}

// Cart Types
export interface CartItem {
  id: string
  product_id: string
  product: Product
  variant_id?: string
  variant?: ProductVariant
  quantity: number
  customization?: CartItemCustomization
  price: number
}

export interface CartItemCustomization {
  text?: string
  text_position?: string
  image_url?: string
  image_file?: File
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  coupon_code?: string
}

// Order Types
export type OrderStatus = 
  | 'new' 
  | 'paid' 
  | 'processing' 
  | 'shipped' 
  | 'completed' 
  | 'cancelled' 
  | 'refunded'

export interface Order {
  id: string
  order_number: string
  user_id?: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  discount: number
  shipping_cost: number
  tax: number
  total: number
  currency: string
  customer_email: string
  customer_name: string
  shipping_address: Address
  billing_address: Address
  payment_method: string
  payment_intent_id?: string
  tracking_number?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  variant_id?: string
  variant_name?: string
  quantity: number
  unit_price: number
  total_price: number
  customization?: CartItemCustomization
}

export interface Address {
  full_name: string
  address_line1: string
  address_line2?: string
  city: string
  state?: string
  postal_code: string
  country: string
  phone: string
}

// Coupon Types
export interface Coupon {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  min_purchase_amount?: number
  max_discount_amount?: number
  valid_from: string
  valid_until: string
  usage_limit?: number
  usage_count: number
  is_active: boolean
  applicable_products?: string[]
  applicable_categories?: string[]
}

// User/Customer Types
export interface User {
  id: string
  email: string
  full_name?: string
  phone?: string
  addresses: Address[]
  created_at: string
}

// Filter Types for PLP
export interface ProductFilters {
  category?: string
  min_price?: number
  max_price?: number
  colors?: string[]
  sizes?: string[]
  tags?: string[]
  is_customizable?: boolean
  sort_by?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest'
  page?: number
  per_page?: number
}

