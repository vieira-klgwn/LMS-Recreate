'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import  useAuth  from '../context/AuthContext'
import ProductCard from './_components/ProductCard';
// import products from './_lib/data';

import { Product } from './_components/ProductCard';



function ProductsPage() {
    const {user, token, logout,loading} = useAuth();
    const router = useRouter();
    
    const [products, setProducts] = useState<Product[]>([]);
    const [fetchLoading, setFetchLoading] = useState(true);

    useEffect(()=>{
        if(!token && !loading){
            router.push('/login');
        }
    }, [token, loading, router])


    useEffect(() => {
        async function fetchProducts() {
        
        try {

            const productsResponse = await fetch('http://127.0.0.1:3000/product', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!productsResponse.ok) {
                throw new Error('Failed to fetch products');
            }
            const productsData = await productsResponse.json();
            
            console.log('Products:', productsData);
            
            setProducts(productsData);
            setFetchLoading(false);

        } catch (error) {
            console.error('Error fetching products:', error);
            setFetchLoading(false);
        }
    }
    fetchProducts();

    }, [token])

  return (
    <div className='flex flex-col items-center justify-center p-4'>
       <div className='p-4 gap-5 flex flex-row justify-center h-16 items-center'>
         <Link href="/products/add" className=' text-xl text-white bg-amber-500 rounded-2xl p-4 font-semibold hover:bg-red-400'>Add Product</Link>
        <button onClick={logout} className='mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'>Logout</button>
        </div>
        <p className='text-2xl font-bold mt-16 text-align  text-amber-500'>Products</p>

        {fetchLoading && <p className='text-lg text-gray-500'>Loading products...</p>}
        {!fetchLoading && products.length === 0 && <p className='text-lg text-gray-500'>No products available.</p>}

        <ul className='space-y-2 flex flex-row gap-4 flex-wrap col-span-2 items-center justify-center'>
            {products.map(product => (
                <ProductCard key={product.id} {...product} />

            ))}
        </ul>

        
      
    </div>
  )
}

export default ProductsPage
