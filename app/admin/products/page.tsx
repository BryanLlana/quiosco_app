import ProductPagination from "@/components/products/ProductPagination"
import ProductSearch from "@/components/products/ProductSearch"
import ProductTable from "@/components/products/ProductTable"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { redirect } from "next/navigation"


const productCount = async () => {
  return await prisma.product.count()
}

const getProducts = async (pageSize: number, skip: number) => {
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true
    }
  })
  return products
}

const ProductsPage = async ({ searchParams }: { searchParams: { page: string }}) => {
  const page = +searchParams.page || 1

  if (page < 0) redirect('/admin/products')

  const pageSize = 10
  const skip = (page - 1) * pageSize
  const products = await getProducts(pageSize, skip)
  const totalProducts = await productCount()
  const totalPages = Math.ceil(totalProducts / pageSize)

  if (page > totalPages) {
    redirect('/admin/products')
  }

  return (
    <>
      <h1 className="text-2xl my-10">Administrar productos</h1>

      <div className="flex flex-col lg:flex-row gap-5 justify-between">
        <Link
          href="/admin/products/new"
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >Crear producto</Link>
        <ProductSearch />
      </div>

      <ProductTable  products={products}/>

      <ProductPagination page={page} totalPages={totalPages} />
    </>
  )
}

export default ProductsPage