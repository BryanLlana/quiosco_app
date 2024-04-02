import { prisma } from "@/src/lib/prisma"
import CategoryIcon from "../ui/CategoryIcon"

const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany()
    return categories
  } catch (error) {
    console.log(error)
  }
}

const OrderSidebar = async () => {
  const categories = await getCategories()
  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <nav className="mt-10">
        { categories?.map(category => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </nav>
    </aside>
  )
}

export default OrderSidebar