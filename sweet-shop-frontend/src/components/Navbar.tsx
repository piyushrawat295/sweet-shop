import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-slate-900/90 backdrop-blur z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link to="/" className="text-white font-bold text-xl">
          🍭 Sweet Shop
        </Link>

        <div className="flex gap-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-pink-400" : "text-gray-300 hover:text-white"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-gray-800 px-4 py-2 rounded-lg"
                : "text-gray-300 hover:text-white px-4 py-2"
            }
          >
            Shop
          </NavLink>

          <Link to="/login" className="text-gray-300 hover:text-white">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
