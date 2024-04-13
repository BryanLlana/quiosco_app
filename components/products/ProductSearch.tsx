"use client"
import { SearchSchema } from "@/src/schema"
import { redirect } from "next/navigation"
import { toast } from "react-toastify"

const ProductSearch = () => {
  const handleSearchForm = async (formData: FormData) => {
    const data = Object.fromEntries(formData)
    const result = SearchSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach(issue => {
        toast.error(issue.message)
      })
      return
    }
    return redirect(`/admin/products/search?search=${result.data.search}`)
  }

  return (
    <form action={handleSearchForm} className="flex items-center">
      <input
        type="text"
        placeholder="Buscar producto"
        className="p-2 placeholder-gray-400 w-full"
        name="search"
      />
      <input
        type="submit"
        value="Buscar"
        className="bg-indigo-600 p-2 text-white cursor-pointer"
      />
    </form>
  )
}

export default ProductSearch