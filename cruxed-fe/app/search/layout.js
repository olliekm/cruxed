"use client"
import React, {useState, useEffect} from 'react'
import OutletsFilter from '@/components/OutletsFilter'
import BrandFilter from '@/components/BrandFilter'
import { useSearchParams, useRouter} from "next/navigation";
import Link from 'next/link';

function SearchLayout({children}) {
  const [searchWord, setSearchWord] = useState("")
  const router = useRouter();
  const searchParams = useSearchParams(); 
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if( searchWord.length > 0) {
      params.set("search", searchWord.trim());
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`, {shallow: true});
  }, [searchWord])

  return (
    <div className='h-screen w-full flex bg-neutral-100 justify-center text-black overflow-hidden'>
        <div className="w-3xl h-screen flex-col">
            {/* // Header */}
            <div className="w-full flex justify-between p-4 space-x-4">
                <Link href={'/search'}>
                  <h1 className="text-5xl font-semibold text-neutral-900">cruxed.</h1>
                </Link>
                <input value={searchWord} onChange={(e) => setSearchWord(e.target.value)} type="text" placeholder='Search shoes...' className='bg-neutral-200 px-4 focus:outline-none rounded-xl flex-1' />
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