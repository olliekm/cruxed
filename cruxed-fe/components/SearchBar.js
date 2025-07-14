import React, {useEffect, useState, useRef, useTransition} from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

function SearchBar() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const searchParams = useSearchParams(); 

    const parseSearch = () =>
      searchParams
        .get("search")
  
    const [searchWord, setSearchWord] = useState(parseSearch() || "");
    const inputRef = useRef(null);

    // useEffect(() => {
    //     router.refresh()
    //     const params = new URLSearchParams(searchParams.toString());
    //     if( searchWord.length > 0) {
    //       params.set("search", searchWord.trim());
    //     } else {
    //       params.delete("search");
    //     }
    //     // router.push(, {shallow: true});
    //         // Update the URL without reloading the page
    //         startTransition(() => {
    //             window.history.pushState(
    //             null,
    //             '',
    //             window.location.pathname + `?${params.toString()}`
    //             )
    //         })            // Replace the current state to avoid adding a new entry in history
    //     // window.history.replaceState(
    //     //     null,
    //     //     '',
    //     //     window.location.pathname + `?${params.toString()}`
    //     //   )

    //       requestAnimationFrame(() =>
    //         inputRef.current?.focus({ preventScroll: true })
    //       )
    // }, [searchWord])

  return (
    <form onSubmit={e => {
        e.preventDefault();
        const q = searchWord.trim();
        // build querystring
        const qs = q ? `?search=${encodeURIComponent(q)}` : '';
        // navigate to /search + qs
        router.push(`/search${qs}`);
        }
        } className="flex-1 relative">

    <input
    ref={inputRef}
    autoFocus
    id="search-input"
    type="text"
    value={searchWord}
    onChange={e => setSearchWord(e.target.value)}
    placeholder="Search shoes…"
    className="bg-neutral-200 px-4 h-full rounded-xl flex-1 focus:outline-none w-full"
  />
  </form>
  )
}

export default SearchBar