import React from 'react'

const page = () => {
  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow-md">
  <h2 className="text-xl font-bold">Title</h2>
  <p className="text-gray-600">Description here</p>
</div>

<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
  <div className="bg-white p-6 rounded-lg">
    <h2 className="text-lg font-bold">Modal</h2>
  </div>
</div>
    </div>
  )
}

export default page
