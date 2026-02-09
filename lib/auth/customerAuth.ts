import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export interface CustomerProfile {
  id: string
  email: string
  full_name?: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface CustomerAddress {
  id: string
  user_id: string
  address_name: string // e.g., "Casa", "Trabalho"
  full_name: string
  phone: string
  address: string
  city: string
  postal_code: string
  country: string
  is_default: boolean
  created_at: string
}

/**
 * Sign up a new customer
 */
export async function signUp(email: string, password: string, fullName?: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, user: data.user }
  } catch (error: any) {
    return { success: false, error: error.message || 'Erro ao criar conta' }
  }
}

/**
 * Sign in an existing customer
 */
export async function signIn(email: string, password: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, user: data.user }
  } catch (error: any) {
    return { success: false, error: error.message || 'Erro ao fazer login' }
  }
}

/**
 * Sign out the current customer
 */
export async function signOut() {
  const supabase = createClient()

  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Erro ao fazer logout' }
  }
}

/**
 * Get the current authenticated customer
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Update customer password
 */
export async function updatePassword(newPassword: string) {
  const supabase = createClient()

  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Erro ao atualizar password' }
  }
}

/**
 * Update customer profile
 */
export async function updateProfile(fullName: string, phone?: string) {
  const supabase = createClient()

  try {
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        phone: phone,
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Erro ao atualizar perfil' }
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string) {
  const supabase = createClient()

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Erro ao enviar email' }
  }
}

