const userGoalLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    weekStartDate: Date,

    primaryGoal: {
      type: String,
      enum: [
        "weight loss",
        "muscle gain",
        "body recomposition",
        "maintain",
        "improve endurance",
      ],
    },
    calorieTarget: Number,
    goalWeight: Number,

  },
  { timestamps: true },
);

export default mongoose.model("UserGoalLog", userGoalLogSchema);
