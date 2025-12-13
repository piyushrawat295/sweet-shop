import { useState } from "react";
import SweetCard from "../components/SweetCard";
import { mockSweets } from "../data/mockSweets";
import type { Sweet } from "../types/Sweet";

export default function Shop() {
  const [sweets] = useState<Sweet[]>(mockSweets);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories: string[] = [
    "All",
    ...Array.from(new Set(sweets.map(s => s.category))),
  ];

  const filtered = sweets.filter(
    s =>
      (category === "All" || s.category === category) &&
      s.name.toLowerCase().includes(query.toLowerCase())
  );

  const onPurchase = (sweet: Sweet) => {
    alert(`Purchased ${sweet.name}`);
  };

  return (
    <div className="bg-gray-900 min-h-screen pt-24 px-6">
      <h1 className="text-white text-4xl font-bold mb-6 text-center">
        Our Sweet Collection
      </h1>

      <div className="flex gap-4 mb-6">
        <input
          className="flex-1 p-3 bg-gray-800 rounded text-white"
          placeholder="Search sweets..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="bg-gray-800 text-white px-4 py-3 rounded"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {filtered.map(s => (
          <SweetCard key={s.id} sweet={s} onPurchase={onPurchase} />
        ))}
      </div>
    </div>
  );
}
