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
  const { dashboard, graphData, loading, saving, error, submitDailyProgress } =
    useProgressData();

  const [formData, setFormData] = useState({
    weightKg: "",
    workoutStatus: "completed",
  });

  const weekLabel = useMemo(() => getWeekLabel(), []);

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
      });
      setFormData((prev) => ({ ...prev, weightKg: "" }));
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

      <ProgressSummaryCards dashboard={dashboard} />
      <InsightPanel insight={dashboard?.insight} />

      <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
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

        <div className="sm:col-span-2 lg:col-span-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mt-3 sm:mt-0">
          <p className="text-gray-300 text-xs sm:text-sm">Week starts: {weekLabel}</p>
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
        <h3 className="text-xs sm:text-sm text-gray-300 mb-2 sm:mb-4">Daily Progress Tracking</h3>
        <div className="min-h-62.5 sm:min-h-75">
          <ResponsiveContainer width="100%" height={250} minWidth={300}>
            <AreaChart data={graphData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
              <defs>
                <linearGradient id="workoutGradient" x1="0" y1="0" x2="0" y2="1">
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
                contentStyle={{ backgroundColor: "#0F172A", border: "1px solid #444", borderRadius: "8px", fontSize: "12px" }}
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