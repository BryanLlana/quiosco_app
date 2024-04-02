import { formatPriceToPen } from "@/helpers"
import { Product } from "@prisma/client"
import Image from "next/image"

type Props =  {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const { name, price, image } = product
  return (
    <div className="border bg-white">
      <Image src={`/products/${image}.jpg`} alt={`Product ${name}`} width={400} height={500} quality={100} />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{ name }</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          { formatPriceToPen(price) }
        </p>
        <button 
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 font-bold cursor-pointer"
        >Agregar</button>
      </div>
    </div>
  )
}

export default ProductCard