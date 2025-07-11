"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function OutletsFilter() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const outlets = ["MEC", "REI", "Climb Smart Shop", "Bloc Shop", "SAIL"];
  
  const inistialOutlets = searchParams.get("outlets") ? searchParams.get("outlets").split(",") : [];

  const [selectedOutlets, setSelectedOutlets] = useState([]);
  const [searchOutlet, setSearchOutlet] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if( selectedOutlets.length > 0) {
      params.set("outlets", selectedOutlets.join(","));
    } else {
      params.delete("outlets");
    }
    router.push(`?${params.toString()}`, {shallow: true});
  }, [selectedOutlets])
  
  const toggleOutlet = (outlet) => {
    setSelectedOutlets((prev) => {
      if (prev.includes(outlet)) {
        return prev.filter((o) => o !== outlet);
      } else {
        return [...prev, outlet];
      }
    });
  };

  return (
    <div className="p-4 flex flex-col space-y-4">
      <input placeholder="Search outlets" type="text" value={searchOutlet} onChange={(e) => setSearchOutlet(e.target.value)} className="bg-neutral-200 rounded-lg text-xl p-2" />
      <div className="max-h-50 p-2 overflow-auto flex flex-col">
      {outlets
        .filter(outlet =>
        outlet
            .toLowerCase()
            .includes(searchOutlet.trim().toLowerCase())
        )
        .map((outlet, index) => (
        <button
            key={index}
            onClick={() => toggleOutlet(outlet)}
            className={`bg-neutral-200 px-3 py-1 text-lg rounded-xl mr-2 mb-2 text-left
            ${selectedOutlets.includes(outlet) ? "bg-violet-300" : "hover:bg-neutral-300"}
              `}
        >
            {outlet}
        </button>
        ))
    }
      </div>
    </div>
  );
}
