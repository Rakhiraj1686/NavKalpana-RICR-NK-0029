import dotenv from "dotenv";

// Load .env file
dotenv.config();

// DEBUG: check if Node can read it
console.log("DEBUG - MONGO_URI:", process.env.MONGO_URI);

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import AuthRouter from "./src/routers/authRouter.js";
import connectDB from "./src/config/db.js";

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/auth", AuthRouter);

app.get("/", (req, res) => {
  console.log("Server is working");
  res.send("Server is working");
});

// Global error handler
app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal Server Error";
  const StatusCode = err.statusCode || 500;
  console.log("Error Found", { ErrorMessage, StatusCode });

  res.status(StatusCode).json({ message: ErrorMessage });
});

// Start server after DB connection
const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("Error: MONGO_URI is undefined!");
      process.exit(1);
    }

    await connectDB();
    console.log("MongoDB connected!");

    app.listen(port, () => {
      console.log("Server started at port:", port);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};
startServer();