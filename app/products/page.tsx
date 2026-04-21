import Link from 'next/link';
import React from 'react'
import products from './_lib/data';

const page = () => {

  return (
    <div>
        <Link href="/products/add" className='text-blue-500 hover:underline mb-4 inline-block'>Add Product</Link>

        <p className='text-2xl font-bold mb-4'>Products</p>
        <ul className='space-y-2'>
            {products.map(product => (
                <li key={product.id} className='p-4 bg-white rounded-lg shadow-md'>
                    <Link href={`/products/${product.id}`} className='text-blue-500 hover:underline'>
                        {product.name} - {product.price}
                    </Link>
                </li>
            ))}
            </ul>
      
    </div>
  )
}

export default page
