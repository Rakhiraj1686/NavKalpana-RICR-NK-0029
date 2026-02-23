import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/Api";
import toast from "react-hot-toast";

const UserGoal = () => {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    primaryGoal: "",
    calorieTarget: "",
    goalWeight: "",
  });

  const [goalCompleted, setGoalCompleted] = useState(false);

  /* Prefill if user already has goal */
  useEffect(() => {
    if (user?.primaryGoal) {
      setFormData({
        primaryGoal: user.primaryGoal,
        calorieTarget: user.calorieTarget || "",
        goalWeight: user.goalWeight || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* Submit goal */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put("/user/setGoal", formData);
      toast.success(res.data.message);
      setUser(res.data.data);
      setGoalCompleted(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Goal update failed");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">

        {/* CURRENT GOAL */}
        {user?.primaryGoal && !goalCompleted && (
          <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-purple-400 mb-3">
              Current Goal
            </h3>

            <p>Goal: {user.primaryGoal}</p>
            {user.goalWeight && <p>Target Weight: {user.goalWeight} kg</p>}
            {user.calorieTarget && (
              <p>Calories: {user.calorieTarget} kcal/day</p>
            )}

            <button
              onClick={() => setGoalCompleted(true)}
              className="mt-4 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition"
            >
              Mark Goal Completed
            </button>
          </div>
        )}

        {/* SET NEW GOAL */}
        {(goalCompleted || !user?.primaryGoal) && (
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-center bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Set Fitness Goal
            </h2>

            {/* PRIMARY GOAL */}
            <div className="mb-5">
              <label className="text-gray-300 text-sm mb-2 block">
                Primary Goal
              </label>

              <select
                name="primaryGoal"
                value={formData.primaryGoal}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="" className="text-gray-800">
                  Select Goal
                </option>

                <option value="weight loss" className="text-gray-800">
                  Weight Loss
                </option>

                <option value="muscle gain" className="text-gray-800">
                  Muscle Gain
                </option>

                <option value="body recomposition" className="text-gray-800">
                  Body Recomposition
                </option>

                <option value="maintain" className="text-gray-800">
                  Maintain
                </option>

                <option value="improve endurance" className="text-gray-800">
                  Improve Endurance
                </option>
              </select>
            </div>

            {/* GOAL WEIGHT */}
            <div className="mb-5">
              <label className="text-gray-300 text-sm mb-2 block">
                Goal Weight (kg)
              </label>

              <input
                type="number"
                name="goalWeight"
                value={formData.goalWeight}
                onChange={handleInputChange}
                placeholder="Enter goal weight"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* CALORIE TARGET */}
            <div className="mb-6">
              <label className="text-gray-300 text-sm mb-2 block">
                Daily Calorie Target
              </label>

              <input
                type="number"
                name="calorieTarget"
                value={formData.calorieTarget}
                onChange={handleInputChange}
                placeholder="Enter calorie target"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <button className="w-full py-3 rounded-xl bg-linear-to-r from-purple-500 to-blue-500 font-semibold hover:scale-105 transition shadow-lg">
              Save Goal
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserGoal;
