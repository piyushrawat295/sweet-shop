import { Candy, Package, Shield, Star } from "lucide-react";

const features = [
  {
    icon: Candy,
    title: "Handcrafted Quality",
    description: "Every treat is made with love using premium ingredients",
  },
  {
    icon: Package,
    title: "Fast Delivery",
    description: "Quick and reliable delivery right to your doorstep",
  },
  {
    icon: Shield,
    title: "Secure Shopping",
    description: "Your transactions are protected and encrypted",
  },
  {
    icon: Star,
    title: "Customer Favorites",
    description: "Discover top-rated sweets loved by thousands",
  },
];

export default function FeatureCards() {
  return (
    <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-gray-800/80 backdrop-blur p-6 rounded-xl border border-gray-700 hover:border-pink-500/50 transition"
          >
            <div className="bg-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <f.icon className="text-white w-6 h-6" />
            </div>

            <h3 className="text-white font-semibold text-lg mb-2">
              {f.title}
            </h3>
            <p className="text-gray-400 text-sm">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
