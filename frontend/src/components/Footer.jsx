import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-(--color-primary) text-white">
      {/* Main Footer Content */}

      <div className="px-6 md:px-16 py-10 grid gap-6 md:grid-cols-4">
        {/* Brand Section */}

        <div>
          <h2 className="text-2xl font-bold mb-3 text-(--color-accent)">
            HealthUP
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            Adaptive Fitness Intelligence Platform that generates personalized
            workout & diet plans using intelligent habit-based adjustments.
          </p>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <div className="flex flex-col gap-3 text-gray-300 text-sm">
            <Link to="/" className="hover:text-(--color-accent)">
              Home
            </Link>
            <Link to="/about" className="hover:text-(--color-accent)">
              About
            </Link>
            <Link to="/contact" className="hover:text-(--color-accent)">
              Contact
            </Link>
          </div>
        </div>

        {/* Features */}

        <div>
          <h3 className="text-lg font-semibold mb-3">Core Features</h3>
          <div className="flex flex-col gap-3 text-gray-300 text-sm">
            <span>Workout Generator</span>
            <span>Diet Planner</span>
            <span>Habit Intelligence</span>
            <span>AI Fitness Assistant</span>
          </div>
        </div>

        {/* Contact / Social */}

        <div>
          <h3 className="font-semibold mb-3 text-sm">Connect</h3>

          <p className="text-gray-300 ">📞 989898XXXX</p>

          <p className="text-gray-300">✉️ support@healthup.com</p>

          <div className="flex gap-5 mt-4 text-xl">
            <a href="#" className="hover:text-(--color-accent)">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-(--color-accent)">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-(--color-accent)">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}

      <div className="border-t border-(--color-background) text-center py-6 text-gray-400 text-sm">
        © {new Date().getFullYear()} HealthUP. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
