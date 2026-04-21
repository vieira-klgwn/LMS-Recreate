import React from 'react'

const page = ({ params }) => {
  const { slug } = params;
  return (
    <div>
      This is example 2 with slug: {slug}
    </div>
  )
}

export default page
