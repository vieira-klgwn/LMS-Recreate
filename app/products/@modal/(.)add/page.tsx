import React from 'react'

const page = () => {
  return (
    <div>
      <p className="text-2xl font-bold mb-4">Add Product</p>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Product</button>
      </form>
    </div>
  )
}

export default page
