import { create } from 'zustand'
import { OrderItem } from '../types'
import { Product } from '@prisma/client'

interface Store {
  order: OrderItem[],
  addToCart: (product: Product) => void,
  decrementQuantity: (id: Product['id']) => void,
  incrementQuantity: (id: Product['id']) => void,
  deleteToCart: (id: Product['id']) => void,
  clearCart: () => void
}

export const MAX_QUANTITY = 5
export const MIN_QUANTITY = 1

export const useStore = create<Store>((set) => ({
  order: [],
  addToCart: (product) => set(state => {
    const productExists = state.order.find(p => p.id === product.id)
    let orderUpdate: OrderItem[] = []
    if (productExists) {
      orderUpdate = state.order.map(p => p.id === product.id ? { ...p, quantity: ++p.quantity, subtotal: p.quantity * p.price } : p)
    } else {
      const { categoryId, image, ...values} = product
      orderUpdate = [...state.order, { ...values, quantity: 1, subtotal: product.price }]
    }

    return {
      order: orderUpdate
    }
  }),
  decrementQuantity: (id) => set(state => {
    const orderUpdate = state.order.map(product => {
      if (product.id === id) {
        if (product.quantity > MIN_QUANTITY) {
          return {
            ...product,
            quantity: --product.quantity,
            subtotal: product.quantity * product.price
          }
        }
      }
      return product
    })
    return {
      order: orderUpdate
    }
  }),
  incrementQuantity: (id) => set(state => {
    const orderUpdate = state.order.map(product => {
      if (product.id === id) {
        if (product.quantity < MAX_QUANTITY) {
          return {
            ...product,
            quantity: ++product.quantity,
            subtotal: product.quantity * product.price
          }
        }
      }
      return product
    })
    return {
      order: orderUpdate
    }
  }),
  deleteToCart: (id) => set(state => {
    const orderUpdate = state.order.filter(product => product.id !== id)
    return {
      order: orderUpdate
    }
  }),
  clearCart: () => set(state => {
    return {
      order: []
    }
  })
}))