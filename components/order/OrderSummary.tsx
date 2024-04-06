"use client"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatPriceToPen } from "@/src/helpers"
import { createOrder } from "@/actions/create.order.action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

const OrderSummary = () => {
  const order = useStore(state => state.order)
  const clearCart = useStore(state => state.clearCart)
  const total = useMemo(() => order.reduce((total, item) => item.subtotal + total, 0), [order])

  const handleCreateOrder = async (formData: FormData) => {
    const { name } = Object.fromEntries(formData)
    const data = { name, total, order }
    const result = OrderSchema.safeParse(data)
    
    if (!result.success) {
      result.error.issues.forEach(issue => {
        toast.error(issue.message)
      })
      return
    }

    const response = await createOrder(data)
    if (response?.errors) {
      response.errors.forEach(issue => {
        toast.error(issue.message)
      })
    }

    toast.success('Pedido realizado correctamente')
    clearCart()
  }

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl font-black text-center">Mi pedido</h1>

      {order.length === 0 ? (
        <p className="text-center my-10">El pedido esta vacío</p>
      ): (
        <div className="mt-5">
          { order.map(item => (
            <ProductDetails key={item.id} item={item} />
          ))}

          <p className="text-2xl mt-10 text-center">
            Total a pagar:
            <span className="font-bold"> { formatPriceToPen(total) }</span>
          </p>

          <form
            className="w-full mt-10 space-y-5"
            action={handleCreateOrder}
          >
            <input
              type="text"
              placeholder="Tu nombre"
              className="bg-white border border-gray-100 p-2 w-full"
              name="name"
            />
            <input
              type="submit"
              className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
              value='Confirmar pedido'
            />
          </form>
        </div>
      )}
    </aside>
  )
}

export default OrderSummary