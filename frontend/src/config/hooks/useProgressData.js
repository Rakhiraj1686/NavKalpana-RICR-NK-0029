import { useCallback, useEffect, useState } from "react";
import {
  getProgressDashboard,
  getProgressOverviewGraph,
  logWeight,
  logWorkout,
} from "../progressApi"

const initialDashboard = {
  goal: { progressPercent: 0, currentWeight: null, targetWeight: null },
  streak: { currentStreakDays: 0, longestStreakDays: 0 },
  insight: { summary: "No insight yet", riskFlags: [] },
  badges: [],
  weekly: [],
  monthly: [],
  weightHistory: [],
};

export const useProgressData = () => {
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const [dashboardData, overviewGraph] = await Promise.all([
        getProgressDashboard(),
        getProgressOverviewGraph(),
      ]);

      // Calculate streak from graphData (workout history)
      let currentStreak = 0;
      let longestStreak = 0;
      let tempStreak = 0;

      if (overviewGraph && overviewGraph.length > 0) {
        for (let i = overviewGraph.length - 1; i >= 0; i--) {
          if (overviewGraph[i].workout > 0) {
            tempStreak++;
            if (i === overviewGraph.length - 1) {
              currentStreak = tempStreak;
            }
          } else {
            if (tempStreak > longestStreak) {
              longestStreak = tempStreak;
            }
            tempStreak = 0;
          }
        }

        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
      }

      // Merge calculated streak with dashboard data
      const updatedDashboard = {
        ...(dashboardData || initialDashboard),
        streak: {
          currentStreakDays: currentStreak,
          longestStreakDays: longestStreak,
        },
      };

      setDashboard(updatedDashboard);
      setGraphData(overviewGraph);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load progress dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const submitDailyProgress = async ({ weightKg, workoutStatus = "completed" }) => {
    try {
      setSaving(true);
      setError("");

      if (weightKg !== undefined && weightKg !== null && weightKg !== "") {
        await logWeight({
          date: new Date().toISOString(),
          weightKg: Number(weightKg),
        });
      }

      if (workoutStatus) {
        await logWorkout({
          status: workoutStatus,
          scheduledDate: new Date().toISOString(),
          planWorkoutId: `manual-${Date.now()}`,
        });
      }

      await load();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save progress");
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return {
    dashboard,
    graphData,
    loading,
    saving,
    error,
    reload: load,
    submitDailyProgress,
  };
};
