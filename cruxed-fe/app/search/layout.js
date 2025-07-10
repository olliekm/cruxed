import React from 'react'

function SearchLayout({children}) {
  return (
    <div className='h-screen w-full flex bg-neutral-100 justify-center text-black overflow-hidden'>
        <div className="w-3xl h-screen flex-col">
            {/* // Header */}
            <div className="w-full flex justify-between p-4 space-x-4">
                <h1 className="text-5xl font-semibold text-neutral-900">cruxed.</h1>      
                <input type="text" placeholder='Search shoes...' className='bg-neutral-200 px-4 focus:outline-none rounded-xl flex-1' />
            </div>
            {/* // Main content area */}
            <div className="flex h-full relative">
                {/* // Sidebar */}
                <div className="w-64 h-full bg-neutral-400"></div>
                {/* // Content area */}
                <div className="flex-1 ">
                {children}
                </div>
            </div>
        </div>

    </div>
  )
}

export default SearchLayout