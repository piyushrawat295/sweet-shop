import { ShoppingCart } from "lucide-react";
import type { Sweet } from "../types/Sweet";

const colors: any = {
  chocolate: "bg-blue-400",
  gummy: "bg-orange-400",
  candy: "bg-cyan-400",
  cake: "bg-green-400",
};

export default function SweetCard({ sweet, onPurchase }: any) {
  const out = sweet.stock === 0;

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700">
      <div className={`${colors[sweet.category]} aspect-square flex items-center justify-center text-6xl font-bold text-white`}>
        {sweet.image}
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold">{sweet.name}</h3>
        <p className="text-gray-400 text-sm mb-3">{sweet.description}</p>

        <div className="flex justify-between mb-3">
          <span className="text-white font-bold">${sweet.price}</span>
          <span className={out ? "text-red-400" : "text-green-400"}>
            {out ? "Out of Stock" : `In Stock (${sweet.stock})`}
          </span>
        </div>

        <button
          disabled={out}
          onClick={() => onPurchase(sweet)}
          className={`w-full py-2 rounded-lg flex justify-center gap-2 ${
            out ? "bg-gray-700" : "bg-pink-500 hover:bg-pink-600"
          }`}
        >
          <ShoppingCart size={16} />
          Purchase
        </button>
      </div>
    </div>
  );
}
