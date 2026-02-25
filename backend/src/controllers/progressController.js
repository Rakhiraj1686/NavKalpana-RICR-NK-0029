import {
  logWeight,
  logDailyCheckIn,
  trackWorkoutCompletion,
  getStreak,
  getGoalProgress,
  getLatestInsight,
  getWeeklyAnalytics,
  getMonthlyAnalytics,
  getUserBadges,
  getDashboardSnapshot,
  getWeightHistory,
  generateRuleBasedInsight,
} from "../services/progressService.js";
import { getAllAdvancedAnalytics } from "../services/advancedAnalyticsService.js";
import { generate8WeekPlan, getWeekRecommendations } from "../services/progressionPlanService.js";
import DailyProgress from "../models/DailyProgress.js";
import { getWeekKey, normalizeDate } from "../utils/progressUtils.js";

export const logWeightEntry = async (req, res, next) => {
  try {
    const { date, timezone, goalType, weightKg } = req.body;

    if (weightKg === undefined || weightKg === null) {
      return res.status(400).json({ message: "weightKg is required" });
    }

    const record = await logWeight({
      userId: req.user._id,
      date: date || new Date(),
      timezone,
      goalType,
      weightKg,
    });

    res.status(201).json({ success: true, message: "Weight logged", data: record });
  } catch (error) {
    next(error);
  }
};

export const logWorkoutCompletion = async (req, res, next) => {
  try {
    const { planWorkoutId, scheduledDate, status, durationMin, effortRpe } = req.body;

    if (!status) {
      return res.status(400).json({ message: "status is required" });
    }

    const data = await trackWorkoutCompletion({
      userId: req.user._id,
      planWorkoutId,
      scheduledDate: scheduledDate || new Date(),
      status,
      durationMin,
      effortRpe,
    });

    res.status(201).json({
      success: true,
      message: "Workout log updated",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const logDailyCheckInEntry = async (req, res, next) => {
  try {
    const {
      date,
      timezone,
      caloriesIn,
      proteinG,
      steps,
      dietAdherencePercent,
      energyLevel,
      waistCm,
      chestCm,
      hipsCm,
      armsCm,
      thighsCm,
    } = req.body;

    const data = await logDailyCheckIn({
      userId: req.user._id,
      date: date || new Date(),
      timezone,
      caloriesIn,
      proteinG,
      steps,
      dietAdherencePercent,
      energyLevel,
      waistCm,
      chestCm,
      hipsCm,
      armsCm,
      thighsCm,
    });

    res.status(201).json({
      success: true,
      message: "Daily check-in logged",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getStreakStats = async (req, res, next) => {
  try {
    const data = await getStreak(req.user._id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getGoalProgressStats = async (req, res, next) => {
  try {
    const data = await getGoalProgress(req.user._id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getLatestProgressInsight = async (req, res, next) => {
  try {
    const forceRefresh = req.query.force === "true";
    const data = forceRefresh
      ? await generateRuleBasedInsight(req.user._id)
      : await getLatestInsight(req.user._id);

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getWeeklyProgressAnalytics = async (req, res, next) => {
  try {
    const weeks = Number(req.query.weeks) || 8;
    const data = await getWeeklyAnalytics(req.user._id, weeks);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getMonthlyProgressAnalytics = async (req, res, next) => {
  try {
    const months = Number(req.query.months) || 6;
    const data = await getMonthlyAnalytics(req.user._id, months);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getGamificationBadges = async (req, res, next) => {
  try {
    const data = await getUserBadges(req.user._id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getWeightTimeline = async (req, res, next) => {
  try {
    const days = Number(req.query.days) || 90;
    const data = await getWeightHistory(req.user._id, days);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getProgressDashboard = async (req, res, next) => {
  try {
    const data = await getDashboardSnapshot(req.user._id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getWeeklyOverviewGraph = async (req, res, next) => {
  try {
    const days = Number(req.query.days) || 56;
    const startDate = normalizeDate(new Date(Date.now() - days * 86400000));
    const rows = await DailyProgress.find({
      user: req.user._id,
      date: { $gte: startDate },
    })
      .sort({ date: 1 })
      .select("date adherenceScore workoutsPlanned workoutsCompleted");

    const weeklyMap = new Map();

    rows.forEach((row) => {
      const date = normalizeDate(row.date);
      const weekKey = getWeekKey(date);

      if (!weeklyMap.has(weekKey)) {
        weeklyMap.set(weekKey, {
          week: weekKey,
          workout: 0,
          diet: row.adherenceScore || 0,
          habit: row.adherenceScore || 0,
          points: 0,
        });
      }

      const item = weeklyMap.get(weekKey);
      item.points += 1;
      item.diet += row.adherenceScore || 0;
      item.habit += row.adherenceScore || 0;
      item.workout += row.workoutsPlanned
        ? ((row.workoutsCompleted || 0) / row.workoutsPlanned) * 100
        : 0;
    });

    const graphData = Array.from(weeklyMap.values())
      .map((entry) => ({
        week: entry.week,
        workout: Number((entry.workout / Math.max(entry.points, 1)).toFixed(2)),
        diet: Number((entry.diet / Math.max(entry.points, 1)).toFixed(2)),
        habit: Number((entry.habit / Math.max(entry.points, 1)).toFixed(2)),
      }))
      .sort((a, b) => a.week.localeCompare(b.week));

    res.status(200).json({ success: true, graphData });
  } catch (error) {
    next(error);
  }
};

export const getAdvancedAnalytics = async (req, res, next) => {
  try {
    const weeks = Number(req.query.weeks) || 8;
    const data = await getAllAdvancedAnalytics(req.user._id, weeks);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getProgressionPlan = async (req, res, next) => {
  try {
    const weeks = Number(req.query.weeks) || 8;
    const data = await generate8WeekPlan(req.user._id, weeks);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getWeekPlan = async (req, res, next) => {
  try {
    const week = Number(req.params.week);
    if (!week || week < 1 || week > 8) {
      return res.status(400).json({ message: "Week must be between 1 and 8" });
    }
    const data = await getWeekRecommendations(req.user._id, week);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
