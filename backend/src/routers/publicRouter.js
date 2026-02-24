import express from "express";
import {
  PublicContactMessage,
  GuestChatWithAI,
} from "../controllers/publicController.js";
import { GuestChatLimit } from "../middlewares/chatUseLimit.js";
const router = express.Router();

router.post("/contactMessage", PublicContactMessage);
router.post("/chat", GuestChatLimit, GuestChatWithAI);

export default router;
