import chatHistory from "../models/chatHistory.js";
import Guest from "../models/guestModel.js";
import { v4 as uuid } from "uuid";

// Middleware to check if user has exceeded daily chat limit free for pro users
export const checkUserChatLimit = async (req, res, next) => {
  try {
    const currentUser = req.user;

    if (!currentUser) {
      return res.status(401).json({
        msg: "Unauthorized user",
      });
    }

    // Start of today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const messagesToday = await chatHistory.countDocuments({
      user: currentUser._id,
      createdAt: { $gte: startOfDay },
    });

    if (messagesToday >= 50) {
      return res.status(403).json({
        msg: "Daily AI limit reached",
      });
    }

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
