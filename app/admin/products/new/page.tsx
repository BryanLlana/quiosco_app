import AddProductForm from "@/components/products/AddProductForm"
import ProductForm from "@/components/products/ProductForm"

const CreateProductPage = () => {
  return (
    <>
      <h1 className="text-2xl my-10">Nuevo producto</h1>
      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  )
}

export default CreateProductPage