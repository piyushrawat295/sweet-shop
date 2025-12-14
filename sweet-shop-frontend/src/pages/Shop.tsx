import { useState } from "react";
import SweetCard from "../components/SweetCard";
import type { Sweet } from "../types/Sweet";
import { purchaseSweet } from "../services/inventory";
// import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
interface ShopProps {
  sweets: Sweet[];
  setSweets: React.Dispatch<React.SetStateAction<Sweet[]>>;
}

export default function Shop({ sweets, setSweets }: ShopProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  // const { user } = useAuth();

  // CATEGORY LIST
  const categories = [
    "All",
    ...Array.from(new Set(sweets.map((s) => s.category))),
  ];

  // FILTER LOGIC
  const filtered = sweets.filter(
    (s) =>
      (category === "All" || s.category === category) &&
      s.name.toLowerCase().includes(query.toLowerCase())
  );

  // ✅ REAL PURCHASE HANDLER
  // const onPurchase = async (sweet: Sweet) => {
  //   if (!user) {
  //     alert("Please login to purchase");
  //     return;
  //   }

  //   try {
  //     // 🔥 API CALL (JWT automatically added via axios interceptor)
  //     const res = await purchaseSweet(sweet.id);

  //     const updatedSweet: Sweet = res.data;

  //     // 🔁 UPDATE UI FROM BACKEND RESPONSE
  //     setSweets(prev =>
  //       prev.map(s =>
  //         s.id === updatedSweet.id ? updatedSweet : s
  //       )
  //     );
  //   } catch (err: any) {
  //     console.error("PURCHASE ERROR 👉", err);
  //     console.error("RESPONSE 👉", err?.response);
  //     alert(err?.response?.data?.message || "Purchase failed");
  //   }
  // };
 const onPurchase = async (sweet: Sweet) => {
  try {
    const res = await purchaseSweet(sweet.id);

    // ✅ UI update
    setSweets(prev =>
      prev.map(s =>
        s.id === res.data.id ? res.data : s
      )
    );

    // ✅ SUCCESS ALERT (HERE ONLY)
    toast.success(`🍬 ${sweet.name} purchased successfully`);

  } catch (err: any) {
    if (err?.response?.status >= 400) {
      toast.error("❌ Purchase failed");
    }
  }
};


  return (
    <div className="bg-gray-900 min-h-screen pt-24 px-6">
      <h1 className="text-white text-4xl font-bold mb-6 text-center">
        Our Sweet Collection
      </h1>

      {/* 🔍 SEARCH + FILTER */}
      <div className="flex gap-4 mb-6 max-w-5xl mx-auto">
        <input
          className="flex-1 p-3 bg-gray-800 rounded text-white"
          placeholder="Search sweets..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-800 text-white px-4 py-3 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 🧁 SWEETS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filtered.map((s) => (
          <SweetCard key={s.id} sweet={s} onPurchase={onPurchase} />
        ))}
      </div>
    </div>
  );
}
