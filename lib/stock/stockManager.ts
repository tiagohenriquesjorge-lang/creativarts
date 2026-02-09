/**
 * Stock Management Utilities
 * Handles stock operations: decrement, increment, check availability
 */

import { supabase } from '@/lib/supabase/client'

export interface StockHistoryEntry {
  product_variant_id: string
  order_id?: string
  quantity_change: number
  previous_quantity: number
  new_quantity: number
  reason: 'order_created' | 'order_cancelled' | 'manual_adjustment' | 'stock_correction'
  notes?: string
  created_by?: string
}

/**
 * Check if sufficient stock is available
 */
export async function checkStockAvailability(
  variantId: string,
  requestedQuantity: number
): Promise<{ available: boolean; currentStock: number; message?: string }> {
  const { data: variant, error } = await supabase
    .from('product_variants')
    .select('stock_quantity')
    .eq('id', variantId)
    .single()

  if (error || !variant) {
    return {
      available: false,
      currentStock: 0,
      message: 'Variante não encontrada',
    }
  }

  const currentStock = variant.stock_quantity || 0

  if (currentStock < requestedQuantity) {
    return {
      available: false,
      currentStock,
      message: `Stock insuficiente. Disponível: ${currentStock} unidades`,
    }
  }

  return {
    available: true,
    currentStock,
  }
}

/**
 * Decrement stock for an order
 */
export async function decrementStock(
  variantId: string,
  quantity: number,
  orderId?: string,
  userId?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get current stock
    const { data: variant, error: fetchError } = await supabase
      .from('product_variants')
      .select('stock_quantity')
      .eq('id', variantId)
      .single()

    if (fetchError || !variant) {
      return { success: false, error: 'Variante não encontrada' }
    }

    const previousQuantity = variant.stock_quantity || 0
    const newQuantity = previousQuantity - quantity

    if (newQuantity < 0) {
      return { success: false, error: 'Stock insuficiente' }
    }

    // Update stock
    const { error: updateError } = await supabase
      .from('product_variants')
      .update({ stock_quantity: newQuantity })
      .eq('id', variantId)

    if (updateError) {
      return { success: false, error: 'Erro ao atualizar stock' }
    }

    // Record in history
    await recordStockHistory({
      product_variant_id: variantId,
      order_id: orderId,
      quantity_change: -quantity,
      previous_quantity: previousQuantity,
      new_quantity: newQuantity,
      reason: 'order_created',
      created_by: userId,
    })

    return { success: true }
  } catch (error) {
    console.error('Error decrementing stock:', error)
    return { success: false, error: 'Erro ao decrementar stock' }
  }
}

/**
 * Increment stock (e.g., when order is cancelled)
 */
export async function incrementStock(
  variantId: string,
  quantity: number,
  orderId?: string,
  userId?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get current stock
    const { data: variant, error: fetchError } = await supabase
      .from('product_variants')
      .select('stock_quantity')
      .eq('id', variantId)
      .single()

    if (fetchError || !variant) {
      return { success: false, error: 'Variante não encontrada' }
    }

    const previousQuantity = variant.stock_quantity || 0
    const newQuantity = previousQuantity + quantity

    // Update stock
    const { error: updateError } = await supabase
      .from('product_variants')
      .update({ stock_quantity: newQuantity })
      .eq('id', variantId)

    if (updateError) {
      return { success: false, error: 'Erro ao atualizar stock' }
    }

    // Record in history
    await recordStockHistory({
      product_variant_id: variantId,
      order_id: orderId,
      quantity_change: quantity,
      previous_quantity: previousQuantity,
      new_quantity: newQuantity,
      reason: 'order_cancelled',
      created_by: userId,
    })

    return { success: true }
  } catch (error) {
    console.error('Error incrementing stock:', error)
    return { success: false, error: 'Erro ao incrementar stock' }
  }
}

/**
 * Record stock history entry
 */
async function recordStockHistory(entry: StockHistoryEntry): Promise<void> {
  await supabase.from('stock_history').insert(entry)
}

