// Admin Authentication Utilities
import { supabase } from '@/lib/supabase/client'

// Lista de emails autorizados como administradores
// TODO: Mover para variável de ambiente ou tabela no Supabase
const ADMIN_EMAILS = [
  'admin@creativarts.pt',
  'tiago@creativarts.pt',
  // Adicione mais emails de administradores aqui
]

/**
 * Verifica se o usuário atual é um administrador
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user || !user.email) {
      return false
    }
    
    return ADMIN_EMAILS.includes(user.email.toLowerCase())
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

/**
 * Obtém o usuário atual autenticado
 */
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) throw error
    
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Faz login com email e senha
 */
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    
    // Verificar se é admin
    if (!ADMIN_EMAILS.includes(email.toLowerCase())) {
      await supabase.auth.signOut()
      throw new Error('Acesso negado. Você não tem permissões de administrador.')
    }
    
    return { user: data.user, session: data.session }
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao fazer login')
  }
}

/**
 * Faz logout
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao fazer logout')
  }
}

/**
 * Verifica se há uma sessão ativa
 */
export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

/**
 * Hook para escutar mudanças no estado de autenticação
 */
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange(callback)
}

