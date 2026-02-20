import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser);
app.use(morgan("dev"));

app.get("/", (req, res) => {
  console.log("server is working");
});

app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal Server Error";
  const StatusCode = err.statusCode || 500;
  console.log("Error Found", { ErrorMessage, StatusCode });

  res.status(200).json({ message: ErrorMessage });
});

const port = process.env.PORT || 5000;
