import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
// import cloudinary from "./src/config/cloudinary.js";
import AuthRouter from "./src/routers/authRouter.js";
import UserRouter from "./src/routers/userRouter.js";
import PublicRouter from "./src/routers/PublicRouter.js";
import connectDB from "./src/config/db.js";
import ticketRouter from "./src/routers/ticketRouter.js";
// import workoutRoutes from "./routes/workoutRoutes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/public", PublicRouter);
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/api/ticket", ticketRouter);
// app.use("/api/workouts", workoutRoutes);

app.get("/", (req, res) => {
  console.log("server is working");
});

app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal Server Error";
  const StatusCode = err.statusCode || 500;
  console.log("Error Found", { ErrorMessage, StatusCode });

  res.status(StatusCode).json({ message: ErrorMessage });
});

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  console.log("Server started at port: ", port);
  await connectDB();
  // try {
  //   const res = await cloudinary.api.ping();
  //   console.log("Cloudinary connection successful:", res);
  // } catch (error) {
  //   console.error("Cloudinary connection failed:", error);
  // }
});
