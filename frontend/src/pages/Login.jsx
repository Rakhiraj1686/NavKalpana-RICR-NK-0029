import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { VscLock } from "react-icons/vsc";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineSafety,
} from "react-icons/ai";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClear = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Login Data", formData);
      toast.success("Login successfully !");
      handleClear();
      navigate("/user-dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Error in Login process");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full bg-linear-to-br from-blue-50 to-indigo-100 py-15 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}

        <div className="flex flex-col items-center space-y-2 pb-6">
          <div className="text-4xl p-5 rounded-full bg-white text-(--color-primary)">
            <AiOutlineSafety />
          </div>
          <div className="text-3xl font-bold text-(--color-secondary)">
            Login
          </div>
          <div className="text-sm text-(--color-secondary)">
            Sign in to continue
          </div>
        </div>

        {/* Card */}

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <form
            className="p-8 space-y-5"
            onSubmit={handleSubmit}
            onReset={handleClear}
          >
            {/* Email */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder="Enter your registered email"
                  required
                  className="w-full px-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <VscLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  className="w-full px-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl cursor-pointer" />
                  ) : (
                    <AiOutlineEye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl cursor-pointer" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="flex items-center justify-center cursor-pointer gap-2 bg-(--color-secondary) text-white font-bold py-3 px-6 rounded-lg hover:bg-(--color-secondary-hover) transition duration-300 transform hover:scale-105 shadow-lg w-full"
            >
              <FiLogIn />
              Sign In
            </button>

            {/* Forgot Password */}

            <div className="border-b-2 border-gray-200 text-end py-2">
              <Link
                to="/forgot-password"
                className="text-sm text-(--color-text) hover:text-blue-700 hover:underline"
              >
                Forgotten Password?
              </Link>
            </div>

            {/* Sign Up */}

            <div className="flex justify-between items-center pt-3">
              <div className="text-gray-600">Didn't have account?</div>
              <Link
                to="/signup"
                className=" text-(--color-primary)/70 font-bold hover:underline hover:text-(--color-primary)"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>

        {/* Footer */}

        <div className="text-xs pt-5 text-center text-gray-600">
          By signing in you agree to the terms & conditions.
        </div>
      </div>
    </div>
  );
};

export default Login;
