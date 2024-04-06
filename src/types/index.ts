import { Order, OrderProducts, Product } from "@prisma/client";

export type OrderItem = Omit<Product, 'image' | 'categoryId'> & {
  quantity: number,
  subtotal: number
}

export type OrderWithProducts = Order & {
  orderProducts: (OrderProducts & {
    product: Product
  })[]
}