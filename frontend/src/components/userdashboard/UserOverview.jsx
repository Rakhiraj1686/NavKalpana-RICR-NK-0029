import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const UserOverview = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  console.log(user?.profileCompleted);

  return (
    <div className="min-h-screen text-white py-8 px-6">
      {/* PROFILE INCOMPLETE MESSAGE */}
      {user?.profileCompleted ? (
        <main className="max-w-7xl mx-auto">
          {/* GREETING */}
          <h1 className="text-3xl font-bold mb-8">Welcome Back 👋</h1>

          {/* STATS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Stat title="Workout Streak" value="12 Days" color="purple" />
            <Stat title="Calories Today" value="1850 kcal" color="blue" />
            <Stat title="Weight Progress" value="-3.2 kg" color="purple" />
            <Stat title="Habit Score" value="82%" color="blue" />
          </div>

          {/* MAIN PANELS */}
          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard
              title="Today's Workout"
              desc="Chest & Triceps session planned. Complete your sets to maintain streak."
            />

            <GlassCard
              title="Nutrition Summary"
              desc="Protein intake slightly low today. Consider adding a protein-rich meal."
            />
          </div>
        </main>
      ) : (
        <div className="max-w-4xl mx-auto mb-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
          <h2 className="text-xl font-bold mb-3 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            AI Fitness Status
          </h2>

          <p className="text-gray-300 text-sm">
            Complete your fitness profile to unlock adaptive AI workout and diet
            plans.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserOverview;

/* ---------- SMALL REUSABLE COMPONENTS ---------- */

const Stat = ({ title, value, color }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow hover:scale-[1.02] transition">
    <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
    <p
      className={`text-2xl font-bold ${
        color === "purple" ? "text-purple-400" : "text-blue-400"
      }`}
    >
      {value}
    </p>
  </div>
);

const GlassCard = ({ title, desc }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow">
    <h2 className="text-xl font-semibold mb-3">{title}</h2>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);
