import { Candy } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-2 rounded-lg">
              <Candy className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">
              Sweet Shop
            </span>
          </div>

          {/* Center */}
          <p className="text-gray-400 text-sm text-center">
            Made with ❤️ for sweet lovers everywhere
          </p>

          {/* Right */}
          <div className="flex gap-6 text-sm text-gray-400">
            <span className="hover:text-white cursor-pointer transition">
              Privacy
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Terms
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Contact
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
