import express from "express";
import {
  getUser,
  subscribe,
  unsubscribe,
  update,
  Delete,
  putLike,
  putDislike,
} from "../controllers/user.js";
import { verifyToken } from "../utls/verrifytoken.js";
const router = express.Router();
// todo update User
router.put("/:id", verifyToken, update);
//todo Delete user
router.delete("/del/:id", Delete);
//todo GetUser
router.get("/find/:id", getUser);
//todo like
// todo dislike
// todo subscribe
router.put("/sub/:id", verifyToken, subscribe);
// todo unsubscribe
router.put("/unsub/:id", verifyToken, unsubscribe);
//todo Like
router.put("/like/:videoId", verifyToken, putLike);
router.put("/dislike/:videoId", verifyToken, putDislike);

export default router;
