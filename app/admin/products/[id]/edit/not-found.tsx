import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='text-center'>
      <h1 className="text-2xl my-10">Producto no encontrado</h1>
      <Link
        href='/admin/products'
        className='bg-amber-400 text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto'
      >Ir a productos</Link>
    </div>
  )
}

export default NotFound