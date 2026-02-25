import express from "express";
import multer from "multer";
import {
  UserResetPassword,
  UserUpdateProfile,
  UserChangePhoto,
  UserSetGoal,
  UserCompleteGoal,
  GetUserGoal,
  UserChatWithAI,
  RegeneratePlan,
  generatePlan,
  createWeeklyProgress,
  getProgressGraph,
  getMyTickets,
} from "../controllers/userController.js";
import { Protect } from "../middlewares/authMiddleware.js";
import { checkUserChatLimit } from "../middlewares/chatUseLimit.js";

const router = express.Router();
const upload = multer();

// User routes
router.patch("/resetPassword", Protect, UserResetPassword);
router.patch("/updateProfile", Protect, UserUpdateProfile);
router.patch("/changePhoto", Protect, upload.single("image"), UserChangePhoto);

//Set and complete goals
router.put("/setGoal", Protect, UserSetGoal);
router.put("/completeGoal", Protect, UserCompleteGoal);
router.get("/goal", Protect, GetUserGoal);

// AI chat route with usage limit check
router.post("/chat", Protect, checkUserChatLimit, UserChatWithAI);

// Additional routes for AI plan generation
router.post("/regenerate-plan", Protect, RegeneratePlan);
router.post("/generatePlan", Protect, generatePlan);

// Progress routes
router.post("/progress", Protect, createWeeklyProgress);
router.get("/progress-graph", Protect, getProgressGraph);

// Ticket routes
router.get("/mytickets", Protect, getMyTickets);

export default router;
