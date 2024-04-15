import EditProductForm from '@/components/products/EditProductForm'
import ProductForm from '@/components/products/ProductForm'
import GoBackButton from '@/components/ui/GoBackButton'
import { prisma } from '@/src/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

const getProductById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: {
      id
    }
  })

  if (!product) notFound()

  return product
}

const EditProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await getProductById(+params.id)
  return (
    <>
      <h1 className="text-2xl my-10">Editar producto: {product.name}</h1>

      <GoBackButton />

      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  )
}

export default EditProductPage