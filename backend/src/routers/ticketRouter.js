import express from "express";
import { createTicket } from "../controllers/authController.js";

const router = express.Router();
router.post("/createTicket",createTicket);

export default router