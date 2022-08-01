import express from "express";
import {
  addComment,
  DeleteComment,
  UpdateComment,
  getComment,
} from "../controllers/comment.js";
import { verifyToken } from "../utls/verrifytoken.js";

const router = express.Router();
router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, DeleteComment);
router.put("/:id", verifyToken, UpdateComment);
router.get("/:videoId", getComment);

export default router;
