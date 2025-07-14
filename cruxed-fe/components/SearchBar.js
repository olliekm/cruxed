import React, {useEffect, useState, useRef} from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

function SearchBar() {

    const router = useRouter();
    const searchParams = useSearchParams(); 
  
    const parseSearch = () =>
      searchParams
        .get("search")
  
    const [searchWord, setSearchWord] = useState(parseSearch() || "");
    const inputRef = useRef(null);

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
    <input
    id="search-input"
    type="text"
    value={searchWord}
    onChange={e => setSearchWord(e.target.value)}
    placeholder="Search shoes…"
    className="bg-neutral-200 px-4 h-full rounded-xl flex-1 focus:outline-none w-full"
  />
  )
}

export default SearchBar