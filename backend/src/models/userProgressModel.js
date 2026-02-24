// const progressLogSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

//     weekStartDate: Date,

//     workoutAdherencePercent: Number,
//     dietAdherencePercent: Number,

//     habitScore: Number,
//     currentStreak: Number,
//     dropOffRisk: { type: Boolean, default: false },

//     energyLevel: {
//       type: String,
//       enum: ["energized", "normal", "slightly fatigued", "very tired"],
//     },

//     dietAdherence: {
//       type: String,
//       enum: ["followed", "mostly", "deviated"],
//     },
    
//     workoutCompletion: {
//       type: String,
//       enum: ["completed", "partial", "skipped"],
//     },

//     days: [
//       {
//         dayName: String,
//         focus: String,
//         exercises: [
//           {
//             name: String,
//             sets: Number,
//             reps: String,
//             rest: String,
//             formGuide: String,
//           },
//         ],
//       },
//     ],
//   },
//   { timestamps: true },
// );

// export default mongoose.model("ProgressLog", progressLogSchema);

import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    weight: Number,
    bmi: Number,
    bodyFat: Number, // optional future use
  },
  { timestamps: true }
);

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
