import bcrypt from "bcrypt";
import User from "../models/userProfileModel.js";
import { buildPrompt } from "../services/groqPromptBuilder.js";
import { getAIResponse } from "../services/groqServices.js";
import cloudinary from "../config/cloudinary.js";
import { generateAIPlan } from "../services/aiPlanService.js";
import Ticket from "../models/ticketModel.js";
import Progress from "../models/userProgressModel.js";

const getWeekStartDate = (date = new Date()) => {
  const current = new Date(date);
  const day = current.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  current.setDate(current.getDate() + diffToMonday);
  current.setHours(0, 0, 0, 0);
  return current;
};

export const UserResetPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const currentUser = req.user;

    if (!oldPassword || !newPassword) {
      const error = new Error("All fields required.");
      error.statusCode = 400;
      return next(error);
    }

    const isVerified = await bcrypt.compare(oldPassword, currentUser.password);
    if (!isVerified) {
      const error = new Error("Old Password didn't matched");
      error.statusCode = 401;
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    currentUser.password = hashPassword;

    await currentUser.save();

    res.status(200).json({ message: "Password reset succeful." });
  } catch (error) {
    next(error);
  }
};

export const UserUpdateProfile = async (req, res, next) => {
  try {
    let {
      fullName,
      email,
      mobileNumber,
      age,
      height,
      weight,
      biologicalSex,
      foodPreference,
      experienceLevel,
      activityLevel,
    } = req.body;

    const currentUser = req.user;

    if (!fullName || !email || !mobileNumber) {
      const error = new Error(
        "Full name, email and mobile number are required.",
      );
      error.statusCode = 400;
      return next(error);
    }

    // Convert string to numbers
    age = Number(age);
    height = Number(height); //in cm
    weight = Number(weight); //in kg

    // BMI Calculation
    let bmi = null;
    if (height && weight) {
      const heightMeter = height / 100;
      bmi = weight / (heightMeter * heightMeter);
      bmi = Number(bmi.toFixed(2));
    }

    // BMR Calculation
    let bmr = null;
    if (age && height && weight && biologicalSex) {
      if (biologicalSex === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else if (biologicalSex === "female") {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }
      bmr = Math.round(bmr);
    }

    // Maintenance Calories
    const multiplier = {
      sedentary: 1.2,
      "lightly active": 1.375,
      "moderately active": 1.55,
      "very active": 1.725,
    };

    const maintenanceCalories =
      bmr && multiplier[activityLevel]
        ? Math.round(bmr * multiplier[activityLevel])
        : null;

    currentUser.fullName = fullName;
    currentUser.email = email;
    currentUser.mobileNumber = mobileNumber;
    if (age !== undefined) currentUser.age = age;
    if (height !== undefined) currentUser.height = height;
    if (weight !== undefined) currentUser.weight = weight;
    if (foodPreference) currentUser.foodPreference = foodPreference;
    currentUser.biologicalSex = biologicalSex || currentUser.biologicalSex;
    currentUser.experienceLevel =
      experienceLevel || currentUser.experienceLevel;
    currentUser.activityLevel = activityLevel || currentUser.activityLevel;
    currentUser.bmi = bmi;
    currentUser.bmr = bmr;
    currentUser.maintenanceCalories = maintenanceCalories;

    console.log("OldData: ", req.user);
    // const freshUser = await User.findById(currentUser._id);

    currentUser.profileCompleted = true;

    await currentUser.save();

    const plan = generateAIPlan(currentUser);

    currentUser.aiPlan = plan;

    await currentUser.save();
    res
      .status(200)
      .json({ message: "Profile updated successful.", data: currentUser });
  } catch (error) {
    next(error);
  }
};

export const UserChangePhoto = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const photo = req.file;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (currentUser.photo.publicID) {
      await cloudinary.uploader.destroy(currentUser.photo.publicID);
    }

    const b64 = Buffer.from(photo.buffer).toString("base64");
    const dataURI = `data:${photo.mimetype};base64,${b64}`;
    const uploadRes = await cloudinary.uploader.upload(dataURI, {
      folder: "HealthUP/UserProfile",
      width: 500,
      height: 500,
      crop: "fill",
    });

    console.log("Image Upload Done ");
    currentUser.photo = {
      url: uploadRes.secure_url,
      publicID: uploadRes.public_id,
    };
    await currentUser.save();

    res.status(200).json({
      message: "Profile photo updated successfully.",
      data: currentUser,
    });
  } catch (error) {
    next(error);
  }
};

export const UserSetGoal = async (req, res, next) => {
  try {
    const { primaryGoal, calorieTarget, goalWeight, goalStatus } = req.body;
    const currentUser = req.user;

    if (!primaryGoal) {
      const error = new Error("Primary goal is required.");
      error.statusCode = 400;
      return next(error);
    }

    currentUser.primaryGoal = primaryGoal;
    if (calorieTarget) currentUser.calorieTarget = calorieTarget;
    if (goalWeight) currentUser.goalWeight = goalWeight;
    if (goalStatus) currentUser.goalStatus = goalStatus;

    await currentUser.save();

    res
      .status(200)
      .json({ message: "Goal updated successfully.", data: currentUser });
  } catch (error) {
    next(error);
  }
};

export const UserCompleteGoal = async (req, res, next) => {
  try {
    const currentUser = req.user;

    if (currentUser.goalStatus !== "ongoing") {
      const error = new Error("No ongoing goal to complete.");
      error.statusCode = 400;
      return next(error);
    }
    currentUser.goalStatus = "completed";

    await currentUser.save();
    res.status(200).json({ message: "Goal completed successfully." });
  } catch (error) {
    next(error);
  }
};

export const GetUserGoal = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const user = await User.findById(currentUser._id).select(
      "primaryGoal calorieTarget goalWeight goalStatus workoutsPerWeek weight",
    );

    res.status(200).json({
      success: true,
      data: {
        primaryGoal: user.primaryGoal,
        calorieTarget: user.calorieTarget || 2000,
        goalWeight: user.goalWeight,
        goalStatus: user.goalStatus,
        workoutsPerWeek: user.workoutsPerWeek || 5,
        currentWeight: parseFloat(user.weight) || 0,
      },
      message: "Goal fetched successfully",
    });

    console.log("GetUserGoal response:", {
      primaryGoal: user.primaryGoal,
      calorieTarget: user.calorieTarget,
      goalWeight: user.goalWeight,
      goalStatus: user.goalStatus,
    });
  } catch (error) {
    next(error);
  }
};

export const UserChatWithAI = async (req, res) => {
  try {
    req.body.userProfile = req.user.profile;
    const prompt = buildPrompt(req.body);

    const reply = await getAIResponse(prompt);

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "AI processing error",
    });
  }
};

// export const GetChatHistory = async (req, res, next) => {
//   try {
//     const currentUser = req.user;
//     const history = await chatHistory
//       .find({ user: currentUser._id })
//       .select("question response createdAt");
//     res.status(200).json({
//       success: true,
//       data: history,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const RegeneratePlan = async (req, res, next) => {
  try {
    const currentUser = req.user;
    // Logic to regenerate plan based on user's current data and goals
    // This is a placeholder and should be replaced with actual implementation
    const newPlan = {
      meals: [
        { name: "Breakfast", items: ["Oatmeal", "Banana", "Almonds"] },
        { name: "Lunch", items: ["Grilled Chicken Salad", "Quinoa"] },
        { name: "Dinner", items: ["Baked Salmon", "Steamed Vegetables"] },
      ],
      workouts: [
        { name: "Cardio", exercises: ["Running", "Cycling"] },
        { name: "Strength", exercises: ["Push-ups", "Squats"] },
      ],
    };
    res.status(200).json({
      success: true,
      data: newPlan,
    });
  } catch (error) {
    next(error);
  }
};

export const generatePlan = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPlan = generateAIPlan(user);
    console.log("Generate Plan", newPlan);

    user.aiPlan = newPlan;
    await user.save();

    res.status(200).json({
      message: "AI Plan regenerated successfully",
      aiPlan: newPlan,
    });
  } catch (error) {
    next(error);
  }
};

export const createTicket = async (req, res, next) => {
  try {
    console.log("Logged user:", req.user);

    const { type, description } = req.body;

    if (!type || !description) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const ticket = await Ticket.create({
      user: req.user._id,
      type,
      description,
      status: "Open",
    });

    res.status(201).json({
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.log("Error creating ticket:", error);
    next(error);
  }
};

export const getMyTickets = async (req, res, next) => {
  try {
    res.set("Cache-Control", "no-store");

    const tickets = await Ticket.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (error) {
    next(error);
  }
};

export const createWeeklyProgress = async (req, res) => {
  try {
    const workoutAdherencePercent = Number(req.body.workoutAdherencePercent);
    const dietAdherencePercent = Number(req.body.dietAdherencePercent);
    const habitScore = Number(req.body.habitScore);

    if (
      Number.isNaN(workoutAdherencePercent) ||
      Number.isNaN(dietAdherencePercent) ||
      Number.isNaN(habitScore)
    ) {
      return res
        .status(400)
        .json({ message: "All progress fields are required" });
    }

    // Use today's date for daily progress tracking
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const updatedLog = await Progress.findOneAndUpdate(
      {
        user: req.user._id,
        date: today,
      },
      {
        $set: {
          workoutAdherencePercent,
          dietAdherencePercent,
          habitScore,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );

    const graphData = await Progress.find({ user: req.user._id })
      .sort({ date: 1 })
      .select("date workoutAdherencePercent dietAdherencePercent habitScore");

    res.status(201).json({
      success: true,
      message: "Daily progress saved successfully",
      log: updatedLog,
      graphData: graphData.map((log) => ({
        week: new Date(log.date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
        workout: log.workoutAdherencePercent,
        diet: log.dietAdherencePercent,
        habit: log.habitScore,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving progress" });
  }
};

export const getProgressGraph = async (req, res) => {
  try {
    const logs = await Progress.find({
      user: req.user._id,
    })
      .sort({ date: 1 })
      .select("date workoutAdherencePercent dietAdherencePercent habitScore");

    const graphData = logs.map((log) => ({
      week: new Date(log.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      workout: log.workoutAdherencePercent,
      diet: log.dietAdherencePercent,
      habit: log.habitScore,
    }));

    res.status(200).json({
      success: true,
      graphData,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching graph data" });
  }
};
