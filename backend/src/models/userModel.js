import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ===== AUTH FIELDS =====
    fullName: {
      type: String,
      required: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      unique: true,
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

    isActive: { type: Boolean, default: true },

    // ===== HEALTH PROFILE (OPTIONAL INITIALLY) =====
    photo: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },
    
    age: Number,

    biologicalSex: {
      type: String,
      enum: ["male", "female", "other"],
    },

    height: Number, // cm
    weight: Number, // kg

    activityLevel: {
      type: String,
      enum: ["sedentary", "lightly active", "moderately active", "very active"],
    },

    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },

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

    bmi: Number,
    maintenanceCalories: Number,
    calorieTarget: Number,
    goalWeight: Number,

    // ⭐ Useful flag
    profileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
