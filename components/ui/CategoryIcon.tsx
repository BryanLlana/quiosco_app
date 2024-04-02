import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

type Props = {
  category: Category
}

const CategoryIcon = ({ category }: Props) => {
  const { name, slug } = category
  return (
    <div className={`flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b hover:bg-yellow-500`}>
      <div className="w-16 h-16 relative">
        <Image src={`/icon_${slug}.svg`} alt={`Categoría ${name}`} fill />
      </div>
      <Link
        href={`/order/${slug}`}
        className="text-xl font-bold"
      >{ name }
      </Link>
    </div>
  )
}

export default CategoryIcon