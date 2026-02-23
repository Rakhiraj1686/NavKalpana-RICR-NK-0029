import express from "express";
import multer from "multer";
import {
  UserResetPassword,
  UserUpdateProfile,
  UserChangePhoto,
  UserSetGoal,
} from "../controllers/userController.js";
import { Protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer();

router.patch("/resetPassword", Protect, UserResetPassword);
router.patch("/updateProfile", Protect, UserUpdateProfile);
router.patch("/changePhoto", Protect, upload.single("image"), UserChangePhoto);
router.patch("/setGoal", Protect, UserSetGoal);

export default router;
