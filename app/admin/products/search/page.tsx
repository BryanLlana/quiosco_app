import ProductSearch from "@/components/products/ProductSearch"
import ProductTable from "@/components/products/ProductTable"
import { prisma } from "@/src/lib/prisma"

const searchProducts = async (searchTerm: string) => {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm
      }
    },
    include: {
      category: true
    }
  })

  return products
}

const SearchPage = async ({ searchParams }: { searchParams: { search: string }}) => {
  const products = await searchProducts(searchParams.search)
  return (
    <>
      <h1 className="text-2xl my-10">Resultados de búsqueda: {searchParams.search}</h1>
      <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
        <ProductSearch />
      </div>
      { products.length ? (
        <ProductTable products={products} />
      ): (
        <p className="text-center text-lg">No hay resultados</p>
      )}
    </>
  )
}

export default SearchPage