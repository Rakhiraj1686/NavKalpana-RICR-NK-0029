// import Report from "../models/Report.js";

// export const createOrUpdateReport = async (req, res) => {
//   try {
//     const { userId, month } = req.body;

//     const report = await Report.findOneAndUpdate(
//       { userId, month },
//       req.body,
//       { new: true, upsert: true }
//     );

//     res.status(200).json(report);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getMonthlyReport = async (req, res) => {
//   try {
//     const { userId, month } = req.params;

//     const report = await Report.findOne({ userId, month });

//     if (!report) return res.status(404).json({ message: "Report not found" });

//     const weightChange = report.weightEnd - report.weightStart;
//     const chestChange = report.chestEnd - report.chestStart;
//     const waistChange = report.waistEnd - report.waistStart;

//     const habitAvg =
//       report.habitScores.reduce((a, b) => a + b, 0) /
//       report.habitScores.length;

//     const workoutAdherence =
//       (report.workoutCompleted / report.workoutPlanned) * 100;

//     const dietAdherence =
//       (report.dietFollowedDays / report.totalDays) * 100;

//     const goalProgress =
//       ((report.weightStart - report.weightEnd) /
//         (report.weightStart - report.goalTargetWeight)) *
//       100;

//     res.json({
//       ...report._doc,
//       weightChange,
//       chestChange,
//       waistChange,
//       habitAvg,
//       workoutAdherence,
//       dietAdherence,
//       goalProgress,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };