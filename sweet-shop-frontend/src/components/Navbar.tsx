import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/");
  };

  return (
    <nav className="fixed top-0 w-full bg-slate-900/90 backdrop-blur z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="text-white font-bold text-xl">
          🍭 Sweet Shop
        </Link>

        {/* LINKS */}
        <div className="flex gap-6 items-center">
          
          {/* HOME (always visible) */}
          <NavLink
            to="/"
            className={({ isActive }) =>
                isActive
                  ? "text-white bg-gray-800 px-4 py-2 rounded-lg"
                  : "text-gray-300 hover:text-white px-4 py-2"
              }
          >
            Home
          </NavLink>

          {/* SHOP (only if logged in) */}
          {user && (
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
          )}

          {/* ADMIN (only ADMIN role) */}
          {user?.role === "ADMIN" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-gray-800 px-4 py-2 rounded-lg"
                  : "text-gray-300 hover:text-white px-4 py-2"
              }
            >
              Admin
            </NavLink>
          )}

          {/* AUTH BUTTONS */}
          {!user ? (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
              >
                Sign up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
