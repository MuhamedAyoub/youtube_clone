import User from "../models/User.js";
import Video from "../models/Video.js";
import { createError } from "../utls/error.js";

// ! functions

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({
    userId: req.user.id,
    ...req.body,
  });
  try {
    await newVideo.save();
    res.status(200).json("Video add Seccess");
  } catch (ex) {
    next(ex);
  }
};
export const UpdateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not Found"));
    if (req.user.id === video.userId) {
      const updateVideo = await Video.findByIdAndUpdate(
        video._id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      return res.status(200).json("Update success");
    } else {
      return next(createError(403, "You can update only your video! "));
    }
  } catch (ex) {
    next(ex);
  }
};
export const DeleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not Found"));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(video._id);
      return res.status(200).json("Delete success");
    } else {
      return next(createError(403, "You can Delete only your video! "));
    }
  } catch (ex) {
    next(ex);
  }
};
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (ex) {
    next(ex);
  } 
};
export const IncVideoViews = async (req, res, next) => {
  try {
    await findByIdAndUpdate(req.params.id, {
      $set: {
        views: 1,
      },
    });
    res.status(200).json("Views has been increment!");
  } catch (ex) {
    next(ex);
  }
};
export const getTrendVideo = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (ex) {
    next(ex);
  }
};
export const subVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannel = user.subscribedUsers;
    const list = await Promise.all(
      subscribedChannel.map((channelId) => Video.find({ userId: channelId }))
    );
    res.status(200).json(list.flat().sort((a, b) => a.createdAt - b.createdAt));
  } catch (ex) {
    next(ex);
  }
};
export const randomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (ex) {
    next(ex);
  }
};
export const getTags = async (req, res, next) => {
  try {
    const tags = req.query.tags.spilt(",");
    console.log(tags);
    const videos = await Video.find({
      tags: {
        $in: tags,
      },
    }).sort({ views: -1 });
    res.status(200).json(videos);
  } catch (ex) {
    next(ex);
  }
};
export const search = async (req, res, next) => {
  try {
    const query = req.query.q;
    const videos = await Video.find({
      title: {
        $regex: query,
        $options: "i",
      },
    });
    res.status(200).json(videos);
  } catch (ex) {
    next(ex);
  }
};
