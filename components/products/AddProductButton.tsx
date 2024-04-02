"use client"
import { useStore } from "@/src/store"
import { Product } from "@prisma/client"

type Props = {
  product: Product
}

const AddProductButton = ({ product }: Props) => {
  const addToCart = useStore(state => state.addToCart) 
  return (
    <button
      type="button"
      className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 font-bold cursor-pointer"
      onClick={() => addToCart(product)}
    >Agregar</button>
  )
}

export default AddProductButton