import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#020617] to-[#0f172a] text-white relative overflow-hidden ">
      {/* Background Glow Effects */}
      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -top-20 -left-20" />
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -bottom-20 -right-20" />

      {/* ================= HERO ================= */}
      <section className="relative z-10 pt-28 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-10 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            About HealthUP
          </h1>

          <p className="text-gray-300 md:max-w-3xl mx-auto leading-relaxed md:text-lg">
            HealthUP is a modern fitness and wellness platform built to help
            individuals transform their health through structure, data-driven
            insights, and adaptive guidance. We combine smart tracking,
            personalized planning, and intelligent adjustments to help users
            stay consistent and achieve sustainable results — without confusion
            or burnout.
          </p>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-purple-400">
              Why HealthUP Exists
            </h2>

            <p className="text-gray-300 text-lg">
              HealthUP was created to solve this gap - by providing a structured
              system that evolves with the user. Instead of one-size-fits-all
              templates, the platform monitors progress, detects patterns, and
              guides users intelligently.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:p-8 px-6 py-4 shadow-xl">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">
              Our Core Principle
            </h3>

            <p className="text-gray-300 leading-relaxed">
              Consistency beats intensity. Sustainable progress requires
              intelligent planning, measurable tracking, and balanced recovery.
              HealthUP focuses on long-term transformation rather than
              short-term hype.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-14 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Platform Capabilities
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-300">
                Personalized Planning
              </h3>
              <p className="text-gray-400">
                Custom workout structures and nutrition guidance designed around
                individual goals, lifestyle patterns, and consistency levels.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-300">
                Intelligent Tracking
              </h3>
              <p className="text-gray-400">
                Track workouts, diet adherence, progress trends, and body
                metrics in one integrated dashboard for complete visibility.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-300">
                Smart Adjustments
              </h3>
              <p className="text-gray-400">
                The system adapts routines when progress slows, fatigue
                increases, or consistency drops — helping users avoid plateaus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-blue-400">
            How HealthUP Works
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Create Profile",
              "Get Structured Plan",
              "Track Progress",
              "System Adapts",
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg"
              >
                {/* <div className="text-2xl font-bold text-purple-400 mb-2">
                  0{index + 1}
                </div> */}
                <p className="text-gray-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TECHNOLOGY ================= */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-purple-400">
            Built With Modern Technology
          </h2>

          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            HealthUP is built using scalable backend architecture, secure
            authentication systems, modular APIs, and responsive UI frameworks.
            The system is designed to support future AI-based enhancements,
            advanced analytics, and cloud deployment — ensuring reliability and
            performance at scale.
          </p>
        </div>
      </section>

      {/* ================= VISION ================= */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Our Long-Term Vision
          </h2>

          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We aim to evolve HealthUP into a complete digital wellness ecosystem
            — integrating intelligent coaching, predictive analytics, community
            support, and advanced health insights. Our mission is to empower
            individuals with clarity, structure, and confidence in their fitness
            journey.
          </p>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative z-10 py-24 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Begin Your Transformation with HealthUP
          </h2>

          <button
            className="bg-linear-to-r from-purple-500 to-blue-500 px-10 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-lg cursor-pointer"
            onClick={handleNavigate}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Footer Notes
      <footer className="bg-[#020617] text-white border-t border-white/10">
        <div className="border-t border-white/10 text-center py-6 text-gray-500 text-md">
          © {new Date().getFullYear()} HealthUP • All Rights reserved.
        </div>
      </footer> */}
    </div>
  );
};

export default About;
