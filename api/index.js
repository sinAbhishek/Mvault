import express from "express";
import mongoose, { connect } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ReviewRoute from "./routes/review.js";
import AuthRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;
const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MongoUrl);
    console.log("success");
  } catch (error) {
    throw error;
  }
};
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/Review", ReviewRoute);
app.use("/api/Auth", AuthRoute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
app.listen(PORT, () => {
  mongoConnect();
  console.log("connected");
});
