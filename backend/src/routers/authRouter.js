import express from "express";

import {
  UserLogin,
  UserRegister,
  UserLogout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", UserLogin);
router.post("/register", UserRegister);
router.get("/logout", UserLogout);

export default router;
