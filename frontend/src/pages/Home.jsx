import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-(--color-background) text-white">
      {/* ================= HERO SECTION ================= */}

      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight flex flex-col">
          <span className="text-(--color-primary)">HealthUP</span>
          <span className="text-(--color-accent)">
            Adaptive Fitness Intelligence
          </span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-gray-600 mb-8">
          Personalized workout & diet plans that adapt to your habits,
          performance, fatigue, and progress.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/signup"
            className="bg-(--color-accent) px-6 py-3 rounded-md text-white font-medium hover:opacity-90 transition"
          >
            Get Started
          </Link>

          <Link
            to="/about"
            className="border border-(--color-primary) text-(--color-primary) px-6 py-3 rounded-md hover:bg-white hover:text-black transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section className="py-20 px-6 md:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-(--color-primary)/60">
          How HealthUP Works
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-gray-300">
          <div className="px-6 py-3 bg-(--color-secondary)/60 rounded text-white">
            Profile
          </div>
          <div className="px-6 py-3 bg-(--color-secondary)/60 rounded text-white">
            Generate Plan
          </div>
          <div className="px-6 py-3 bg-(--color-secondary)/60 rounded text-white">
            Track Progress
          </div>
          <div className="px-6 py-3 bg-(--color-secondary)/60 rounded text-white">
            AI Adjusts
          </div>
        </div>
      </section>

      {/* ================= CORE FEATURES ================= */}

      <section className="py-20 px-6 md:px-16 bg-(--color-primary)">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 ">
          Core Features
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-(--color-background) p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-(--color-primary)">
              Adaptive Workout Plans
            </h3>
            <p className="text-gray-500">
              Weekly workout plans that intelligently adjust volume and
              intensity.
            </p>
          </div>

          <div className="bg-(--color-background) p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-(--color-primary)">
              Smart Diet Generator
            </h3>
            <p className="text-gray-500">
              Macro-based personalized diet plans aligned with your goals.
            </p>
          </div>

          <div className="bg-(--color-background) p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-(--color-primary)">
              Habit Intelligence Engine
            </h3>
            <p className="text-gray-500">
              Tracks workout & diet adherence to calculate habit score.
            </p>
          </div>
        </div>
      </section>

      {/* ================= AI COACH SECTION ================= */}

      <section className="py-20 px-6 md:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-(--color-primary)">
          AI Fitness Assistant
        </h2>

        <p className="max-w-2xl mx-auto text-gray-600 mb-8">
          Ask HealthUP why your progress is slow, why you're fatigued, or how to
          optimize your plan & get data-backed coaching.
        </p>

        <Link
          to="/signup"
          className="bg-(--color-secondary) px-6 py-3 rounded-md hover:opacity-90 transition"
        >
          Start Your Journey
        </Link>
      </section>
    </div>
  );
};

export default Home;
