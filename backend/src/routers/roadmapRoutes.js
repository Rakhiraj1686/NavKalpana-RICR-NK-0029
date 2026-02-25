// import express from "express";
// import Roadmap from "../models/Roadmap.js";
// import { createRoadmap,
//   getRoadmapByUser,
//   deleteRoadmap
//  } from "../roadmapController.js";

// const router = express.Router();

// // Create Roadmap
// router.post("/create", async (req, res) => {
//   try {
//     const { userId, durationWeeks } = req.body;

//     if (!userId || !durationWeeks) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const plans = [];

//     for (let i = 1; i <= durationWeeks; i++) {
//       plans.push({
//         weekNumber: i,
//         intensityLevel:
//           i <= 2
//             ? "Low"
//             : i <= 4
//             ? "Moderate"
//             : i <= 6
//             ? "High"
//             : "Advanced",

//         workoutFocus:
//           i <= 2
//             ? "Foundation & Form Correction"
//             : i <= 4
//             ? "Strength Building"
//             : i <= 6
//             ? "Fat Burn & Conditioning"
//             : "Performance Optimization",

//         dietAdjustment:
//           i <= 2
//             ? "Calorie Stabilization"
//             : i <= 4
//             ? "Increase Protein Intake"
//             : i <= 6
//             ? "Reduce Processed Carbs"
//             : "Macro Fine-Tuning",

//         milestone:
//           i === durationWeeks
//             ? "Major Transformation Checkpoint"
//             : `Week ${i} Progress Evaluation`,
//       });
//     }

//     const roadmap = await Roadmap.create({
//       userId,
//       durationWeeks,
//       plans,
//     });

//     res.status(201).json(roadmap);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Get Roadmap
// router.get("/:userId", async (req, res) => {
//   try {
//     const roadmap = await Roadmap.findOne({
//       userId: req.params.userId,
//     });

//     if (!roadmap) {
//       return res.status(404).json({ message: "Roadmap not found" });
//     }

//     res.json(roadmap);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// export default router;