import { useState } from "react";
import { mockSweets } from "../data/mockSweets";

export default function Admin() {
  const [sweets, setSweets] = useState(mockSweets);

  const deleteSweet = (id: number) => {
    setSweets(sweets.filter(s => s.id !== id));
  };

  return (
    <div className="bg-gray-900 min-h-screen pt-24 px-6">
      <h1 className="text-white text-3xl font-bold mb-6">Admin Panel</h1>

      <div className="space-y-4">
        {sweets.map(s => (
          <div
            key={s.id}
            className="flex justify-between items-center bg-gray-800 p-4 rounded"
          >
            <span className="text-white">{s.name}</span>

            <button
              onClick={() => deleteSweet(s.id)}
              className="bg-red-500 px-4 py-1 rounded text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
