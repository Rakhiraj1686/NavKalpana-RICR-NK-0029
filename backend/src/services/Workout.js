import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number,
      },
    ],
    day: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Workout", workoutSchema);
