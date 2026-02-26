import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../config/Api";
import toast from "react-hot-toast";

/* ---- FITNESS MOTIVATIONAL QUOTES ---- */
const fitnessQuotes = [
  "Your body can do it. It’s your mind you must convince.",
  "Consistency is your best workout partner.",
  "Health is built daily, not overnight.",
  "Progress over perfection.",
  "Strong habits create strong bodies.",
  "Push yourself because no one else will.",
  "Small steps lead to big results.",
  "Discipline today, strength tomorrow.",
  "A little progress each day adds up.",
  "Take care of your body — it’s the only place you live."
];

const UserOverview = () => {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState(null);
  const [streak, setStreak] = useState(null);
  const [goalData, setGoalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState("");

  /* ---- RANDOM QUOTE EFFECT ---- */
  useEffect(() => {
    const getQuote = () => {
      const random =
        fitnessQuotes[Math.floor(Math.random() * fitnessQuotes.length)];
      setQuote(random);
    };

    getQuote();
    const interval = setInterval(getQuote, 10000);
    return () => clearInterval(interval);
  }, []);

  const effectiveCalorieTarget = useMemo(() => {
    const profileCalories = Number(user?.aiPlan?.calories);
    if (Number.isFinite(profileCalories) && profileCalories > 0) {
      return profileCalories;
    }
    return goalData?.calorieTarget || 2000;
  }, [user?.aiPlan?.calories, goalData?.calorieTarget]);

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

        const profileCalories = Number(user?.aiPlan?.calories);
        const calorieTarget =
          Number.isFinite(profileCalories) && profileCalories > 0
            ? profileCalories
            : goalFetched?.calorieTarget || 2000;
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
            caloriesIn: Math.round(((latest.diet || 0) / 100) * calorieTarget),
            proteinTarget: user?.aiPlan?.macros?.protein || 0,
            adherenceScore: latest.habit || 0,
          });

          let current = 0;
          let longest = 0;
          let temp = 0;

          for (let i = 0; i < graphData.length; i++) {
            if (graphData[i].workout > 0) {
              temp++;
              longest = Math.max(longest, temp);
            } else temp = 0;
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
  }, [user?.profileCompleted, user?.aiPlan?.calories]);

  /* ---- HELPERS ---- */

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

    const diff = effectiveCalorieTarget - progressData.caloriesIn;

    if (diff > 0)
      return `${diff} kcal remaining. Protein Target: ${progressData.proteinTarget}g`;
    if (diff < 0)
      return `${Math.abs(diff)} kcal over target! Protein Target: ${progressData.proteinTarget}g`;

    return `Perfect! Target met. Protein Target: ${progressData.proteinTarget}g`;
  };

  const getStreakColor = (days) => {
    if (!days) return "gray";
    if (days >= 14) return "green";
    if (days >= 7) return "yellow";
    return "red";
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading your dashboard...
      </div>
    );

  return (
    <div className="min-h-screen text-white pb-20 md:py-8 md:px-6">
      {user?.profileCompleted ? (
        <main className="md:max-w-7xl mx-auto">
          {/* HEADER + MOTIVATION */}
          <div className="mb-8 space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold">
              Welcome back, {user?.fullName?.split(" ")[0]} 👋
            </h1>

            <div className="bg-linear-to-r from-purple-600/20 to-pink-600/20 
            border border-white/10 backdrop-blur-xl p-4 rounded-xl">
              <p className="italic text-gray-300"> {quote}</p>
            </div>
          </div>

          {/* STATS */}
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
              subtitle={`Target: ${effectiveCalorieTarget}`}
              color="blue"
              icon="🍽️"
            />

            <Stat
              title="Target Workouts"
              value={`${goalData?.workoutsPerWeek || 5}/week`}
              subtitle={`${progressData?.workoutsCompleted || 0} completed`}
              color="purple"
              icon="💪"
            />

            <Stat
              title="Habit Adherence"
              value={`${progressData?.adherenceScore || 0}%`}
              subtitle="Keep consistency!"
              color="green"
              icon="✅"
            />
          </div>

          {/* CARDS */}
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
              target={effectiveCalorieTarget}
            />
          </div>
        </main>
      ) : (
        <div className="text-center text-gray-400">
          Please complete your profile to unlock dashboard.
        </div>
      )}
    </div>
  );
};

export default UserOverview;

/* ---------- SMALL COMPONENTS ---------- */

const Stat = ({ title, value, subtitle, color, icon }) => {
  const colors = {
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

      <p className={`text-3xl font-bold ${colors[color]}`}>
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
            style={{ width: `${planned ? (completed / planned) * 100 : 0}%` }}
          />
        </div>
      </>
    )}

    {calories !== undefined && (
      <>
        <div className="flex justify-between text-xs text-gray-400 mb-2 mt-4">
          <span>Calories</span>
          <span>{calories}/{target}</span>
        </div>

        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{
              width: `${target ? Math.min((calories / target) * 100, 100) : 0}%`,
            }}
          />
        </div>
      </>
    )}
  </div>
);