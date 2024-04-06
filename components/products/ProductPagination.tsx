import Link from "next/link"

type Props = {
  page: number,
  totalPages: number
}

const ProductPagination = ({ page, totalPages }: Props) => {
  const pages = Array.from({ length: totalPages}, (_, i) => i + 1)
  return (
    <nav className="flex justify-center py-10">
      {page > 1 && (
        <Link
          href={`/admin/products?page=${page - 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >&laquo;
        </Link>
      )}
      {pages.map(p => (
        <Link
          href={`/admin/products?page=${p}`}
          className={`${page === p ? 'font-black bg-amber-400' : 'bg-white'} px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
        >{p}
        </Link>
      ))}
      {page < totalPages && (
        <Link
          href={`/admin/products?page=${page + 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >&raquo;
        </Link>
      )}
    </nav>
  )
}

export default ProductPagination