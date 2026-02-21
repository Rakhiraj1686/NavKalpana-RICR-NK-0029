import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#020617] to-[#0f172a] text-white relative overflow-hidden">
      {/* Background Glow Effects (Matching Login Page) */}
      <div className="absolute w-125 h-125 bg-purple-600/20 rounded-full blur-[140px] -top-32 -left-32" />
      <div className="absolute w-112.5 h-112.5 bg-blue-600/20 rounded-full blur-[140px] -bottom-32 -right-32" />

      <div className="relative z-10">
        <Hero />
        <HowItWorks />
        <Features />
        <AICoach />
        <CTA />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
      >
        <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Adaptive Fitness Intelligence
        </span>
      </motion.h1>

      <p className="max-w-2xl text-gray-400 text-lg mb-8">
        AI-powered workout and nutrition plans that adapt to your habits,
        fatigue levels, and real-world progress.
      </p>

      <div className="flex gap-4">
        <Link
          to="/signup"
          className="bg-linear-to-r from-purple-500 to-blue-500 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition shadow-xl"
        >
          Start Free
        </Link>

        <Link
          to="/about"
          className="border border-white/20 px-8 py-4 rounded-2xl hover:bg-white/10 transition"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    "Profile Setup",
    "Generate Plan",
    "Track Progress",
    "Analyze",
    "Adjust",
    "AI Coach",
  ];

  return (
    <section className="py-24 text-center px-6">
      <h2 className="text-4xl font-bold mb-16 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        How FitAI Works
      </h2>

      <div className="grid md:grid-cols-6 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl"
          >
            {step}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    ["Adaptive Workouts", "Plans auto-adjust using fatigue & adherence data."],
    ["Smart Diet Generator", "Macro-based personalized nutrition engine."],
    ["Habit Intelligence", "Consistency scoring & drop-off detection."],
    ["Progress Analytics", "Weight trends & measurement tracking."],
    ["Energy Monitoring", "Prevent overtraining with smart recovery."],
    ["Goal Forecast", "Predict timeline to reach your target."],
  ];

  return (
    <section className="py-24 px-8">
      <h2 className="text-4xl font-bold text-center mb-16 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Core Features
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {features.map(([title, desc], i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-3 text-purple-400">
              {title}
            </h3>
            <p className="text-gray-400">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AICoach() {
  return (
    <section className="py-24 text-center px-6">
      <h2 className="text-4xl font-bold mb-6 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        AI Fitness Assistant
      </h2>

      <p className="max-w-2xl mx-auto text-gray-400 mb-8">
        Ask why your progress slowed, optimize diet, manage fatigue and receive
        data-backed AI coaching insights.
      </p>

      <Link
        to="/signup"
        className="bg-linear-to-r from-purple-500 to-blue-500 px-10 py-4 rounded-2xl font-semibold hover:scale-105 transition shadow-xl"
      >
        Try AI Coach
      </Link>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-28 text-center">
      <h2 className="text-5xl font-bold mb-8">
        Ready to Transform Your Fitness?
      </h2>

      <Link
        to="/signup"
        className="bg-linear-to-r from-purple-500 to-blue-500 px-12 py-5 rounded-2xl text-xl font-semibold hover:scale-105 transition shadow-2xl"
      >
        Join FitAI Today
      </Link>
    </section>
  );
}
