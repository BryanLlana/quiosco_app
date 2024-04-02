"use client"
import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

type Props = {
  category: Category
}

const CategoryIcon = ({ category }: Props) => {
  const { name, slug } = category
  const params = useParams()

  return (
    <div className={`${slug === params.category ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b hover:bg-amber-400`}>
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