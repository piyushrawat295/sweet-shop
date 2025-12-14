import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";
import type { Sweet } from "../types/Sweet";
import { useAuth } from "../context/AuthContext";
import ReadyToSatisfy from "../components/ReadyToSatisfy";
interface HomeProps {
  sweets: Sweet[];
}

export default function Home({ sweets }: HomeProps) {
  const { user } = useAuth();

  // 🔥 Only preview (no purchase)
  const featured = sweets.slice(0, 4);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Hero />
      <FeatureCards />

      {/* FEATURED PREVIEW */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-3xl font-bold">
            Featured Treats
          </h2>

          {/* CTA */}
          <Link
            to={user ? "/shop" : "/login"}
            className="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600"
          >
            Explore Shop →
          </Link>
        </div>

        {/* PREVIEW CARDS (NO BUTTONS) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {featured.map((s) => (
            <div
              key={s.id}
              className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
            >
              <div className="aspect-square flex items-center justify-center text-6xl font-bold text-white bg-gray-700">
                {s.image}
              </div>

              <div className="p-4">
                <h3 className="text-white font-semibold">{s.name}</h3>
                <p className="text-gray-400 text-sm">{s.description}</p>
                <p className="text-white font-bold mt-2">${s.price}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
      
      
      <ReadyToSatisfy />
    </div>
  );
}
