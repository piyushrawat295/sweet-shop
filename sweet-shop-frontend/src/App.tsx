import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import type { Sweet } from "./types/Sweet";
import { useAuth } from "./context/AuthContext";
import { getSweets } from "./services/sweet"; // ✅ API CALL

export default function App() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const { user } = useAuth();

  // ✅ FETCH SWEETS FROM DATABASE
  useEffect(() => {
    getSweets()
      .then((res) => setSweets(res.data))
      .catch((err) => console.error("Failed to load sweets", err));
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      {/* padding because navbar is fixed */}
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home sweets={sweets} />} />
          <Route
            path="/shop"
            element={
              user ? (
                <Shop sweets={sweets} setSweets={setSweets} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ✅ ADMIN PROTECTED ROUTE */}
          <Route
            path="/admin"
            element={
              user?.role === "ADMIN" ? (
                <Admin sweets={sweets} setSweets={setSweets} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}
