import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utls/error.js";
// * JWT
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  // console.log(req.body);
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password || "", salt);
    const newUser = new User({ ...req.body, password: hash });
    const user = await newUser.save();
    console.log(user);
    // !  use cookie use must use cookie lib in index;
    res.send("User has created sccesfly");
  } catch (except) {
    next(except);
  }
};

export const signin = async (req, res, next) => {
  // console.log(req.body);
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "user not found"));
    const decrypt = await bcrypt.compare(req.body.password, user.password);
    if (!decrypt) return next(createError(404, "Password not Found"));
    const token = user.generateAuthToken();
    const { password, ...others } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send(others);
  } catch (except) {
    next(except);
  }
};
export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // ! create cookies
      const token = user.generateAuthToken();
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const user = new User({ ...req.body, fromGoogle: true });
      const savedUser = await user.save();
      // * thene create token
      const token = savedUser.generateAuthToken();
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
