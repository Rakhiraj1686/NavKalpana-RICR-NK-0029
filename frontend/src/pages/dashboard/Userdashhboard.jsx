import React, { useState } from "react";

const UserDashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-linear-to-br from-[#020617] to-[#0f172a] text-white py-28">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">

        {/* TOPBAR */}
        <div className="md:hidden p-4 border-b border-white/10 flex justify-between">
          <button onClick={() => setSidebarOpen(true)}>☰</button>
          <span>Dashboard</span>
        </div>

        <div className="max-w-6xl mx-auto p-6">

          {/* GREETING */}
          <h1 className="text-3xl font-bold mb-8">
            Welcome Back 👋
          </h1>

          {/* STATS CARDS */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl">
              <h3 className="text-gray-400">Workout Streak</h3>
              <p className="text-2xl font-bold text-purple-400">12 Days</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl">
              <h3 className="text-gray-400">Calories Today</h3>
              <p className="text-2xl font-bold text-blue-400">1850 kcal</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl">
              <h3 className="text-gray-400">Weight Progress</h3>
              <p className="text-2xl font-bold text-purple-400">-3.2 kg</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl">
              <h3 className="text-gray-400">Habit Score</h3>
              <p className="text-2xl font-bold text-blue-400">82%</p>
            </div>

          </div>

          {/* MAIN PANELS */}
          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">
                Today's Workout
              </h2>
              <p className="text-gray-400">
                Chest & Triceps session planned.
                Complete your sets to maintain streak.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">
                Nutrition Summary
              </h2>
              <p className="text-gray-400">
                Protein intake slightly low today.
                Consider adding a protein-rich meal.
              </p>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default UserDashBoard;