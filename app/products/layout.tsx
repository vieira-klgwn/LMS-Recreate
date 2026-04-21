import React from 'react'

const layout = ({children, modal}) => {
  return (
    <div>
        <nav>
            <a href="/products">Reload</a>
        </nav>
      {children}
      {modal}
      <div className='bg-gray-200 p-4 text-gray-700 text-center'>
        <p>© 2026 klgwn co. All rights reserved.</p>
      </div>
    </div>
  )
}

export default layout
