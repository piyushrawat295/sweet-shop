import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";
import SweetCard from "../components/SweetCard";

export default function Home({ sweets, onPurchase }: any) {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Hero />
      <FeatureCards />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-white text-3xl font-bold mb-6">Featured Treats</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {sweets.slice(0, 4).map((s: any) => (
            <SweetCard key={s.id} sweet={s} onPurchase={onPurchase} />
          ))}
        </div>
      </div>
    </div>
  );
}
