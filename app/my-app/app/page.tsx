"use client"; // Dette gjør at komponenten kjøres som en "Client Component"

import { useState } from "react";

export default function Home() {
  // 1. State for wishlist
  const [wishlist, setWishlist] = useState([
    { navn: "The Legend of Zelda", pris: 699 },
    { navn: "Minecraft", pris: 249 },
    { navn: "Cyberpunk 2077", pris: 399 },
  ]);

  // 2. State for input-felt
  const [nyttSpill, setNyttSpill] = useState("");
  const [pris, setPris] = useState<number | "">("");

  // 3. Funksjon for å legge til spill
  const leggTilSpill = () => {
    if (nyttSpill && pris !== "") {
      setWishlist([...wishlist, { navn: nyttSpill, pris: Number(pris) }]);
      setNyttSpill("");
      setPris("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center bg-white dark:bg-black p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Min Spill-Wishlist</h1>

        {/* Input-feltene */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Spillnavn"
            value={nyttSpill}
            onChange={(e) => setNyttSpill(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <input
            type="number"
            placeholder="Pris"
            value={pris}
            onChange={(e) => setPris(e.target.value === "" ? "" : Number(e.target.value))}
            className="border px-2 py-1 rounded w-24"
          />
          <button
            onClick={leggTilSpill}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Legg til
          </button>
        </div>

        {/* Vis wishlist */}
        <div className="flex flex-col gap-2">
          {wishlist.map((spill, index) => (
            <p key={index} className="border-b pb-1">
              {spill.navn} — {spill.pris} kr
            </p>
          ))}
        </div>
      </main>
    </div>
  );
}
