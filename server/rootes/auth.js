import express from "express";
import { signup, signin } from "../controllers/auth.js";

const router = express.Router();

// todo sign up
router.post("/signup", signup);

// todo sign in
router.post("/signin", signin);

// todo GOOGEL AUTH

// router.post("/google");

export default router;
