"use server"
import { revalidatePath } from 'next/cache'
import { prisma } from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/schema"

export const completeOrder = async (formData: FormData) => {
  const { id: orderId } = Object.fromEntries(formData)
  const data = { orderId }
  const result = OrderIdSchema.safeParse(data)

  if (result.success) {
    try {
      await prisma.order.update({
        where: {
          id: +orderId
        },
        data: {
          status: true,
          orderReadyAt: new Date(Date.now())
        }
      })

      revalidatePath('admin/orders')
    } catch (error) {
      console.log(error)
    }
  }

}