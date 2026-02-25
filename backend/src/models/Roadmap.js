import mongoose from "mongoose";

const weekPlanSchema = new mongoose.Schema({
  weekNumber: { type: Number, required: true },

  intensityLevel: {
    type: String,
    enum: ["Low", "Moderate", "High", "Advanced"],
    required: true,
  },

  workoutFocus: { type: String, required: true },

  dietAdjustment: { type: String, required: true },

  milestone: { type: String, required: true },
});

const roadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    durationWeeks: {
      type: Number,
      enum: [4, 6, 8],
      required: true,
    },

    plans: [weekPlanSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Roadmap", roadmapSchema);