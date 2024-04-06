import OrderCard from '@/components/order/OrderCard'
import { prisma } from '@/src/lib/prisma'
import React from 'react'

const getPendingOrders = async () => {
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

  return ordersPending
}

const OrdersPage = async () => {
  const ordersPending = await getPendingOrders()
  return (
    <>
      <h1 className="text-2xl my-10">Administrar ordenes</h1>

      { ordersPending.length ? (
        <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5'>
          { ordersPending.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : 
        <p className="text-center">No hay ordenes pendientes</p>}
    </>
  )
}

export default OrdersPage