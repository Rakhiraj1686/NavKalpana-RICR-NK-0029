import express from "express";
import { Protect } from "../middlewares/authMiddleware.js";
import {
  logWeightEntry,
  logWorkoutCompletion,
  getStreakStats,
  getGoalProgressStats,
  getLatestProgressInsight,
  getWeeklyProgressAnalytics,
  getMonthlyProgressAnalytics,
  getGamificationBadges,
  getProgressDashboard,
  getWeightTimeline,
  getWeeklyOverviewGraph,
} from "../controllers/progressController.js";

const router = express.Router();

router.post("/weight", Protect, logWeightEntry);
router.post("/workouts", Protect, logWorkoutCompletion);
router.get("/timeline/weight", Protect, getWeightTimeline);
router.get("/streak", Protect, getStreakStats);
router.get("/goal-progress", Protect, getGoalProgressStats);
router.get("/insights/latest", Protect, getLatestProgressInsight);
router.get("/analytics/weekly", Protect, getWeeklyProgressAnalytics);
router.get("/analytics/monthly", Protect, getMonthlyProgressAnalytics);
router.get("/badges", Protect, getGamificationBadges);
router.get("/dashboard", Protect, getProgressDashboard);
router.get("/overview-graph", Protect, getWeeklyOverviewGraph);

export default router;
