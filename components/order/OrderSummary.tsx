"use client"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatPriceToPen } from "@/src/helpers"

const OrderSummary = () => {
  const order = useStore(state => state.order)
  const total = useMemo(() => order.reduce((total, item) => item.subtotal + total, 0), [order])
  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl font-black text-center">Mi pedido</h1>

      {order.length === 0 ? (
        <p className="text-center my-10">El carrito esta vacío</p>
      ): (
        <div className="mt-5">
          { order.map(item => (
            <ProductDetails key={item.id} item={item} />
          ))}

          <p className="text-2xl mt-10 text-center">
            Total a pagar:
            <span className="font-bold"> { formatPriceToPen(total) }</span>
          </p>
        </div>
      )}
    </aside>
  )
}

export default OrderSummary