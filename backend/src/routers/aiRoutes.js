import express from "express";
import { getDietSuggestion } from "../controllers/aiController.js";

const router = express.Router();

router.post("/suggest", getDietSuggestion);

export default router;