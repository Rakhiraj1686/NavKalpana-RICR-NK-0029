import bcrypt from "bcrypt";
import User from "../models/userProfileModel.js";
import cloudinary from "../config/cloudinary.js";

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
    const freshUser = await User.findById(currentUser._id);

    freshUser.profileCompleted = true;

    await freshUser.save();
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

export const UserCompleteGoal = async (req, res, next) => {};

export const GetUserGoal = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const user = await User.findById(currentUser._id).select(
      "primaryGoal calorieTarget goalWeight goalStatus",
    );

    res.status(200).json({
      success: true,
      data: {
        primaryGoal: user.primaryGoal,
        calorieTarget: user.calorieTarget,
        goalWeight: user.goalWeight,
        goalStatus: user.goalStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const UserChatWithAI = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices[0].message.content;

    console.log("AI Reply:", reply);

    res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    next(error);
  }
};
