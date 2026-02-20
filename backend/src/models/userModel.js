import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // 🔐 Authentication
    fullName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // 👤 Health Profile Inputs
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    height: {
      type: Number, // in cm
      required: true,
    },
    weight: {
      type: Number, // current weight in kg
      required: true,
    },
    activityLevel: {
      type: String,
      enum: ["sedentary", "light", "moderate", "active"],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate"],
      required: true,
    },
    goal: {
      type: String,
      enum: [
        "weight_loss",
        "muscle_gain",
        "recomposition",
        "maintain",
        "endurance",
      ],
      required: true,
    },

    // 📊 Calculated Values
    bmi: {
      type: Number,
    },
    maintenanceCalories: {
      Number,
    },
    calorieTarget: {
      Number,
    },

    // 🔥 Habit & Tracking Summary
    currentStreak: {
      type: Number,
      default: 0,
    },
    habitScore: {
      type: Number,
      default: 0,
    },

    // ⏱ Activity Tracking
    lastLogin: Date,
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
