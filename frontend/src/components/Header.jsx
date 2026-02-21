import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaUserCircle, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { GiProgression } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";

const Header = () => {
  const { user, isLogin, setUser, setIsLogin } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const logout = () => {
    sessionStorage.removeItem("HealthUP"); // clear storage
    setUser(null); // reset user
    setIsLogin(false); // update login state
    navigate("/"); // redirect home
    toast.success("Logout Successfully !");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* HEADER */}

      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full px-6">
        <div
          className="max-w-5xl mx-auto flex items-center justify-between 
                  px-8 py-3 rounded-full 
                  bg-[#0f172a]/80 backdrop-blur-xl 
                  border border-white/10 shadow-xl"
        >
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            HealthUP
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
            <Link className="hover:text-purple-400 transition" to="/">
              Home
            </Link>

            <Link className="hover:text-purple-400 transition" to="/about">
              About
            </Link>

            <Link className="hover:text-purple-400 transition" to="/contact">
              Contact
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="hidden md:block">
            {!isLogin ? (
              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-1.5 rounded-full border border-purple-400 
                       hover:bg-linear-to-r from-purple-500 to-blue-500 
                       transition text-white cursor-pointer"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="px-5 py-1.5 rounded-full 
                       bg-linear-to-r from-purple-500 to-blue-500 
                       transition text-white cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="relative ml-4" ref={dropdownRef}>
                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="cursor-pointer flex items-center gap-2"
                >
                  {user?.photo?.url ? (
                    <img
                      src={user.photo.url}
                      className="w-9 h-9 rounded-full object-cover border border-white/20"
                    />
                  ) : (
                    <FaUserCircle className="w-8 h-8 text-purple-400" />
                  )}
                </div>

                {profileOpen && (
                  <div
                    className="absolute right-0 mt-4 w-72 rounded-2xl 
  bg-white text-gray-800
  shadow-2xl overflow-hidden
  border border-gray-200"
                  >
                    {/* Gradient Top Banner */}
                    <div className="bg-linear-to-r from-purple-500 to-blue-500 p-5 text-white">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-full 
        flex items-center justify-center font-bold"
                        >
                          {user?.photo?.url ? (
                            <img
                              src={user.photo.url}
                              className="w-9 h-9 rounded-full object-cover border border-white/20"
                            />
                          ) : (
                            <FaUserCircle className="w-12 h-12 text-purple-400" />
                          )}
                        </div>

                        <div>
                          <p className="font-semibold">{user?.fullName}</p>
                          <p className="text-xs text-white/80">
                            HealthUP Member
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <button
                        className="w-full text-left px-4 py-2 rounded-lg 
       transition font-medium flex items-center gap-4 hover:bg-purple-50 cursor-pointer"
                        onClick={() => {
                          navigate("/user-dashboard");
                          setProfileOpen(!profileOpen);
                          ref = { dropdownRef };
                        }}
                      >
                        <FaUser className="text-xl" /> Profile
                      </button>

                      <button
                        className="w-full text-left px-4 py-2 rounded-lg 
      hover:bg-blue-50 transition font-medium flex items-center gap-4 cursor-pointer"
                        onClick={() => {
                          navigate("/user-dashboard");
                          setProfileOpen(!profileOpen);
                          ref = { dropdownRef };
                        }}
                      >
                        <GiProgression className="text-xl" /> My Progress
                      </button>

                      <button
                        className="w-full text-left px-4 py-2 rounded-lg 
      hover:bg-indigo-50 transition font-medium flex items-center gap-4 cursor-pointer"
                        onClick={() => {
                          navigate("/user-dashboard");
                          setProfileOpen(!profileOpen);
                          ref = { dropdownRef };
                        }}
                      >
                        <IoMdSettings className="text-xl " /> Settings
                      </button>

                      <div className="border-t my-2"></div>

                      <button
                        className="w-full text-left px-4 py-2 rounded-lg 
      hover:bg-red-50 transition text-red-500 font-semibold flex items-center gap-4 cursor-pointer"
                       onClick={logout}
                      >
                        <FiLogOut className="text-xl " /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <HiOutlineMenu
            className="w-7 h-7 md:hidden cursor-pointer text-white"
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-[50%] max-w-sm bg-[#020617] text-white z-50 transform transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
          <span className="text-xl font-semibold">HealthUP</span>
          <HiOutlineX
            className="w-7 h-7 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        <nav className="flex flex-col gap-6 px-6 py-10 text-lg">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>

          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

          <div className="border-t border-white pt-6 mt-4">
            {!isLogin ? (
              <>
                <div className="flex flex-col">
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                  <br />
                  <Link to="/signup" onClick={() => setMenuOpen(false)}>
                    Sign Up
                  </Link>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/user-dashboard");
                    setMenuOpen(false);
                  }}
                >
                  Profile
                </button>
                <br />
                <button onClick={logout} className="text-red-400">
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
