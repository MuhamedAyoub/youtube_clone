import Comment from "../models/Comments.js";
import Video from "../models/Video.js";
import { createError } from "../utls/error.js";
export const addComment = async (req, res, next) => {
  try {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (ex) {
    next(ex);
  }
};

export const DeleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (comment.userId === req.user.id || video.userId === req.user.id) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The Comment has been deleted ! ");
    } else {
      return next(createError(403, "you can Delete only your comment !"));
    }
  } catch (ex) {
    next(ex);
  }
};

export const UpdateComment = (req, res, next) => {
  try {
  } catch (ex) {
    next(ex);
  }
};

export const getComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (ex) {
    next(ex);
  }
};
