import { Product } from "@prisma/client";

export type OrderItem = Omit<Product, 'image' | 'categoryId'> & {
  quantity: number,
  subtotal: number
}