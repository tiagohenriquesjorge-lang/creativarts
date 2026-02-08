import { supabase } from '@/lib/supabase/client'

export interface Coupon {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  min_purchase_amount: number | null
  max_discount_amount: number | null
  valid_from: string
  valid_until: string
  usage_limit: number | null
  usage_count: number
  is_active: boolean
  applicable_products: string[] | null
  applicable_categories: string[] | null
}

export interface CouponValidationResult {
  valid: boolean
  coupon?: Coupon
  error?: string
  discount?: number
}

/**
 * Valida um cupão de desconto
 */
export async function validateCoupon(
  code: string,
  subtotal: number,
  productIds: string[] = []
): Promise<CouponValidationResult> {
  try {
    // Buscar cupão na base de dados
    const { data: coupon, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .single()

    if (error || !coupon) {
      return {
        valid: false,
        error: 'Cupão inválido ou não encontrado',
      }
    }

    // Verificar se está ativo
    if (!coupon.is_active) {
      return {
        valid: false,
        error: 'Este cupão não está ativo',
      }
    }

    // Verificar datas de validade
    const now = new Date()
    const validFrom = new Date(coupon.valid_from)
    const validUntil = new Date(coupon.valid_until)

    if (now < validFrom) {
      return {
        valid: false,
        error: 'Este cupão ainda não está válido',
      }
    }

    if (now > validUntil) {
      return {
        valid: false,
        error: 'Este cupão expirou',
      }
    }

    // Verificar limite de uso
    if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
      return {
        valid: false,
        error: 'Este cupão atingiu o limite de utilizações',
      }
    }

    // Verificar valor mínimo de compra
    if (coupon.min_purchase_amount && subtotal < coupon.min_purchase_amount) {
      return {
        valid: false,
        error: `Valor mínimo de compra: €${coupon.min_purchase_amount.toFixed(2)}`,
      }
    }

    // Verificar produtos aplicáveis
    if (coupon.applicable_products && coupon.applicable_products.length > 0) {
      const hasApplicableProduct = productIds.some((id) =>
        coupon.applicable_products?.includes(id)
      )
      if (!hasApplicableProduct) {
        return {
          valid: false,
          error: 'Este cupão não é aplicável aos produtos no carrinho',
        }
      }
    }

    // Calcular desconto
    const discount = calculateDiscount(coupon, subtotal)

    return {
      valid: true,
      coupon,
      discount,
    }
  } catch (error) {
    console.error('Error validating coupon:', error)
    return {
      valid: false,
      error: 'Erro ao validar cupão. Tente novamente.',
    }
  }
}

/**
 * Calcula o valor do desconto baseado no cupão
 */
export function calculateDiscount(coupon: Coupon, subtotal: number): number {
  let discount = 0

  if (coupon.type === 'percentage') {
    discount = (subtotal * coupon.value) / 100
  } else if (coupon.type === 'fixed') {
    discount = coupon.value
  }

  // Aplicar desconto máximo se definido
  if (coupon.max_discount_amount && discount > coupon.max_discount_amount) {
    discount = coupon.max_discount_amount
  }

  // Garantir que o desconto não excede o subtotal
  if (discount > subtotal) {
    discount = subtotal
  }

  return Math.round(discount * 100) / 100 // Arredondar para 2 casas decimais
}

/**
 * Incrementa o contador de uso de um cupão
 */
export async function incrementCouponUsage(couponId: string): Promise<void> {
  try {
    await supabase.rpc('increment_coupon_usage', { coupon_id: couponId })
  } catch (error) {
    console.error('Error incrementing coupon usage:', error)
  }
}

