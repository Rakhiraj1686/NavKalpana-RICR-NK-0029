const chatHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    question: String,
    response: String,

    contextSnapshot: {
      habitScore: Number,
      calorieTarget: Number,
      fatigueLevel: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("ChatHistory", chatHistorySchema);
