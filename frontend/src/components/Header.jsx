import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLogin = false;
  const user = false;

  const handleMobileNavigate = () => {
    navigate("/user-dashboard");
    setMenuOpen(false);
  };

  const handledDesktopNavigate = () => {
    navigate("/user-dashboard");
  };

  const handleLogout = () => {
    navigate("/logout");
    setMenuOpen(false);
  };

  return (
    <>
      {/* HEADER */}

      <header className="sticky top-0 left-0 overflow-auto w-full z-50 bg-(--color-primary) shadow-md">
        <div className="flex justify-between items-center px-6 py-4">
          {/* Logo */}

          <Link to="/" className="text-2xl font-bold text-white">
            HealthUP
          </Link>

          {/* ================= DESKTOP NAV ================= */}

          <nav className="hidden md:flex items-center gap-8 text-white font-medium">
            <Link to="/" className="hover:text-(--color-accent)">
              Home
            </Link>
            <Link to="/about" className="hover:text-(--color-accent)">
              About
            </Link>
            <Link to="/contact" className="hover:text-(--color-accent)">
              Contact
            </Link>

            {/* Login setup */}

            <div className="flex gap-4">
              {isLogin ? (
                <div className="flex justify-between gap-3 items-center">
                  <div className="text-(--color-secondary) font-bold">
                    Hey, Nitish
                  </div>
                  <div
                    onClick={handledDesktopNavigate}
                    className="cursor-pointer"
                  >
                    {user ? (
                      <img
                        src={user?.photo?.url}
                        className="w-8 h-8 rounded-full object-cover border-2 border-(--color-background)"
                      />
                    ) : (
                      <FaUserCircle className="w-6 h-6 text-white" />
                    )}
                    {/* */}
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="text-(--color-secondary) hover:underline cursor-pointer text-lg"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate("/SignUp");
                    }}
                    className="text-(--color-secondary) hover:underline cursor-pointer text-lg"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>

          {/* ================= MOBILE MENU ICON ================= */}

          {menuOpen && isLogin ? (
            <div onClick={() => setMenuOpen(true)}>
              <div className="flex justify-between gap-3 items-center">
                <div className="text-(--color-accent) font-bold">
                  Hey, Nitish Yadav
                </div>
                <div className="cursor-pointer">
                  {user ? (
                    <img
                      src={user?.photo?.url}
                      className="w-8 h-8 rounded-full object-cover border-2 border-(--color-background)"
                    />
                  ) : (
                    <FaUserCircle className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <HiOutlineMenu
              className="w-7 h-7 text-white cursor-pointer md:hidden"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}

      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* ================= MOBILE DRAWER ================= */}

      {isLogin ? (
        <div
          className={`fixed top-15 right-0 h-fit w-[50%] max-w-sm bg-(--color-primary)/40 text-white z-50 transform transition-transform duration-300 md:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-6 px-5 py-5 text-lg font-medium">
            <button onClick={handleMobileNavigate} className="cursor-pointer">
              Account
            </button>

            <button onClick={handleLogout} className="cursor-pointer">
              Logout
            </button>
          </nav>
        </div>
      ) : (
        <div
          className={`fixed top-0 right-0 h-full w-[50%] max-w-sm bg-(--color-primary) text-white z-50 transform transition-transform duration-300 md:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}

          <div className="flex justify-between items-center px-6 py-5 border-b border-(--color-background)">
            <span className="text-xl font-semibold">HealthUP</span>
            <HiOutlineX
              className="w-7 h-7 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          </div>

          {/* Drawer Links */}

          <nav className="flex flex-col gap-6 px-5 py-10 text-lg font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>

            <div className="border-t border-(--color-background) pt-6 mt-4 flex flex-col gap-6">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
