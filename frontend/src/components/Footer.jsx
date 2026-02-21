import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#020617] text-white border-t border-white/10">

      {/* Main Footer */}
      <div className="px-6 md:px-20 py-16 grid gap-10 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            HealthUP
          </h2>
          <p className="text-gray-400 text-sm">
            Adaptive Fitness Intelligence platform delivering personalized
            workout & diet plans powered by AI-driven habit tracking.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-4 text-white">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-gray-400 text-sm">
            <Link className="hover:text-purple-400 transition" to="/">
              Home
            </Link>
            <Link className="hover:text-purple-400 transition" to="/about">
              About
            </Link>
            <Link className="hover:text-purple-400 transition" to="/contact">
              Contact
            </Link>
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="font-semibold mb-4 text-white">
            Core Features
          </h3>

          <div className="flex flex-col gap-3 text-gray-400 text-sm">
            <span className="hover:text-purple-400 transition">
              Workout Generator
            </span>
            <span className="hover:text-purple-400 transition">
              Diet Planner
            </span>
            <span className="hover:text-purple-400 transition">
              Habit Intelligence
            </span>
            <span className="hover:text-purple-400 transition">
              AI Fitness Assistant
            </span>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4 text-white">
            Connect
          </h3>

          <p className="text-gray-400 text-sm mb-2">
            📞 989898XXXX
          </p>

          <p className="text-gray-400 text-sm mb-4">
            ✉️ support@healthup.com
          </p>

          <div className="flex gap-6 text-xl">
            <a
              href="#"
              className="text-gray-400 hover:text-purple-400 hover:scale-110 transition"
            >
              <FaGithub />
            </a>

            <a
              href="#"
              className="text-gray-400 hover:text-purple-400 hover:scale-110 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="#"
              className="text-gray-400 hover:text-purple-400 hover:scale-110 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} HealthUP - Built with ❤️ for smarter fitness.
      </div>
    </footer>
  );
};

export default Footer;