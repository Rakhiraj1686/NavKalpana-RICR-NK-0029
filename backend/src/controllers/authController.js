import bcrypt from "bcrypt";
import User from "../models/userModel.js";
// import { genToken } from "../utils/authToken.js";

export const UserRegister = async (req, res, next) => {
  try {
    //accept data from fronted
    const { fullName, mobileNumber, email, password } = req.body;

    //verify that all data exist
    if (!fullName || !mobileNumber || !email || !password) {
      const error = new Error("All Field Required");
      error.statusCode = 400;
      return next(error);
    }

    console.log({ fullName, mobileNumber, email, password });

    //check for duplicate user before refistration
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email already registered");
      error.statusCode = 409;
      return next(error);
    }

    console.log("Sending Data to DB");

    //encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //save data to database
    const newUser = await User.create({
      fullName,
      email: email.toLowerCase(),
      mobileNumber,
      password: hashPassword,
    });

    console.log(newUser);
    res.status(201).json({ message: "Registration Successfull" });
  } catch (error) {
    next(error);
  }
};

export const UserLogin = async (req, res, next) => {
  try {
    //fetch data from fronted
    const { email, password } = req.body;

    //verify that all data exist
    if (!email || !password) {
      const error = new Error("All Field Required");
      error.statusCode = 400;
      return next(error);
    }

    //check for if user is registered or not
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("Email not registered");
      error.statusCode = 401;
      return next(error);
    }

    //verify password
    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      const error = new Error("Password didn't match");
      error.statusCode = 401;
      return next(error);
    }

    //Token Genration will be done here
    // genToken(existingUser, res);

    //send message to fronted
    res.status(200).json({ message: "Login Successfull", data: existingUser });
  } catch (error) {
    next(error);
  }
};
