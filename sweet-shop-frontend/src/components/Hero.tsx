import { Candy, ShoppingCart } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative h-[500px] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-yellow-400 flex items-center gap-2 mb-4">
          <Candy size={18} />
          <span className="uppercase text-sm font-semibold">Handcrafted with Love</span>
        </div>

        <h1 className="text-6xl font-bold text-white mb-4">
          Discover the <br />
          Sweetest <br />
          <span className="bg-gradient-to-r from-pink-400 to-yellow-300 bg-clip-text text-transparent">
            Treats in Town
          </span>
        </h1>

        <p className="text-gray-300 mb-8">
          From classic candies to artisan chocolates, explore premium sweets.
        </p>

        <div className="flex gap-4">
          <button className="bg-pink-500 px-8 py-3 rounded-lg text-white flex gap-2">
            Shop Now <ShoppingCart size={18} />
          </button>
          <button className="border border-white/20 px-8 py-3 rounded-lg text-white">
            Join Sweet Lovers
          </button>
        </div>
      </div>
    </div>
  );
}
