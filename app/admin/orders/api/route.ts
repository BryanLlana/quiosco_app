import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const ordersPending = await prisma.order.findMany({
    where: {
      status: false
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })

  return Response.json(ordersPending)
}