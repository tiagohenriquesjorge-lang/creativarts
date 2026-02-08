import { create } from 'zustand'
import type { ToastType } from '@/components/ui/Toast'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastState {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  success: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
  info: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }))
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }))
  },

  success: (message, duration = 5000) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    set((state) => ({
      toasts: [...state.toasts, { id, type: 'success', message, duration }],
    }))
  },

  error: (message, duration = 5000) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    set((state) => ({
      toasts: [...state.toasts, { id, type: 'error', message, duration }],
    }))
  },

  info: (message, duration = 5000) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    set((state) => ({
      toasts: [...state.toasts, { id, type: 'info', message, duration }],
    }))
  },

  warning: (message, duration = 5000) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    set((state) => ({
      toasts: [...state.toasts, { id, type: 'warning', message, duration }],
    }))
  },
}))

