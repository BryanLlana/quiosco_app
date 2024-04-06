import ProductTable from "@/components/products/ProductTable"
import { prisma } from "@/src/lib/prisma"

const getProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      category: true
    }
  })
  return products
}

const ProductsPage = async () => {
  const products = await getProducts()

  return (
    <>
      <h1 className="text-2xl my-10">Administrar productos</h1>

      <ProductTable  products={products}/>
    </>
  )
}

export default ProductsPage