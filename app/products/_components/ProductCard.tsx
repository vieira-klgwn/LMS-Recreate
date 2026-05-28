import React from 'react'
import Link from 'next/link'

export interface Product {
    id: number;
    name: string;
    price: string;
}


const ProductCard = ({id, name, price}: Product) => {
  return (
                <li key={id} className='p-4 size-80 bg-amber-200 rounded-lg shadow-md'>
                    <Link href={`/products/${id}`} className='text-blue-500 hover:underline'>
                        {name} - {price}
                    </Link>
                </li>
  )
}

export default ProductCard

