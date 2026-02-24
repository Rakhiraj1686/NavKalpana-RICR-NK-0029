import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useProgressData } from "../../modules/progress/hooks/useProgressData";
import ProgressSummaryCards from "../../modules/progress/components/ProgressSummaryCards";
import InsightPanel from "../../modules/progress/components/InsightPanel";
import BadgeShelf from "../../modules/progress/components/BadgeShelf";

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
    <div className="bg-white/5 p-6 rounded-2xl mt-8 mb-14">
      <h2 className="text-xl font-bold mb-6 text-white">
        AI User Progress Dashboard
      </h2>

      {error && <p className="mb-4 text-sm text-red-300">{error}</p>}

      <ProgressSummaryCards dashboard={dashboard} />
      <InsightPanel insight={dashboard?.insight} />

      <form onSubmit={handleSave} className="grid md:grid-cols-3 gap-4 mb-8 bg-white/5 border border-white/10 rounded-xl p-4">
        <label className="text-sm text-gray-200 flex flex-col gap-2">
          Current Weight (kg)
          <input
            type="number"
            step="0.1"
            min="20"
            max="400"
            name="weightKg"
            value={formData.weightKg}
            onChange={handleChange}
            className="bg-[#0F172A] border border-white/10 rounded-md px-3 py-2"
          />
        </label>

        <label className="text-sm text-gray-200 flex flex-col gap-2">
          Workout Status
          <select
            name="workoutStatus"
            value={formData.workoutStatus}
            onChange={handleChange}
            className="bg-[#0F172A] border border-white/10 rounded-md px-3 py-2"
          >
            <option value="completed">Completed</option>
            <option value="missed">Missed</option>
            <option value="skipped">Skipped</option>
            <option value="rest">Rest Day</option>
          </select>
        </label>

        <div className="md:col-span-3 flex items-center justify-between mt-1">
          <p className="text-gray-300 text-sm">Current week starts: {weekLabel}</p>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-purple-500 to-blue-500 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Daily Progress"}
          </button>
        </div>
      </form>

      <div className="mb-8">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="week" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="workout" stroke="#8b5cf6" strokeWidth={3} />
          <Line type="monotone" dataKey="diet" stroke="#3b82f6" strokeWidth={3} />
          <Line type="monotone" dataKey="habit" stroke="#10b981" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
      </div>

      <BadgeShelf badges={dashboard?.badges || []} />

      {!loading && graphData.length === 0 && (
        <p className="text-sm text-gray-400 mt-4">
          No progress points yet. Save daily progress to build your weekly graph.
        </p>
      )}
    </div>
  );
};

export default ProgressGraph;