"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function BrandFilter() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const parseBrands = () =>
    searchParams
      .get("brands")
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];

  const brands = ["Scarpa", "La Sportiva", "Madrock", "FiveTen", "Black Diamond", "Evolv", "Tenaya", "Butora", "Ocun", "Red Chili"];
  
  const [selectedBrands, setSelectedBrands] = useState(parseBrands());
  const [searchBrands, setSearchBrands] = useState("");

  useEffect(() => {
    setSelectedBrands(parseBrands());
    console.log(selectedBrands)
  }, [searchParams.toString()]);



  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if( selectedBrands.length > 0) {
      params.set("brands", selectedBrands.join(","));
    } else {
      params.delete("brands");
    }
    router.push(`?${params.toString()}`, {shallow: true});
  }, [selectedBrands])
  
  const toggleBrands = (brand) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brand)) {
        return prev.filter((o) => o !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };

  return (
    <div className="p-4 flex flex-col space-y-4">
      <input placeholder="Search brands" type="text" value={searchBrands} onChange={(e) => setSearchBrands(e.target.value)} className="bg-neutral-200 rounded-lg text-xl p-2" />
      <div className="max-h-50 p-2 overflow-auto flex flex-col">
      {brands
        .filter(brand =>
        brand
            .toLowerCase()
            .includes(searchBrands.trim().toLowerCase())
        )
        .map((brand, index) => (
        <button
            key={index}
            onClick={() => toggleBrands(brand)}
            className={`bg-neutral-200 px-3 py-1 text-lg rounded-xl mr-2 mb-2 text-left
            ${selectedBrands.includes(brand) ? "bg-violet-300" : "hover:bg-neutral-300"}
              `}
        >
            {brand}
        </button>
        ))
    }
      </div>
    </div>
  );
}
