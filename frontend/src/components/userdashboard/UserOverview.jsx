import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../config/Api";
import toast from "react-hot-toast";

const UserOverview = () => {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState(null);
  const [streak, setStreak] = useState(null);
  const [goalData, setGoalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.profileCompleted) {
      setLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [progressRes, goalRes] = await Promise.all([
          axiosInstance.get("/user/progress-graph"),
          axiosInstance.get("/user/goal"),
        ]);

        const graphData = progressRes?.data?.graphData || [];
        const goalFetched = goalRes?.data?.data || {};

        setGoalData(goalFetched);

        const calorieTarget = goalFetched?.calorieTarget || 2000;
        const workoutsPlanned = goalFetched?.workoutsPerWeek || 5;

        if (graphData.length > 0) {
          const latest = graphData[graphData.length - 1];

          const workoutPercent = latest.workout || 0;
          const workoutsCompleted = Math.round(
            (workoutPercent / 100) * workoutsPlanned
          );

          setProgressData({
            workoutsCompleted,
            workoutsPlanned,
            caloriesIn: Math.round(
              ((latest.diet || 0) / 100) * calorieTarget
            ),
            proteinTarget: Math.round((calorieTarget * 0.25) / 4),
            adherenceScore: latest.habit || 0,
          });

          // ---- STREAK CALCULATION ----
          let current = 0;
          let longest = 0;
          let temp = 0;

          for (let i = 0; i < graphData.length; i++) {
            if (graphData[i].workout > 0) {
              temp++;
              longest = Math.max(longest, temp);
            } else {
              temp = 0;
            }
          }

          for (let i = graphData.length - 1; i >= 0; i--) {
            if (graphData[i].workout > 0) current++;
            else break;
          }

          setStreak({
            currentStreakDays: current,
            longestStreakDays: longest,
          });
        } else {
          setProgressData({
            workoutsCompleted: 0,
            workoutsPlanned,
            caloriesIn: 0,
            proteinTarget: 0,
            adherenceScore: 0,
          });
          setStreak({
            currentStreakDays: 0,
            longestStreakDays: 0,
          });
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.profileCompleted]);

  // ---- GOAL PROGRESS ----
  const goalPercent = useMemo(() => {
    if (
      !goalData?.initialWeight ||
      !goalData?.currentWeight ||
      !goalData?.goalWeight
    )
      return 0;

    const { initialWeight, currentWeight, goalWeight, primaryGoal } = goalData;

    if (primaryGoal === "weight_loss") {
      const total = initialWeight - goalWeight;
      const covered = initialWeight - currentWeight;
      if (total <= 0) return 0;
      return Math.min(100, Math.max(0, Math.round((covered / total) * 100)));
    }

    if (primaryGoal === "muscle_gain") {
      const total = goalWeight - initialWeight;
      const covered = currentWeight - initialWeight;
      if (total <= 0) return 0;
      return Math.min(100, Math.max(0, Math.round((covered / total) * 100)));
    }

    return 50;
  }, [goalData]);

  const getWorkoutStatus = () => {
    if (!progressData?.workoutsCompleted)
      return "No workouts completed yet. Start today 💪";
    return `${progressData.workoutsCompleted} of ${progressData.workoutsPlanned} workouts completed.`;
  };

  const getNutritionStatus = () => {
    if (!progressData?.caloriesIn)
      return "Log meals to track your nutrition.";
    const target = goalData?.calorieTarget || 2000;
    const remaining = Math.max(0, target - progressData.caloriesIn);
    return `${remaining} kcal remaining. Protein Target: ${progressData.proteinTarget}g`;
  };

  const getStreakColor = (days) => {
    if (!days) return "gray";
    if (days >= 14) return "green";
    if (days >= 7) return "yellow";
    return "red";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white pb-20 md:py-8 md:px-6">
      {user?.profileCompleted ? (
        <main className="md:max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold md:text-4xl md:font-bold">
              Welcome back, {user?.fullName?.split(" ")[0]} 👋
            </h1>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Stat
              title="Workout Streak"
              value={`${streak?.currentStreakDays || 0} Days`}
              subtitle={`Best: ${streak?.longestStreakDays || 0} days`}
              color={getStreakColor(streak?.currentStreakDays)}
              icon="🔥"
            />
            <Stat
              title="Calories Today"
              value={`${progressData?.caloriesIn || 0} kcal`}
              subtitle={`Target: ${goalData?.calorieTarget || 2000}`}
              color="blue"
              icon="🍽️"
            />
            <Stat
              title="Goal Progress"
              value={`${goalPercent}%`}
              subtitle={`${goalData?.primaryGoal?.replace(/_/g, " ")}`}
              color={goalPercent >= 60 ? "green" : "yellow"}
              icon="🎯"
            />
            <Stat
              title="Habit Adherence"
              value={`${progressData?.adherenceScore || 0}%`}
              subtitle={`${progressData?.workoutsCompleted || 0} workouts`}
              color={progressData?.adherenceScore >= 75 ? "green" : "yellow"}
              icon="✅"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard
              title="🏋️ Today's Workout"
              desc={getWorkoutStatus()}
              planned={progressData?.workoutsPlanned}
              completed={progressData?.workoutsCompleted}
            />
            <GlassCard
              title="🥗 Nutrition Summary"
              desc={getNutritionStatus()}
              calories={progressData?.caloriesIn}
              target={goalData?.calorieTarget || 2000}
            />
          </div>
        </main>
      ) : (
        <div className="text-center text-gray-400">
          Please complete your profile to unlock your dashboard.
        </div>
      )}
    </div>
  );
};

export default UserOverview;

/* ---------- SMALL COMPONENTS ---------- */

const Stat = ({ title, value, subtitle, color, icon }) => {
  const colorClasses = {
    purple: "text-purple-400",
    blue: "text-blue-400",
    green: "text-green-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
    gray: "text-gray-400",
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow">
      <div className="flex justify-between mb-3">
        <h3 className="text-gray-400 text-sm">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className={`text-3xl font-bold ${colorClasses[color] || "text-blue-400"}`}>
        {value}
      </p>
      {subtitle && <p className="text-gray-500 text-xs mt-2">{subtitle}</p>}
    </div>
  );
};

const GlassCard = ({ title, desc, planned, completed, calories, target }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <p className="text-gray-300 text-sm mb-4">{desc}</p>

    {planned !== undefined && (
      <>
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Progress</span>
          <span>{completed}/{planned}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full"
            style={{ width: `${planned > 0 ? (completed / planned) * 100 : 0}%` }}
          />
        </div>
      </>
    )}

    {calories !== undefined && (
      <>
        <div className="flex justify-between text-xs text-gray-400 mb-2 mt-4">
          <span>Calorie Intake</span>
          <span>{calories}/{target}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${target > 0 ? Math.min((calories / target) * 100, 100) : 0}%` }}
          />
        </div>
      </>
    )}
  </div>
);