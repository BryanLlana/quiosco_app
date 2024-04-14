import { prisma } from '@/src/lib/prisma'
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

const EditProductPage = async ({ params }: { params: { id: string }}) => {
  const product = await getProductById(+params.id)
  return (
    <div>EditProductPage</div>
  )
}

export default EditProductPage