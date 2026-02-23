import express from "express";
import multer from "multer";
import {
  UserResetPassword,
  UserUpdateProfile,
  UserChangePhoto,
  UserSetGoal,
  UserCompleteGoal,
  GetUserGoal,
  regeneratePlan,
} from "../controllers/userController.js";
import { Protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer();

router.patch("/resetPassword", Protect, UserResetPassword);
router.patch("/updateProfile", Protect, UserUpdateProfile);
router.patch("/changePhoto", Protect, upload.single("image"), UserChangePhoto);
router.put("/setGoal", Protect, UserSetGoal);
router.put("/completeGoal", Protect, UserCompleteGoal);
router.put("/completeGoal", Protect, UserCompleteGoal);
router.get("/goal",Protect, GetUserGoal);
router.post("/regenerate-plan", Protect, regeneratePlan);

export default router;
