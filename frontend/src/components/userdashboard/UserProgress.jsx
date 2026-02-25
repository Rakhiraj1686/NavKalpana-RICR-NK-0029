import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useProgressData } from "../../config/hooks/useProgressData.js";
import { useAuth } from "../../context/AuthContext";
import ProgressSummaryCards from "../ProgressSummaryCards.jsx";
import InsightPanel from "../InsightPanel.jsx";
import BadgeShelf from "../BadgeShelf.jsx";

const getWeekLabel = () => {
  const current = new Date();
  const day = current.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const weekStart = new Date(current);
  weekStart.setDate(current.getDate() + diffToMonday);

  return weekStart.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const ProgressGraph = () => {
  const { user } = useAuth();
  const { dashboard, graphData, loading, saving, error, submitDailyProgress } =
    useProgressData();

  const [formData, setFormData] = useState({
    weightKg: "",
    workoutStatus: "completed",
    caloriesIn: "",
    dietAdherencePercent: "",
    energyLevel: "normal",
    waistCm: "",
    chestCm: "",
    hipsCm: "",
    armsCm: "",
    thighsCm: "",
  });

  const weekLabel = useMemo(() => getWeekLabel(), []);

  // Get calorie and habit targets from goal data
  const profileCalories = Number(user?.aiPlan?.calories);
  const calorieTarget =
    Number.isFinite(profileCalories) && profileCalories > 0
      ? profileCalories
      : dashboard?.goal?.calorieTarget || dashboard?.targetCalories || 2000;
  const workoutsPerWeek = dashboard?.goal?.workoutsPerWeek || 5;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      await submitDailyProgress({
        weightKg: formData.weightKg,
        workoutStatus: formData.workoutStatus,
        caloriesIn: formData.caloriesIn,
        dietAdherencePercent: formData.dietAdherencePercent,
        energyLevel: formData.energyLevel,
        waistCm: formData.waistCm,
        chestCm: formData.chestCm,
        hipsCm: formData.hipsCm,
        armsCm: formData.armsCm,
        thighsCm: formData.thighsCm,
      });
      setFormData((prev) => ({
        ...prev,
        weightKg: "",
        caloriesIn: "",
        dietAdherencePercent: "",
        waistCm: "",
        chestCm: "",
        hipsCm: "",
        armsCm: "",
        thighsCm: "",
      }));
      toast.success("Daily progress saved successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save progress");
    }
  };

  return (
    <div className="w-full bg-white/5 p-4 sm:p-6 rounded-2xl mt-6 sm:mt-8 mb-12 sm:mb-14 min-h-screen">
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white">
        AI User Progress Dashboard
      </h2>

      {error && <p className="mb-4 text-xs sm:text-sm text-red-300">{error}</p>}

      <ProgressSummaryCards dashboard={dashboard} calorieTarget={calorieTarget} />

      {/* Calorie and Habit Targets Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 sm:mb-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Daily Calorie Target</p>
              <p className="text-3xl font-bold text-blue-400 mt-2">
                {calorieTarget} kcal
              </p>
              <p className="text-xs text-gray-300 mt-2">
                Track your daily intake to stay on target
              </p>
            </div>
            <span className="text-4xl">🍽️</span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Weekly Workout Target</p>
              <p className="text-3xl font-bold text-purple-400 mt-2">
                {workoutsPerWeek} workouts
              </p>
              <p className="text-xs text-gray-300 mt-2">
                Complete all workouts to build consistency
              </p>
            </div>
            <span className="text-4xl">💪</span>
          </div>
        </div>
      </div>

      <InsightPanel insight={dashboard?.insight} />

      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4"
      >
        <label className="text-xs sm:text-sm text-gray-200 flex flex-col gap-2">
          Current Weight (kg)
          <input
            type="number"
            step="0.1"
            min="20"
            max="400"
            name="weightKg"
            value={formData.weightKg}
            onChange={handleChange}
            className="bg-[#0F172A] border border-white/10 rounded-md px-2 sm:px-3 py-2 text-sm"
          />
        </label>

        <label className="text-xs sm:text-sm text-gray-200 flex flex-col gap-2">
          Workout Status
          <select
            name="workoutStatus"
            value={formData.workoutStatus}
            onChange={handleChange}
            className="bg-[#0F172A] border border-white/10 rounded-md px-2 sm:px-3 py-2 text-sm"
          >
            <option value="completed">Completed</option>
            <option value="missed">Missed</option>
            <option value="skipped">Skipped</option>
            <option value="rest">Rest Day</option>
          </select>
        </label>

        <label className="text-xs sm:text-sm text-gray-200 flex flex-col gap-2">
          Calories Intake (kcal)
          <input
            type="number"
            min="0"
            name="caloriesIn"
            value={formData.caloriesIn}
            onChange={handleChange}
            className="bg-[#0F172A] border border-white/10 rounded-md px-2 sm:px-3 py-2 text-sm"
          />
        </label>

        <label className="text-xs sm:text-sm text-gray-200 flex flex-col gap-2">
          Diet Adherence (%)
          <input
            type="number"
            min="0"
            max="100"
            name="dietAdherencePercent"
            value={formData.dietAdherencePercent}
            onChange={handleChange}
            className="bg-[#0F172A] border border-white/10 rounded-md px-2 sm:px-3 py-2 text-sm"
          />
        </label>

        <label className="text-xs sm:text-sm text-gray-200 flex flex-col gap-2">
          Energy Level
          <select
            name="energyLevel"
            value={formData.energyLevel}
            onChange={handleChange}
            className="bg-[#0F172A] border border-white/10 rounded-md px-2 sm:px-3 py-2 text-sm"
          >
            <option value="energized">Energized</option>
            <option value="normal">Normal</option>
            <option value="slightly_fatigued">Slightly Fatigued</option>
            <option value="very_tired">Very Tired</option>
          </select>
        </label>

        <label className="text-xs sm:text-sm text-gray-200 flex flex-col gap-2">
          Waist (cm)
          <input
            type="number"
            min="0"
            name="waistCm"
            value={formData.waistCm}
            onChange={handleChange}
            className="bg-[#0F172A] border border-white/10 rounded-md px-2 sm:px-3 py-2 text-sm"
          />
        </label>

        <label className="text-xs sm:text-sm text-gray-200 flex flex-col gap-2">
          Chest (cm)
          <input
            type="number"
            min="0"
            name="chestCm"
            value={formData.chestCm}
            onChange={handleChange}
            className="bg-[#0F172A] border border-white/10 rounded-md px-2 sm:px-3 py-2 text-sm"
          />
        </label>

        <label className="text-xs sm:text-sm text-gray-200 flex flex-col gap-2">
          Hips (cm)
          <input
            type="number"
            min="0"
            name="hipsCm"
            value={formData.hipsCm}
            onChange={handleChange}
            className="bg-[#0F172A] border border-white/10 rounded-md px-2 sm:px-3 py-2 text-sm"
          />
        </label>

        <label className="text-xs sm:text-sm text-gray-200 flex flex-col gap-2">
          Arms (cm)
          <input
            type="number"
            min="0"
            name="armsCm"
            value={formData.armsCm}
            onChange={handleChange}
            className="bg-[#0F172A] border border-white/10 rounded-md px-2 sm:px-3 py-2 text-sm"
          />
        </label>

        <label className="text-xs sm:text-sm text-gray-200 flex flex-col gap-2">
          Thighs (cm)
          <input
            type="number"
            min="0"
            name="thighsCm"
            value={formData.thighsCm}
            onChange={handleChange}
            className="bg-[#0F172A] border border-white/10 rounded-md px-2 sm:px-3 py-2 text-sm"
          />
        </label>

        <div className="sm:col-span-2 lg:col-span-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mt-3 sm:mt-0">
          <p className="text-gray-300 text-xs sm:text-sm">
            Week starts: {weekLabel}
          </p>
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-lg bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {saving ? "Saving..." : "Save Daily Progress"}
          </button>
        </div>
      </form>

      <div className="mb-6 sm:mb-8 overflow-x-auto">
        <h3 className="text-xs sm:text-sm text-gray-300 mb-2 sm:mb-4">
          Daily Progress Tracking
        </h3>
        <div className="min-h-62.5 sm:min-h-75">
          <ResponsiveContainer width="100%" height={250} minWidth={300}>
            <AreaChart
              data={graphData}
              margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
            >
              <defs>
                <linearGradient
                  id="workoutGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="dietGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="habitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis
                dataKey="week"
                stroke="#ccc"
                tick={{ fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="#ccc"
                domain={[0, 100]}
                tick={{ fontSize: 11 }}
                width={40}
              />
              <Tooltip
                formatter={(value) => `${value}%`}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{
                  backgroundColor: "#0F172A",
                  border: "1px solid #444",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px", fontSize: "12px" }} />

              <Area
                type="monotone"
                dataKey="workout"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#workoutGradient)"
                name="Workout Adherence"
                connectNulls
                isAnimationActive={true}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="diet"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#dietGradient)"
                name="Diet Adherence"
                connectNulls
                isAnimationActive={true}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="habit"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#habitGradient)"
                name="Habit Score"
                connectNulls
                isAnimationActive={true}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <BadgeShelf badges={dashboard?.badges || []} />

      {!loading && graphData.length === 0 && (
        <p className="text-xs sm:text-sm text-gray-400 mt-4">
          No progress points yet. Save daily progress to build your graph.
        </p>
      )}
    </div>
  );
};

export default ProgressGraph;
