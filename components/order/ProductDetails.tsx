import { formatPriceToPen } from "@/src/helpers"
import { MAX_QUANTITY, useStore } from "@/src/store"
import { OrderItem } from "@/src/types"
import { XCircleIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useMemo } from "react"
import { MIN_QUANTITY } from '../../src/store/index';

type Props = {
  item: OrderItem
}

const ProductDetails = ({ item }: Props) => {
  const { id, name, price, quantity, subtotal } = item
  const decrementQuantity = useStore(state => state.decrementQuantity)
  const incrementQuantity = useStore(state => state.incrementQuantity)
  const disabledButtonDecrement = useMemo(() => item.quantity === MIN_QUANTITY, [item])
  const disabledButtonIncrement = useMemo(() => item.quantity === MAX_QUANTITY, [item])
  const deleteToCart = useStore(state => state.deleteToCart)

  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{ name }</p>

          <button
            type="button"
            onClick={() => { deleteToCart(id) }}
          >
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">
          { formatPriceToPen(price) }
        </p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button
            type="button"
            onClick={() => { decrementQuantity(id) }}
            disabled={disabledButtonDecrement}
            className="disabled:opacity-20"
          >
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">
            {quantity}
          </p>

          <button
            type="button"
            onClick={() => { incrementQuantity(id) }}
            disabled={disabledButtonIncrement}
            className="disabled:opacity-20"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {''}
          <span className="font-normal">
            { formatPriceToPen(subtotal) }
          </span>
        </p>
      </div>
    </div>
  )
}

export default ProductDetails