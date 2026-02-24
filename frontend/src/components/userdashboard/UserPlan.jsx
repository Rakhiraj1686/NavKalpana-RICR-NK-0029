import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/Api";
import toast from "react-hot-toast";

const UserPlan = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("diet");
  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  // Sample diet plan structure
  const [dietPlan, setDietPlan] = useState({
    calories: 0,
    macros: { protein: 0, carbs: 0, fats: 0 },
    meals: [
      {
        mealName: "Breakfast",
        time: "7:00 AM - 8:00 AM",
        calories: 450,
        items: ["Oatmeal with berries", "2 Boiled Eggs", "Green Tea"],
        macros: { protein: 20, carbs: 50, fats: 15 },
      },
      {
        mealName: "Mid-Morning Snack",
        time: "10:00 AM - 10:30 AM",
        calories: 200,
        items: ["Apple", "Almonds (10-12)"],
        macros: { protein: 5, carbs: 25, fats: 10 },
      },
      {
        mealName: "Lunch",
        time: "12:30 PM - 1:30 PM",
        calories: 550,
        items: [
          "Grilled Chicken Breast",
          "Brown Rice",
          "Mixed Vegetable Salad",
          "Yogurt",
        ],
        macros: { protein: 40, carbs: 60, fats: 12 },
      },
      {
        mealName: "Evening Snack",
        time: "4:00 PM - 4:30 PM",
        calories: 180,
        items: ["Protein Shake", "Banana"],
        macros: { protein: 25, carbs: 30, fats: 3 },
      },
      {
        mealName: "Dinner",
        time: "7:00 PM - 8:00 PM",
        calories: 500,
        items: [
          "Baked Salmon",
          "Quinoa",
          "Steamed Broccoli",
          "Mixed Green Salad",
        ],
        macros: { protein: 45, carbs: 40, fats: 18 },
      },
    ],
  });

  // Sample workout plan structure
  const [workoutPlan, setWorkoutPlan] = useState({
    weekStartDate: new Date(),
    level: "Intermediate",
    days: [
      {
        dayName: "Monday",
        focus: "Chest & Triceps",
        duration: "45-60 min",
        exercises: [
          {
            name: "Bench Press",
            sets: 4,
            reps: "8-10",
            rest: "90 sec",
            formGuide: "Keep back flat, lower to chest",
          },
          {
            name: "Incline Dumbbell Press",
            sets: 3,
            reps: "10-12",
            rest: "60 sec",
            formGuide: "30-45 degree incline",
          },
          {
            name: "Cable Flyes",
            sets: 3,
            reps: "12-15",
            rest: "45 sec",
            formGuide: "Slight bend in elbows",
          },
          {
            name: "Tricep Dips",
            sets: 3,
            reps: "10-12",
            rest: "60 sec",
            formGuide: "Keep elbows tucked in",
          },
          {
            name: "Overhead Cable Extension",
            sets: 3,
            reps: "12-15",
            rest: "45 sec",
            formGuide: "Keep upper arms stationary",
          },
        ],
      },
      {
        dayName: "Tuesday",
        focus: "Back & Biceps",
        duration: "45-60 min",
        exercises: [
          {
            name: "Pull-ups",
            sets: 4,
            reps: "8-10",
            rest: "90 sec",
            formGuide: "Full range of motion",
          },
          {
            name: "Barbell Rows",
            sets: 4,
            reps: "8-10",
            rest: "90 sec",
            formGuide: "Keep back straight",
          },
          {
            name: "Lat Pulldown",
            sets: 3,
            reps: "10-12",
            rest: "60 sec",
            formGuide: "Pull to upper chest",
          },
          {
            name: "Barbell Curls",
            sets: 3,
            reps: "10-12",
            rest: "60 sec",
            formGuide: "No swinging motion",
          },
          {
            name: "Hammer Curls",
            sets: 3,
            reps: "12-15",
            rest: "45 sec",
            formGuide: "Neutral grip throughout",
          },
        ],
      },
      {
        dayName: "Wednesday",
        focus: "Rest or Active Recovery",
        duration: "30 min",
        exercises: [
          {
            name: "Light Cardio",
            sets: 1,
            reps: "20-30 min",
            rest: "N/A",
            formGuide: "Walk, swim, or cycle at easy pace",
          },
          {
            name: "Stretching",
            sets: 1,
            reps: "10 min",
            rest: "N/A",
            formGuide: "Focus on tight muscle groups",
          },
        ],
      },
      {
        dayName: "Thursday",
        focus: "Legs & Glutes",
        duration: "60-75 min",
        exercises: [
          {
            name: "Squats",
            sets: 4,
            reps: "8-10",
            rest: "2 min",
            formGuide: "Depth to parallel or below",
          },
          {
            name: "Romanian Deadlifts",
            sets: 4,
            reps: "10-12",
            rest: "90 sec",
            formGuide: "Keep knees slightly bent",
          },
          {
            name: "Leg Press",
            sets: 3,
            reps: "12-15",
            rest: "60 sec",
            formGuide: "Full range of motion",
          },
          {
            name: "Walking Lunges",
            sets: 3,
            reps: "12 each leg",
            rest: "60 sec",
            formGuide: "90-degree knee angle",
          },
          {
            name: "Leg Curls",
            sets: 3,
            reps: "12-15",
            rest: "45 sec",
            formGuide: "Controlled movement",
          },
        ],
      },
      {
        dayName: "Friday",
        focus: "Shoulders & Abs",
        duration: "45-60 min",
        exercises: [
          {
            name: "Military Press",
            sets: 4,
            reps: "8-10",
            rest: "90 sec",
            formGuide: "Press overhead fully",
          },
          {
            name: "Lateral Raises",
            sets: 3,
            reps: "12-15",
            rest: "60 sec",
            formGuide: "Slight bend in elbows",
          },
          {
            name: "Front Raises",
            sets: 3,
            reps: "12-15",
            rest: "60 sec",
            formGuide: "Raise to shoulder height",
          },
          {
            name: "Planks",
            sets: 3,
            reps: "60 sec",
            rest: "45 sec",
            formGuide: "Keep body in straight line",
          },
          {
            name: "Russian Twists",
            sets: 3,
            reps: "20 each side",
            rest: "45 sec",
            formGuide: "Controlled rotation",
          },
        ],
      },
      {
        dayName: "Saturday",
        focus: "Full Body HIIT",
        duration: "30-40 min",
        exercises: [
          {
            name: "Burpees",
            sets: 4,
            reps: "15-20",
            rest: "30 sec",
            formGuide: "Explosive movement",
          },
          {
            name: "Mountain Climbers",
            sets: 4,
            reps: "30 sec",
            rest: "30 sec",
            formGuide: "Fast-paced alternating",
          },
          {
            name: "Kettlebell Swings",
            sets: 4,
            reps: "15-20",
            rest: "45 sec",
            formGuide: "Hip hinge movement",
          },
          {
            name: "Jump Squats",
            sets: 4,
            reps: "12-15",
            rest: "45 sec",
            formGuide: "Land softly",
          },
        ],
      },
      {
        dayName: "Sunday",
        focus: "Rest & Recovery",
        duration: "Rest",
        exercises: [
          {
            name: "Full Rest Day",
            sets: 1,
            reps: "N/A",
            rest: "N/A",
            formGuide: "Focus on recovery, hydration, and meal prep",
          },
        ],
      },
    ],
  });

  // Calculate total macros from meals
  useEffect(() => {
    if (dietPlan.meals && dietPlan.meals.length > 0) {
      const totalCalories = dietPlan.meals.reduce(
        (sum, meal) => sum + meal.calories,
        0,
      );
      const totalProtein = dietPlan.meals.reduce(
        (sum, meal) => sum + meal.macros.protein,
        0,
      );
      const totalCarbs = dietPlan.meals.reduce(
        (sum, meal) => sum + meal.macros.carbs,
        0,
      );
      const totalFats = dietPlan.meals.reduce(
        (sum, meal) => sum + meal.macros.fats,
        0,
      );

      setDietPlan((prev) => ({
        ...prev,
        calories: totalCalories,
        macros: { protein: totalProtein, carbs: totalCarbs, fats: totalFats },
      }));
    }
  }, []);

  const handleRegeneratePlan = async () => {
    if (!user?.primaryGoal) {
      toast.error("Please set your fitness goal first!");
      return;
    }

    setRegenerating(true);
    try {
      const res = await api.post("/user/generatePlan");
      toast.success("Plan regenerated successfully! 🎉");
      // Update plans with AI-generated data if available
      if (res.data.aiPlan) {
        // You can update the diet plan based on AI response
        console.log("AI Plan:", res.data.aiPlan);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to regenerate plan");
    } finally {
      setRegenerating(false);
    }
  };

  //currently it is hard coded 
  return (
    <>
      <div className="min-h-screen p-6 mb-8">
        {/* Hero Section */}
        <div className="mb-10 bg-linear-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20 border border-purple-500/30 rounded-3xl p-10 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Your Personalized Plan
            </h1>
            <p className="text-gray-300 text-md mb-6">
              A customized diet and workout plan designed specifically for your
              goals. Stay consistent and watch the results!
            </p>

            <button
              onClick={handleRegeneratePlan}
              disabled={regenerating}
              className="px-6 py-2.5 bg-linear-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {regenerating ? " Regenerating..." : " Regenerate AI Plan"}
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-5 mb-8 bg-white/5 p-2 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab("diet")}
              className={`flex-1 py-2 rounded-lg font-semibold transition duration-300 ${
                activeTab === "diet"
                  ? "bg-linear-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white cursor-pointer"
              }`}
            >
              Diet Plan
            </button>

            <button
              onClick={() => setActiveTab("workout")}
              className={`flex-1 py-2 rounded-lg font-semibold transition duration-300 ${
                activeTab === "workout"
                  ? "bg-linear-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white cursor-pointer"
              }`}
            >
              Workout Plan
            </button>
          </div>

          {/* ================= DIET PLAN ================= */}
          {activeTab === "diet" && (
            <div className="space-y-6">
              {/* Nutrition Summary */}
              <div className="bg-linear-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                   Daily Nutrition Goals
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl text-center">
                    <p className="text-gray-400 text-sm mb-1">Calories</p>
                    <p className="text-2xl font-bold text-purple-400">
                      {dietPlan.calories}
                    </p>
                    <p className="text-xs text-gray-500">kcal</p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl text-center">
                    <p className="text-gray-400 text-sm mb-1">Protein</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {dietPlan.macros.protein}g
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl text-center">
                    <p className="text-gray-400 text-sm mb-1">Carbs</p>
                    <p className="text-2xl font-bold text-indigo-400">
                      {dietPlan.macros.carbs}g
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl text-center">
                    <p className="text-gray-400 text-sm mb-1">Fats</p>
                    <p className="text-2xl font-bold text-purple-300">
                      {dietPlan.macros.fats}g
                    </p>
                  </div>
                </div>
              </div>

              {/* Meals */}
              <div className="space-y-4">
                {dietPlan.meals.map((meal, index) => (
                  <div
                    key={index}
                    className="bg-linear-to-br from-white/10 to-white/5 border border-white/20 rounded-xl p-6 hover:border-purple-500/50 transition duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-purple-300 mb-1">
                          {meal.mealName}
                        </h3>
                        <p className="text-sm text-gray-400"> {meal.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-400">
                          {meal.calories}
                        </p>
                        <p className="text-xs text-gray-400">kcal</p>
                      </div>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {meal.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-gray-300"
                        >
                          <span className="text-purple-400">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= WORKOUT PLAN ================= */}
          {activeTab === "workout" && (
            <div className="space-y-6">
              <div className="bg-linear-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-purple-400 mb-4">
                  Weekly Workout Schedule
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-gray-400 text-sm mb-1">Level</p>
                    <p className="text-md font-bold text-purple-400">
                      {workoutPlan.level}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {workoutPlan.days.map((day, index) => (
                  <div
                    key={index}
                    className="bg-linear-to-br from-white/10 to-white/5 border border-white/20 hover:border-purple-500/50 rounded-xl p-6 transition duration-300"
                  >
                    <h3 className="text-2xl font-bold text-purple-300 mb-1">
                      {day.dayName}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Focus :
                      <span className="text-blue-400 font-semibold ml-2">
                        {day.focus}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserPlan;
