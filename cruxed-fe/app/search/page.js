"use client";
import React from 'react'
import ShoeListing from '@/components/ShoeListing'
import { useSearchParams } from "next/navigation";
import Products from '../../products.json'

const listings = [
  {
    name: "Scarpa Drago LV",
    brand: "Scarpa",
    lowestPrice: "209.95",
    outlets: ["MEC", "REI", "Climb Smart Shop"],
  },
  {
    name: "Scarpa Instinct VSR LV",
    brand: "Scarpa",
    lowestPrice: "220.00",
    outlets: ["MEC", "REI", "Climb Smart Shop"],
  },
  {
    name: "Scarpa Origin VS",
    brand: "Scarpa",
    lowestPrice: "164.99",
    outlets: ["MEC", "REI", "Climb Smart Shop"],
  },
  {
    name: "LaSportiva Solution Comp",
    brand: "LaSportiva",
    lowestPrice: "249.00",
    outlets: ["Bloc Shop", "Climb Smart Shop"],
  },
];

// const listings = Products
function page() {

  const params = useSearchParams();
  const rawOutlets = params.get("outlets") || "";
  const selectedOutlets = rawOutlets
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const rawSearch = params.get("search") || "";


  // --- parse brand filter ---
  const rawBrands = params.get("brands") || "";
  const selectedBrands = rawBrands
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const filtered = listings
    .filter((shoe) =>
      selectedOutlets.length > 0
        ? shoe.outlets.some((o) => selectedOutlets.includes(o))
        : true
    )
    .filter((shoe) =>
      selectedBrands.length > 0
        ? selectedBrands.includes(shoe.brand)
        : true
    ).filter(shoe =>
    shoe.name
        .toLowerCase()
        .includes(rawSearch.trim().toLowerCase())
    )
  return (
    <div className="p-4 space-y-4">
      {filtered.map((shoe) => (
        <ShoeListing
          key={shoe.name + shoe.lowestPrice}
          name={shoe.name}
          lowestPrice={shoe.lowestPrice}
          outlets={shoe.outlets}
        />
      ))}
      {filtered.length === 0 && (
        <p className="text-center text-gray-500">No shoes match these outlets.</p>
      )}
    </div>
  )
}

export default page