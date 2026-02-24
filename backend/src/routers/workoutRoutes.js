import express from "express";
import {
  createWorkout,
  getWorkouts,
  deleteWorkout,
} from "../controllers/workoutController.js";

const router = express.Router();

router.post("/create", createWorkout);
router.get("/all", getWorkouts);
router.delete("/:id", deleteWorkout);

export default router;
