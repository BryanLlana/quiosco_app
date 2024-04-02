import { create } from 'zustand'
import { OrderItem } from '../types'
import { Product } from '@prisma/client'

interface Store {
  order: OrderItem[],
  addToCart: (product: Product) => void
}

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
  })
}))