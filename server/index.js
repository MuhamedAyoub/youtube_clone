import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; //
import userRoute from "./rootes/users.js";
import VideoRoute from "./rootes/videos.js";
import CommentRoute from "./rootes/comments.js";
import authRoute from "./rootes/auth.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
// ! Start Midleware
app.use(cookieParser());
app.use(express.json()); // * permission to take a request by json
app.use("/api/users", userRoute);
app.use("/api/videos", VideoRoute);
app.use("/api/comments", CommentRoute);
app.use("/api/auth", authRoute);
// todo Handle Error
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong ! ";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
// ! End  Midleware

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => console.log("Connected To DATABASE"))
    .catch((err) => console.error(err));
};
const PORT = 4211;

app.listen(PORT, () => {
  connect();
  console.log("Connected to the Server on the Prtt", PORT, "...");
});
