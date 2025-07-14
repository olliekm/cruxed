"use client"
import React, {useState, useEffect, useTransition, useRef} from 'react'
import OutletsFilter from '@/components/OutletsFilter'
import BrandFilter from '@/components/BrandFilter'
import { useSearchParams, useRouter} from "next/navigation";
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

function SearchLayout({children}) {






  const handleSubmit = (e) => {
    e.preventDefault()
    const q = searchWord.trim()
    // build querystring
    const qs = q
      ? `?search=${encodeURIComponent(q)}`
      : ''
    // navigate to /search + qs
    router.push(`/search${qs}`)
  }


  return (
    <div className='h-screen w-full flex bg-neutral-100 justify-center text-black overflow-hidden'>
        <div className="w-3xl h-screen flex-col">
            {/* // Header */}
            <div className="w-full flex justify-between p-4 space-x-4">
                <Link href={'/search'}>
                  <h1 className="text-5xl font-semibold text-neutral-900">cruxed.</h1>
                </Link>
               <SearchBar />

                {/* <form onSubmit={handleSubmit} className="flex-1">
                  <input
                    id="search-input"
                    type="text"
                    value={searchWord}
                    onChange={e => setSearchWord(e.target.value)}
                    placeholder="Search shoes…"
                    className="bg-neutral-200 px-4 h-full rounded-xl flex-1 focus:outline-none w-full"
                  />
                </form> */}
            </div>
            {/* // Main content area */}
            <div className="flex h-full relative">
                {/* // Sidebar */}
                <div className="w-64 h-full bg-neutral-400/0 flex flex-col">
                  {/* Outlets */}
                  <OutletsFilter />
                  {/* Brands */}
                  <BrandFilter/>

                  {/* Price */}

                  {/* Outlets */}
                </div>
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