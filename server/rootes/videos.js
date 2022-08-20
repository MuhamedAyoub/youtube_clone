import express from "express";
import { verifyToken } from "../utls/verrifytoken.js";
import {
  addVideo,
  getVideo,
  DeleteVideo,
  UpdateVideo,
  IncVideoViews,
  getTrendVideo,
  randomVideos,
  subVideos,
  search,
  getTags,
} from "../controllers/video.js";
const router = express.Router();

router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, UpdateVideo);
router.delete("/:id", verifyToken, DeleteVideo);
router.get("/find/:id", getVideo);
router.put("/views/:id", IncVideoViews);
router.get("/random", randomVideos);
router.get("/trend", getTrendVideo);
router.get("/sub", verifyToken, subVideos);
router.get("/search", search);
router.get("tags", getTags);
export default router;
// * create Video
