import User from "../models/chatHistory.js";
import Guest from "../models/guestModel.js";
import { v4 as uuid } from "uuid";

// Middleware to check if user has exceeded daily chat limit free for pro users
export const checkUserChatLimit = async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (currentUser) {
      const error = new Error("User not registered");
      error.statusCode = 401;
      return next(error);
    }
    const user = await User.findById(currentUser._id);

    if (user && user.aiUsage.messagesUsed >= 50) {
      return res.status(403).json({
        msg: "Daily AI limit reached",
      });
    }

    user.aiUsage.messagesUsed++;
    await user.save();
    next();
  } catch (error) {
    next(error);
  }
};

// Middleware to check if guest user has exceeded daily chat limit or not
export const GuestChatLimit = async (req, res, next) => {
  try {
    let guestId = req.cookies.guestId;

    if (!guestId) {
      guestId = uuid();
      res.cookie("guestId", guestId);
    }

    console.log("Guest UUID : ", guestId);

    let guest = await Guest.findOne({ guestId });

    if (!guest) {
      guest = await Guest.create({ guestId });
    }

    if (guest.messagesUsed >= 5) {
      return res.status(403).json({
        msg: "Please login for more access..",
      });
    }

    guest.messagesUsed++;
    await guest.save();
    next();
  } catch (error) {
    next(error);
  }
};
