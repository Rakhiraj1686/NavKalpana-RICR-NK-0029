import express from "express";
import { createTicket } from "../controllers/authController.js";
import { Protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/createTicket", Protect, createTicket);

export default router;
