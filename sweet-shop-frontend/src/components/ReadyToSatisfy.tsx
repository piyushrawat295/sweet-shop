import { Link } from "react-router-dom";

export default function ReadyToSatisfy() {
  return (
    <section className="bg-black py-15">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
          Ready to satisfy your sweet tooth?
        </h2>

        <p className="text-gray-400 mb-8">
          Join thousands of happy customers who trust Sweet Shop for their
          confectionery needs.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/shop"
            className="bg-pink-500 px-6 py-3 rounded-lg text-white font-semibold hover:bg-pink-600 transition"
          >
            Browse Collection
          </Link>

          <Link
            to="/register"
            className="border border-gray-600 px-6 py-3 rounded-lg text-white hover:bg-gray-800 transition"
          >
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
}
