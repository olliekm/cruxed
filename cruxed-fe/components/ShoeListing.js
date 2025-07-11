import React from 'react'
import Link from 'next/link'

function ShoeListing({name, lowestPrice, outlets}) {
  return (
    <div className='p-4 space-y-4 bg-neutral-200 rounded-xl'>
      <div className="flex justify-between items-start">
        <Link href={'/product/'+name}>
          <h2 className='text-xl hover:underline'>{name}</h2>
        </Link>
        <p>Lowest Price: ${lowestPrice}</p>
      </div>
      <div className="flex space-x-4">
        <h3>Available Outlets:</h3>
        <div className="">
          {
            outlets.map((outlet, index) => (
              <span key={index} className="bg-neutral-300 p-1 px-2 text-sm rounded-md mr-2">
                {outlet}
              </span>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ShoeListing