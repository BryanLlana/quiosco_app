"use client"
import { ProductSchema } from '@/src/schema'
import React from 'react'
import { toast } from 'react-toastify'

const AddProductForm = ({ children }: { children: React.ReactNode}) => {
  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData)
    const result = ProductSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach(issue => {
        toast.error(issue.message)
      })
      return
    }
  }
  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto'>
      <form action={handleSubmit} className='space-y-5'>
        { children }
        <input
          type="submit"
          className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 font-bold cursor-pointer'
          value="Registrar producto"
        />
      </form>
    </div>
  )
}

export default AddProductForm