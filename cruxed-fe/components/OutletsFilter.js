"use client";
import React, { useState } from "react";

export default function OutletsFilter() {
  const outlets = ["MEC", "REI", "Climb Smart Shop", "Bloc Shop", "SAIL"];
  
  const [selectedOutlets, setSelectedOutlets] = useState([]);
  const [searchOutlet, setSearchOutlet] = useState("");

  return (
    <div className="p-4 flex flex-col space-y-4">
      <h3>Outlets:</h3>
      <input type="text" value={searchOutlet} onChange={(e) => setSearchOutlet(e.target.value)} className="bg-neutral-200 rounded-lg text-xl p-2" />
      <div className="max-h-50 p-2 overflow-auto">
      {outlets
        .filter(outlet =>
        outlet
            .toLowerCase()
            .includes(searchOutlet.trim().toLowerCase())
        )
        .map((outlet, index) => (
        <div
            key={index}
            className="bg-neutral-300 px-3 py-1 text-lg rounded-full mr-2 mb-2"
        >
            {outlet}
        </div>
        ))
    }
      </div>
    </div>
  );
}
