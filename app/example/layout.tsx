import React from 'react'

const layout = ({children}) => {
  return (
    <div>
      <nav className='bg-gray-200 p-4'>
        <ul className='flex space-x-4'>
          <li><a href="/example/ex1" className='text-blue-500 hover:underline'>Example 1</a></li>
          <li><a href="/example/ex2" className='text-blue-500 hover:underline'>Example 2</a></li>
          <li><a href="/example/ex3" className='text-blue-500 hover:underline'>Example 3</a></li>
        </ul>
      </nav>
      <main className='p-4'>
        {children}
      </main>
      <div className='bg-gray-200 p-4'>
        <p>© 2023 Example Company. All rights reserved.</p>
      </div>
    </div>
  )
}

export default layout
