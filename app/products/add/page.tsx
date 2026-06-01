'use client'

import React from 'react'

const AddProductPage = () => {

  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [error, setError] = React.useState('');

  
  const createProduct = async (product: { name: string; price: string }) => {
    try {
      const response = await fetch('http://127.0.0.1:3000/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,

        },
        body: JSON.stringify(product),
      });
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Failed to create product');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !price) {
      setError('Please fill in all fields');
      return;
    }
    await createProduct({ name, price });
    
    console.log('Product added:', { name, price });
    // Reset form fields
    setName('');
    setPrice('');
    setError('');
  }


  return (
    <div>
      <p className="text-2xl font-bold mb-4">Add Product</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Product</button>
      </form>
    </div>
  )
}

export default AddProductPage