import DailyProgress from "../models/DailyProgress.js";
import WorkoutLog from "../models/WorkoutLog.js";
import StreakState from "../models/StreakState.js";
import ProgressAggregate from "../models/ProgressAggregate.js";
import AllInsight from "../models/AllInsight.js";
import { UserBadge } from "../models/Badge.js";
import User from "../models/userProfileModel.js";
import {
  clampPercent,
  normalizeDate,
  getWeekKey,
  getMonthKey,
  daysBetween,
  calculateGoalProgressPercent,
  detectPlateau,
} from "../utils/progressUtils.js";

const BADGE_CODES = {
  STREAK_7: "STREAK_7",
  STREAK_30: "STREAK_30",
  CONSISTENT_4_WEEKS: "CONSISTENT_4_WEEKS",
};

const evaluateAdherence = ({ workoutsPlanned = 0, workoutsCompleted = 0 }) => {
  if (!workoutsPlanned) return 0;
  return clampPercent((workoutsCompleted / workoutsPlanned) * 100);
};

const ensureBadge = async (userId, badgeCode) => {
  await UserBadge.updateOne(
    { user: userId, badgeCode },
    { $setOnInsert: { earnedAt: new Date() } },
    { upsert: true },
  );
};

export const logWeight = async ({ userId, date, timezone, goalType, weightKg }) => {
  const normalizedDate = normalizeDate(date);

  const progress = await DailyProgress.findOneAndUpdate(
    { user: userId, date: normalizedDate },
    {
      $set: {
        timezone: timezone || "UTC",
        goalType: goalType || "maintenance",
        weightKg: Number(weightKg),
        weekKey: getWeekKey(normalizedDate),
        monthKey: getMonthKey(normalizedDate),
      },
      $setOnInsert: {
        workoutsPlanned: 0,
        workoutsCompleted: 0,
      },
    },
    { new: true, upsert: true, runValidators: true },
  );

  return progress;
};

export const trackWorkoutCompletion = async ({
  userId,
  planWorkoutId,
  scheduledDate,
  status,
  durationMin,
  effortRpe,
}) => {
  const day = normalizeDate(scheduledDate || new Date());
  const workoutStatus = status || "completed";

  const workoutLog = await WorkoutLog.create({
    user: userId,
    planWorkoutId: planWorkoutId || `manual-${Date.now()}`,
    scheduledDate: day,
    status: workoutStatus,
    durationMin,
    effortRpe,
    completedAt: workoutStatus === "completed" ? new Date() : null,
  });

  const plannedIncrement = 1;
  const completedIncrement = workoutStatus === "completed" ? 1 : 0;

  const updatedDaily = await DailyProgress.findOneAndUpdate(
    { user: userId, date: day },
    {
      $setOnInsert: {
        weekKey: getWeekKey(day),
        monthKey: getMonthKey(day),
      },
      $inc: {
        workoutsPlanned: plannedIncrement,
        workoutsCompleted: completedIncrement,
      },
    },
    { new: true, upsert: true },
  );

  updatedDaily.adherenceScore = evaluateAdherence({
    workoutsPlanned: updatedDaily.workoutsPlanned,
    workoutsCompleted: updatedDaily.workoutsCompleted,
  });
  await updatedDaily.save();

  const streak = await recomputeStreak(userId, day, workoutStatus);
  await recomputeProgressAggregates(userId, getWeekKey(day), getMonthKey(day));

  return {
    workoutLog,
    streak,
    daily: updatedDaily,
  };
};

export const recomputeStreak = async (userId, activityDate, workoutStatus) => {
  let streak = await StreakState.findOne({ user: userId });
  if (!streak) {
    streak = await StreakState.create({ user: userId });
  }

  const isCompletedWorkout = workoutStatus === "completed";

  if (!isCompletedWorkout) {
    if (streak.freezeTokens > 0) {
      streak.freezeTokens -= 1;
    } else {
      streak.currentStreakDays = 0;
    }
    await streak.save();
    return streak;
  }

  if (!streak.lastActiveDate) {
    streak.currentStreakDays = 1;
  } else {
    const diffDays = daysBetween(streak.lastActiveDate, activityDate);

    if (diffDays <= 1) {
      streak.currentStreakDays += 1;
    } else {
      streak.currentStreakDays = 1;
    }
  }

  streak.lastActiveDate = activityDate;
  streak.longestStreakDays = Math.max(
    streak.longestStreakDays,
    streak.currentStreakDays,
  );

  await streak.save();

  if (streak.currentStreakDays >= 7) {
    await ensureBadge(userId, BADGE_CODES.STREAK_7);
  }
  if (streak.currentStreakDays >= 30) {
    await ensureBadge(userId, BADGE_CODES.STREAK_30);
  }

  return streak;
};

export const getStreak = async (userId) => {
  const streak = await StreakState.findOne({ user: userId });
  return (
    streak || {
      currentStreakDays: 0,
      longestStreakDays: 0,
      freezeTokens: 0,
      lastActiveDate: null,
    }
  );
};

const getLatestWeight = async (userId) => {
  const latest = await DailyProgress.findOne({ user: userId, weightKg: { $exists: true } })
    .sort({ date: -1 })
    .select("weightKg");

  return latest?.weightKg ?? null;
};

export const getGoalProgress = async (userId) => {
  const user = await User.findById(userId).select("weight primaryGoal goalWeight");
  const currentWeight = await getLatestWeight(userId);

  const startWeight = Number(user?.weight);
  const goalWeight = Number(user?.goalWeight);

  let goalType = "maintenance";
  if (user?.primaryGoal === "weight loss") {
    goalType = "weight_loss";
  } else if (user?.primaryGoal === "muscle gain") {
    goalType = "muscle_gain";
  }

  const progressPercent = calculateGoalProgressPercent({
    goalType,
    startWeight,
    targetWeight: goalWeight,
    currentWeight: Number(currentWeight),
  });

  return {
    goalType,
    startWeight,
    currentWeight,
    targetWeight: goalWeight,
    progressPercent: Number(progressPercent.toFixed(2)),
  };
};

export const getWeightHistory = async (userId, days = 90) => {
  const startDate = normalizeDate(new Date(Date.now() - Number(days) * 86400000));

  const rows = await DailyProgress.find({
    user: userId,
    date: { $gte: startDate },
    weightKg: { $exists: true },
  })
    .sort({ date: 1 })
    .select("date weightKg weekKey monthKey");

  return rows;
};

export const generateRuleBasedInsight = async (userId) => {
  const latestWeek = getWeekKey(new Date());
  const weekRows = await DailyProgress.find({ user: userId, weekKey: latestWeek })
    .sort({ date: 1 })
    .select("date workoutsPlanned workoutsCompleted adherenceScore weightKg");

  const completionTotal = weekRows.reduce(
    (acc, row) => {
      acc.planned += row.workoutsPlanned || 0;
      acc.completed += row.workoutsCompleted || 0;
      return acc;
    },
    { planned: 0, completed: 0 },
  );

  const completionRate = completionTotal.planned
    ? (completionTotal.completed / completionTotal.planned) * 100
    : 0;

  const weightSeries = weekRows
    .filter((item) => typeof item.weightKg === "number")
    .map((item) => item.weightKg);

  const plateauSignal = detectPlateau(weightSeries);
  const riskFlags = [];

  if (completionRate < 50) riskFlags.push("low_adherence");
  if (plateauSignal.plateau) riskFlags.push("plateau_risk");

  const summaryParts = [];
  summaryParts.push(`Workout completion is ${completionRate.toFixed(0)}% this week.`);

  if (plateauSignal.plateau) {
    summaryParts.push("Weight trend is flat; consider macro adjustment or training intensity tweak.");
  } else {
    summaryParts.push("Weight trend is showing healthy movement.");
  }

  if (completionRate >= 70) {
    summaryParts.push("Consistency is strong—keep current plan for another week.");
  }

  const summary = summaryParts.join(" ");

  const insight = await AllInsight .findOneAndUpdate(
    { user: userId, weekKey: latestWeek },
    {
      $set: {
        summary,
        riskFlags,
        confidence: 0.72,
        modelVersion: "rule-based-v1",
      },
    },
    { new: true, upsert: true },
  );

  return insight;
};

export const getLatestInsight = async (userId) => {
  const latestInsight = await AllInsight.findOne({ user: userId }).sort({ createdAt: -1 });

  if (latestInsight) return latestInsight;

  return generateRuleBasedInsight(userId);
};

export const recomputeProgressAggregates = async (userId, weekKey, monthKey) => {
  const [weeklyRows, monthlyRows, goalProgress] = await Promise.all([
    DailyProgress.find({ user: userId, weekKey }).select("weightKg workoutsPlanned workoutsCompleted adherenceScore"),
    DailyProgress.find({ user: userId, monthKey }).select("weightKg workoutsPlanned workoutsCompleted adherenceScore"),
    getGoalProgress(userId),
  ]);

  const buildAggregate = (rows) => {
    const weights = rows
      .filter((row) => typeof row.weightKg === "number")
      .map((row) => row.weightKg);

    const totalPlanned = rows.reduce((sum, row) => sum + (row.workoutsPlanned || 0), 0);
    const totalCompleted = rows.reduce((sum, row) => sum + (row.workoutsCompleted || 0), 0);
    const completionRate = totalPlanned
      ? clampPercent((totalCompleted / totalPlanned) * 100)
      : 0;

    const adherenceAvg = rows.length
      ? clampPercent(rows.reduce((sum, row) => sum + (row.adherenceScore || 0), 0) / rows.length)
      : 0;

    const avgWeightKg = weights.length
      ? weights.reduce((sum, value) => sum + value, 0) / weights.length
      : null;

    return {
      avgWeightKg,
      workoutCompletionRate: Number(completionRate.toFixed(2)),
      adherenceAvg: Number(adherenceAvg.toFixed(2)),
      goalProgressPercent: Number(goalProgress.progressPercent.toFixed(2)),
    };
  };

  const weeklyAggregate = buildAggregate(weeklyRows);
  const monthlyAggregate = buildAggregate(monthlyRows);

  await Promise.all([
    ProgressAggregate.findOneAndUpdate(
      { user: userId, periodType: "weekly", periodKey: weekKey },
      { $set: weeklyAggregate },
      { upsert: true, new: true },
    ),
    ProgressAggregate.findOneAndUpdate(
      { user: userId, periodType: "monthly", periodKey: monthKey },
      { $set: monthlyAggregate },
      { upsert: true, new: true },
    ),
  ]);

  if (weeklyAggregate.workoutCompletionRate >= 75) {
    await ensureBadge(userId, BADGE_CODES.CONSISTENT_4_WEEKS);
  }

  return { weeklyAggregate, monthlyAggregate };
};

export const getWeeklyAnalytics = async (userId, limit = 8) => {
  return ProgressAggregate.find({ user: userId, periodType: "weekly" })
    .sort({ periodKey: -1 })
    .limit(Number(limit))
    .lean();
};

export const getMonthlyAnalytics = async (userId, limit = 6) => {
  return ProgressAggregate.find({ user: userId, periodType: "monthly" })
    .sort({ periodKey: -1 })
    .limit(Number(limit))
    .lean();
};

export const getUserBadges = async (userId) => {
  return UserBadge.find({ user: userId }).sort({ earnedAt: -1 }).lean();
};

export const getDashboardSnapshot = async (userId) => {
  const [goal, streak, insight, weekly, monthly, badges, weightHistory] = await Promise.all([
    getGoalProgress(userId),
    getStreak(userId),
    getLatestInsight(userId),
    getWeeklyAnalytics(userId, 8),
    getMonthlyAnalytics(userId, 6),
    getUserBadges(userId),
    getWeightHistory(userId, 90),
  ]);

  return {
    goal,
    streak,
    insight,
    weekly,
    monthly,
    badges,
    weightHistory,
  };
};
