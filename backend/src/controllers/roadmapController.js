// import Roadmap from "../models/Roadmap.js";

// /**
//  * @desc    Create Multi-Week Roadmap
//  * @route   POST /api/roadmap/create
//  * @access  Public (Later secure with JWT)
//  */
// export const createRoadmap = async (req, res) => {
//   try {
//     const { userId, durationWeeks } = req.body;

//     if (!userId || !durationWeeks) {
//       return res.status(400).json({
//         success: false,
//         message: "UserId and durationWeeks are required",
//       });
//     }

//     // Prevent duplicate roadmap
//     const existingRoadmap = await Roadmap.findOne({ userId });
//     if (existingRoadmap) {
//       return res.status(400).json({
//         success: false,
//         message: "Roadmap already exists for this user",
//       });
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
//             ? "Foundation & Mobility"
//             : i <= 4
//             ? "Strength Development"
//             : i <= 6
//             ? "Fat Burn & Conditioning"
//             : "Performance Optimization",

//         dietAdjustment:
//           i <= 2
//             ? "Calorie Stabilization Phase"
//             : i <= 4
//             ? "Increase Protein Intake"
//             : i <= 6
//             ? "Reduce Refined Carbohydrates"
//             : "Macro Fine-Tuning & Hydration Optimization",

//         milestone:
//           i === durationWeeks
//             ? "Major Transformation Checkpoint"
//             : `Week ${i} Performance Evaluation`,
//       });
//     }

//     const roadmap = await Roadmap.create({
//       userId,
//       durationWeeks,
//       plans,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Roadmap created successfully",
//       data: roadmap,
//     });
//   } catch (error) {
//     console.error("Create Roadmap Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error while creating roadmap",
//     });
//   }
// };

// /**
//  * @desc    Get Roadmap by UserId
//  * @route   GET /api/roadmap/:userId
//  * @access  Public
//  */
// export const getRoadmapByUser = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const roadmap = await Roadmap.findOne({ userId });

//     if (!roadmap) {
//       return res.status(404).json({
//         success: false,
//         message: "Roadmap not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: roadmap,
//     });
//   } catch (error) {
//     console.error("Get Roadmap Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error while fetching roadmap",
//     });
//   }
// };

// /**
//  * @desc    Delete Roadmap
//  * @route   DELETE /api/roadmap/:userId
//  */
// export const deleteRoadmap = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const roadmap = await Roadmap.findOneAndDelete({ userId });

//     if (!roadmap) {
//       return res.status(404).json({
//         success: false,
//         message: "Roadmap not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Roadmap deleted successfully",
//     });
//   } catch (error) {
//     console.error("Delete Roadmap Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error while deleting roadmap",
//     });
//   }
// };