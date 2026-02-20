import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { FiMail } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { VscLock } from "react-icons/vsc";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineSafety,
} from "react-icons/ai";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validError, setValidError] = useState({});

  const handleClear = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let Error = {};

    // Name error validation
    if (formData.fullName.length < 3) {
      Error.fullName = "Name should contain atleast three letters";
    } else {
      if (!/^[A-z ]+$/.test(formData.fullName)) {
        Error.fullName = "Name should contains only A-Z, a-z and space";
      }
    }

    // Phone error validation
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      Error.phone = "Please enter an Indian Number";
    }

    // Email error validation
    if (
      !/^[\w.+-]+@(gmail|outlook|ricr|yahoo|zohomail)\.(com|in|co\.in)$/.test(
        formData.email,
      )
    ) {
      Error.email = "Use proper email format";
    }

    // Password create error
    if (formData.password.length < 6) {
      Error.password = "Password should contain atleast 6 digits";
    }

    setValidError(Error);
    return Object.keys(Error).length > 0 ? false : true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Checks Any missing fields
    if (!validate()) {
      toast.error("Fill the form correctly.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Registration Data", formData);
      toast.success("Registration successfully done !");
      navigate("/login");
      handleClear();
    } catch (error) {
      console.log(error);
      toast.error("Error in Registration process");
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
            Create Account
          </div>
          <div className="text-sm text-(--color-secondary)">
            Sign up to get started
          </div>
        </div>

        {/* Card */}

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <form
            className="p-8 space-y-5"
            onSubmit={handleSubmit}
            onReset={handleClear}
          >
            {/* Full Name */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  className="w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
              {validError.fullName && (
                <span className="text-[11px] text-red-500">
                  {validError.fullName}
                </span>
              )}
            </div>

            {/* Email */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <div className="text-end">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    className="w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>
              {validError.email && (
                <span className="text-[11px] text-red-500">
                  {validError.email}
                </span>
              )}
            </div>

            {/* Phone */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <div className="text-end">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    className="w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>
              {validError.phone && (
                <span className="text-[11px] text-red-500">
                  {validError.phone}
                </span>
              )}
            </div>

            {/* Password */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                {/* Left Lock Icon */}

                <VscLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />

                {/* Input */}

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  className="w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                />

                {/* Eye Toggle Button */}

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>

              {validError.password && (
                <span className="text-[11px] text-red-500 mt-1 block">
                  {validError.password}
                </span>
              )}
            </div>

            {/* Register Button */}

            <button
              type="submit"
              className="bg-(--color-secondary) text-white font-bold py-3 px-6 rounded-lg hover:bg-(--color-secondary-hover) transition duration-300 transform hover:scale-105 shadow-lg w-full cursor-pointer"
            >
              Register
            </button>

            {/* Login Redirect */}

            <div className="border-t border-gray-200 text-center pt-5">
              <span className="text-sm text-gray-600">
                Already have an account?
              </span>
              <Link
                to="/login"
                className="block mt-3 bg-(--color-primary)/30 text-(--color-primary) font-bold py-3 px-6 rounded-lg shadow-lg"
              >
                Login Instead
              </Link>
            </div>
          </form>
        </div>

        {/* Footer */}

        <div className="text-xs pt-5 text-center text-gray-600">
          By signing up you agree to the terms & conditions.
        </div>
      </div>
    </div>
  );
};

export default Signup;
