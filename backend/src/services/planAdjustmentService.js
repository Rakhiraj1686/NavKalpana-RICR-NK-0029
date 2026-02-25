import DailyProgress from "../models/DailyProgress.js";
import User from "../models/userProfileModel.js";
import { getWeekKey, normalizeDate } from "../utils/progressUtils.js";

export const evaluateWeeklyProgress = async (userId) => {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const fourteenDaysAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);

  const thisWeek = await DailyProgress.find({
    user: userId,
    date: { $gte: sevenDaysAgo, $lte: today },
  }).select("weightKg workoutAdherencePercent dietAdherencePercent workoutsCompleted workoutsPlanned");

  const prevWeek = await DailyProgress.find({
    user: userId,
    date: { $gte: fourteenDaysAgo, $lt: sevenDaysAgo },
  }).select("weightKg");

  if (thisWeek.length === 0) {
    return null;
  }

  // Extract first and last weight of each week
  const thisWeekWeights = thisWeek
    .filter((d) => d.weightKg)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const prevWeekWeights = prevWeek
    .filter((d) => d.weightKg)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const thisWeekStart = thisWeekWeights[0]?.weightKg;
  const thisWeekEnd = thisWeekWeights[thisWeekWeights.length - 1]?.weightKg;
  const prevWeekStart = prevWeekWeights[0]?.weightKg;
  const prevWeekEnd = prevWeekWeights[prevWeekWeights.length - 1]?.weightKg;

  const weeklyWeightChange = thisWeekStart && thisWeekEnd ? thisWeekEnd - thisWeekStart : null;
  const avgAdherence = thisWeek.length
    ? thisWeek.reduce((sum, d) => sum + (d.dietAdherencePercent || 0), 0) / thisWeek.length
    : 0;

  const workoutCompletion = thisWeek.length
    ? thisWeek.reduce((sum, d) => sum + (d.workoutsCompleted || 0), 0) /
      Math.max(thisWeek.reduce((sum, d) => sum + (d.workoutsPlanned || 0), 0), 1)
    : 0;

  return {
    weeklyWeightChange,
    avgAdherence: Number(avgAdherence.toFixed(2)),
    workoutCompletion: Number((workoutCompletion * 100).toFixed(2)),
    dataPoints: thisWeek.length,
    hasHistoricalData: !!(prevWeekStart && prevWeekEnd),
    prevWeekWeightChange: prevWeekStart && prevWeekEnd ? prevWeekEnd - prevWeekStart : null,
  };
};

export const calculatePlanAdjustments = (weeklyMetrics, user) => {
  const defaultReturn = {
    adjustments: { calorieAdjust: 0, workoutAdjust: 0, triggers: [] },
    triggers: [],
  };
  
  if (!weeklyMetrics || weeklyMetrics.dataPoints < 3) {
    return defaultReturn;
  }

  const adjustments = [];
  const goal = String(user.goal || user.primaryGoal || "maintain").toLowerCase();
  const currentCalories = Number(user.targetCalories) || Number(user.calorieTarget) || 1800;
  const currentWorkouts = Number(user.workoutsPerWeek) || 5;

  // --- WEIGHT LOSS ADJUSTMENTS ---
  if (goal.includes("weight") && goal.includes("loss")) {
    if (weeklyMetrics.weeklyWeightChange === null) {
      adjustments.push({
        trigger: "no_weight_data",
        message: "Log weight regularly to enable plan adjustments",
        calorieAdjust: 0,
        workoutAdjust: 0,
      });
    } else if (weeklyMetrics.weeklyWeightChange < -1.0) {
      // Losing too much, reduce deficit (safety)
      adjustments.push({
        trigger: "excessive_loss",
        message: "Weight loss > 1 kg/week detected. Reducing calorie deficit for safety.",
        calorieAdjust: 150,
        workoutAdjust: 0,
      });
    } else if (weeklyMetrics.weeklyWeightChange < -0.3 && weeklyMetrics.weeklyWeightChange >= -1.0) {
      // Good progress, maintain
      adjustments.push({
        trigger: "optimal_loss",
        message: "Weight loss on track (0.3–1 kg/week). Keep current plan.",
        calorieAdjust: 0,
        workoutAdjust: 0,
      });
    } else if (weeklyMetrics.weeklyWeightChange >= -0.3 && weeklyMetrics.weeklyWeightChange < 0) {
      // Slow loss, increase deficit slightly
      adjustments.push({
        trigger: "slow_loss",
        message: "Weight loss < 0.3 kg/week. Slightly increasing deficit.",
        calorieAdjust: -100,
        workoutAdjust: 0,
      });
    } else if (weeklyMetrics.weeklyWeightChange >= 0) {
      // No loss or gain, increase deficit more
      adjustments.push({
        trigger: "no_progress",
        message: "No weight loss detected. Increasing calorie deficit significantly.",
        calorieAdjust: -200,
        workoutAdjust: 1,
      });
    }
  }

  // --- MUSCLE GAIN ADJUSTMENTS ---
  if (goal.includes("muscle") && goal.includes("gain")) {
    if (weeklyMetrics.weeklyWeightChange === null) {
      adjustments.push({
        trigger: "no_weight_data",
        message: "Log weight regularly to monitor muscle gain progress",
        calorieAdjust: 0,
        workoutAdjust: 0,
      });
    } else if (weeklyMetrics.weeklyWeightChange > 0.5) {
      // Good muscle gain trend
      adjustments.push({
        trigger: "gaining",
        message: "Positive weight trend detected. Continue current plan.",
        calorieAdjust: 0,
        workoutAdjust: 0,
      });
    } else if (weeklyMetrics.weeklyWeightChange <= 0.5 && weeklyMetrics.weeklyWeightChange >= 0) {
      // Stagnant or slow gains
      adjustments.push({
        trigger: "stagnant_gain",
        message: "Muscle gain stagnant. Increasing volume and calories.",
        calorieAdjust: 150,
        workoutAdjust: 1,
      });
    } else {
      // Losing weight, increase calories
      adjustments.push({
        trigger: "losing_on_gain",
        message: "Weight loss during muscle gain phase. Increasing calorie surplus.",
        calorieAdjust: 250,
        workoutAdjust: 1,
      });
    }
  }

  // --- ADHERENCE-BASED ADJUSTMENTS ---
  if (weeklyMetrics.avgAdherence < 50 && weeklyMetrics.workoutCompletion < 50) {
    adjustments.push({
      trigger: "low_adherence",
      message: "Low adherence (< 50%). Simplifying plan: fewer, easier workouts.",
      calorieAdjust: 0,
      workoutAdjust: -2,
      simplifyWorkouts: true,
    });
  } else if (weeklyMetrics.avgAdherence < 60) {
    adjustments.push({
      trigger: "moderate_adherence",
      message: "Moderate adherence (< 60%). Adding flexibility and reducing complexity.",
      calorieAdjust: 0,
      workoutAdjust: -1,
      simplifyWorkouts: true,
    });
  } else if (weeklyMetrics.avgAdherence >= 80 && weeklyMetrics.workoutCompletion >= 75) {
    adjustments.push({
      trigger: "high_adherence",
      message: "Excellent adherence (≥ 80%)! Increasing intensity for faster results.",
      calorieAdjust: goal.includes("loss") ? -50 : 75,
      workoutAdjust: 1,
    });
  }

  // Consolidate adjustments
  const consolidated = {
    calorieAdjust: adjustments.reduce((sum, a) => sum + a.calorieAdjust, 0),
    workoutAdjust: adjustments.reduce((sum, a) => sum + a.workoutAdjust, 0),
    simplifyWorkouts: adjustments.some((a) => a.simplifyWorkouts),
    triggers: adjustments.map((a) => ({
      trigger: a.trigger,
      message: a.message,
    })),
  };

  return {
    adjustments: consolidated,
    triggers: consolidated.triggers,
  };
};

export const applyPlanAdjustments = (user, adjustments) => {
  if (!adjustments || (!adjustments.calorieAdjust && !adjustments.workoutAdjust)) {
    return user;
  }

  const updatedUser = { ...user.toObject ? user.toObject() : user };

  // Adjust calories (with safety bounds)
  if (adjustments.calorieAdjust !== 0) {
    const currentCalories = Number(updatedUser.targetCalories) || Number(updatedUser.calorieTarget) || 1800;
    updatedUser.targetCalories = Math.max(1200, Math.min(3500, currentCalories + adjustments.calorieAdjust));
  }

  // Adjust workouts (with safety bounds)
  if (adjustments.workoutAdjust !== 0) {
    const currentWorkouts = Number(updatedUser.workoutsPerWeek) || 5;
    updatedUser.workoutsPerWeek = Math.max(3, Math.min(7, currentWorkouts + adjustments.workoutAdjust));
  }

  updatedUser.lastPlanAdjustment = {
    appliedAt: new Date(),
    adjustments,
    simplifyWorkouts: adjustments.simplifyWorkouts || false,
  };

  return updatedUser;
};
