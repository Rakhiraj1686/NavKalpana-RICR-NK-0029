import express from "express";
import { createTicket, getMyTickets } from "../controllers/userController.js";
import { Protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ticket routes
router.post("/createTicket", Protect, createTicket);
router.get("/mytickets", Protect, getMyTickets);

export default router;
