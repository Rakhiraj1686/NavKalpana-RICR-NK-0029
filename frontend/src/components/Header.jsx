import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FiHome, FiInfo, FiPhone, FiLogIn, FiUserPlus } from "react-icons/fi";
import logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50 ">
        <div className="h-18 flex items-center justify-between px-5 md:px-10 lg:px-16 bg-[#020617]/75 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src={logo}
              alt="HealthUP"
              className="w-11 h-11 object-contain transition duration-300 group-hover:scale-110"
            />
            <div className="leading-none">
              <h1 className="text-2xl font-black tracking-tight bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                HealthUP
              </h1>
              <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">
                Adaptive FitAI
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {[
              { title: "Home", to: "/" },
              { title: "About", to: "/about" },
              { title: "Contact", to: "/contact" },
            ].map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="px-6 py-1 rounded-full text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="cursor-pointer flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-purple-500/40 text-white hover:bg-white/5 transition-all duration-300"
              >
                <FiLogIn className="text-lg text-purple-400" />
                <span>Login</span>
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="cursor-pointer flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
              >
                <FiUserPlus className="text-lg" />
                <span>Create Account</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <button onClick={() => setMenuOpen(true)} className="md:hidden">
            <HiOutlineMenu className="text-4xl text-white/80" />
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY */}

      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 md:hidden ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
      `}
      />

      {/* MOBILE DRAWER */}

      <aside
        className={`fixed right-0 top-0 h-screen w-[82vw] max-w-[320px] dashboard-scroll overflow-y-auto bg-linear-to-b from-[#020617] via-[#0f172a] to-[#020617] backdrop-blur-3xl border-white/10 shadow-2xl z-50 transition-transform duration-300 md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 h-18 border-b border-white/10">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <div className="leading-none">
              <h1 className="text-2xl font-black tracking-tight bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                HealthUP
              </h1>
              <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">
                Adaptive FitAI
              </p>
            </div>
          </Link>

          <button onClick={() => setMenuOpen(false)} className="">
            <HiOutlineX className="text-red-500 text-4xl" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="dashboard-scroll flex-1 overflow-y-auto px-4 py-5">
          <div className="space-y-2">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-4 rounded-xl px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300 group"
            >
              <FiHome className="text-lg text-purple-400 group-hover:scale-110 transition-transform" />
              <span>Home</span>
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-4 rounded-xl px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300 group"
            >
              <FiInfo className="text-lg text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>About</span>
            </Link>

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-4 rounded-xl px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300 group"
            >
              <FiPhone className="text-lg text-pink-400 group-hover:scale-110 transition-transform" />
              <span>Contact</span>
            </Link>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="space-y-3">
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-purple-500/40 text-white hover:bg-white/5 transition-all duration-300"
              >
                <FiLogIn className="text-lg text-purple-400" />
                <span>Login</span>
              </button>

              <button
                onClick={() => {
                  navigate("/signup");
                  setMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-linear-to-r from-purple-500 to-blue-500 text-white transition-all duration-300"
              >
                <FiUserPlus className="text-lg" />
                <span>Create Account</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-5">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} HealthUP
          </p>
        </div>
      </aside>
    </>
  );
};

export default Header;
