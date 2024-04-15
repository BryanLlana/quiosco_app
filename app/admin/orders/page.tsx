"use client"
import useSWR from 'swr'
import OrderCard from '@/components/order/OrderCard'
import { OrderWithProducts } from '@/src/types'

const OrdersPage = () => {
  const url = '/admin/orders/api'
  const fetcher = () => fetch(url).then(response => response.json())
    .then(data => data)
  const { data, isLoading, error } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false
  })

  if (isLoading) return '...cargando'

  if (data) return (
    <>
      <h1 className="text-2xl my-10">Administrar ordenes</h1>

      { data.length ? (
        <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5'>
          { data.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : 
        <p className="text-center">No hay ordenes pendientes</p>}
    </>
  )
}

export default OrdersPage