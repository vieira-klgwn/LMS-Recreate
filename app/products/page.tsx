'use client';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import  useAuth  from '../context/AuthContext'
import products from './_lib/data';

const page = () => {
    const {user, token, logout,loading} = useAuth();
    const router = useRouter();

    useEffect(()=>{
        if(!token && !loading){
            router.push('/login');
        }
    }, [token, router])

  return (
    <div className='flex flex-col items-center justify-center p-4'>
       <div className='p-4 gap-5 flex flex-row justify-center h-16 items-center'>
         <Link href="/products/add" className=' text-xl text-white bg-amber-500 rounded-2xl p-4 font-semibold hover:bg-red-400'>Add Product</Link>
        <button onClick={logout} className='mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'>Logout</button>
        </div>
        <p className='text-2xl font-bold mt-16 text-align  text-amber-500'>Products</p>
        <ul className='space-y-2 flex flex-row gap-4 flex-wrap col-span-2 items-center justify-center'>
            {products.map(product => (
                <li key={product.id} className='p-4 size-80 bg-amber-200 rounded-lg shadow-md'>
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
