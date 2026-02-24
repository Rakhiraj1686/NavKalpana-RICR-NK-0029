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

  //Prefill existing goal
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

  // Set New Goal
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there's an ongoing goal
    if (user?.goalStatus === "ongoing") {
      return toast.error(
        "⏳ You have an ongoing goal. Complete it first before setting a new one.",
      );
    }

    // Validate form data
    if (!formData.primaryGoal) {
      return toast.error("Please select a primary goal.");
    }

    try {
      const res = await api.put("/user/setGoal", {
        ...formData,
        goalStatus: "ongoing",
      });

      toast.success(res.data.message);
      setUser((prev) => ({ ...prev, ...res.data.data }));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Goal update failed");
    }
  };

  // Mark Goal Completed
  const handleCompleteGoal = async () => {
    try {
      const res = await api.put("/user/completeGoal", {
        ...formData,
        goalStatus: "completed",
      });
      toast.success(res.data.message);
      setUser((prev) => ({ ...prev, ...(user?.goalStatus === "completed") }));
    } catch {
      toast.error("Failed to complete goal");
    }
  };

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const res = await api.get("/user/goal");
        console.log("Goal response:", res.data);
        toast.success(res.data.message);
        setUser((prev) => ({ ...prev, ...res.data.data }));
      } catch {
        console.log("Failed to fetch goal");
      }
    };

    fetchGoal();
  }, [setUser]);

  return (
    <div className="min-h-screen p-6">
      {/* HERO SECTION */}

      <div className=" mx-auto mt-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Your Fitness Journey
        </h1>
        <p className="text-gray-300 text-md mb-6">
          Set ambitious goals and transform your body. Every step counts towards
          your dream fitness level.
        </p>
      </div>

      <div className="mt-6 mx-auto">
        {/* ONGOING GOAL SECTION */}
        {user?.primaryGoal && user?.goalStatus === "ongoing" && (
          <div className="mb-8 bg-linear-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-purple-400 flex items-center gap-2">
                <span className="text-2xl">⚡</span> Your Current Goal
              </h3>
              <span className="px-3 py-1 bg-purple-500/30 text-purple-300 rounded-full text-sm font-semibold">
                In Progress
              </span>
            </div>

            <div className="space-y-3 mb-6 bg-white/5 p-4 rounded-xl capitalize">
              <p className="text-gray-200">
                <span className="text-purple-400 text-xl font-semibold ">
                  Goal :{" "}
                </span>
                {user.primaryGoal}
              </p>
              {user.goalWeight && (
                <p className="text-gray-200">
                  <span className="text-purple-400 font-semibold">
                    Target Weight :
                  </span>
                  {user.goalWeight} kg
                </p>
              )}
              {user.calorieTarget && (
                <p className="text-gray-200">
                  <span className="text-purple-400 font-semibold">
                    Daily Calorie Target :
                  </span>
                  {user.calorieTarget} kcal
                </p>
              )}
            </div>

            <button
              onClick={handleCompleteGoal}
              className="w-full py-3 px-4 bg-linear-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Mark Goal as Completed
            </button>
          </div>
        )}

        {/* COMPLETED GOAL MESSAGE */}
        {user?.goalStatus === "completed" && (
          <div className="mb-8 bg-linear-to-r from-green-500/15 to-emerald-500/15 border border-green-500/40 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-3">
              <div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">
                  Congratulations ! <span className="text-3xl">🎉</span>
                </h3>
                <p className="text-gray-200">
                  Your previous goal has been completed successfully!
                </p>
                <p className="text-green-300 mt-2 font-semibold">
                  Ready for your next challenge ? Set a fresh new goal below !
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ADD NEW GOAL SECTION */}
        {(!user?.primaryGoal || user?.goalStatus === "completed") && (
          <div className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl mb-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-3 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Set Your New Goal
              </h2>
              <p className="text-gray-400 text-sm">
                Define your fitness objective and let's get started on your
                transformation journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* PRIMARY GOAL */}
              <div>
                <label className="text-gray-300 text-sm font-semibold mb-3 block">
                  What's Your Primary Goal?
                </label>
                <select
                  name="primaryGoal"
                  value={formData.primaryGoal}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:ring-2 focus:ring-purple-500 outline-none transition hover:bg-white/10 cursor-pointer"
                >
                  <option value="" className="text-gray-800">
                    -- Select a Goal --
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
                    Maintain Weight
                  </option>
                  <option value="improve endurance" className="text-gray-800">
                    Improve Endurance
                  </option>
                </select>
              </div>

              {/* GOAL WEIGHT */}
              <div>
                <label className="text-gray-300 text-sm font-semibold mb-3 block">
                  Target Weight (kg)
                </label>
                <input
                  type="number"
                  name="goalWeight"
                  placeholder="Enter your goal weight"
                  value={formData.goalWeight}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none transition hover:bg-white/10"
                />
              </div>

              {/* CALORIE TARGET */}
              <div>
                <label className="text-gray-300 text-sm font-semibold mb-3 block">
                  Daily Calorie Target
                </label>
                <input
                  type="number"
                  name="calorieTarget"
                  placeholder="Enter daily calorie target"
                  value={formData.calorieTarget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none transition hover:bg-white/10"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-blue-600 text-white font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition duration-300 shadow-lg hover:shadow-2xl transform cursor-pointer"
              >
                Start Your Fresh Goal
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserGoal;
