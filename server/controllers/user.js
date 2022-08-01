import { createError } from "../utls/error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";
export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    //todo
    try {
      const userUpdate = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      const { password, ...updateUser } = userUpdate._doc;
      res.status(200).json(updateUser);
    } catch (ex) {
      next(ex);
    }
  } else {
    next(createError(403, "You can update only with your account"));
  }
};
export const Delete = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    //todo
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted ");
    } catch (ex) {
      next(ex);
    }
  } else {
    next(createError(403, "You can update only with your account"));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) res.status(200).json(user);
  } catch (ex) {
    next(ex);
  }
};
export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        subscribedUsers: req.params.id,
      },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: {
        subscribers: 1,
      },
    });
    res.status(200).json("Subscription seccessfull !");
  } catch (ex) {
    next(ex);
  }
};
export const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pop: {
        subscribedUsers: req.params.id,
      },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: {
        subscribers: -1,
      },
    });
    res.status(200).json("Unsubscription seccessfull !");
  } catch (ex) {
    next(ex);
  }
};

export const putLike = async (req, res, next) => {
  try {
    const { id } = req.user;
    await Video.findOneAndUpdate(
      { videoId: req.params.videoId },
      {
        //* we dont use push because the Id is unique that's why we use a Set method
        $addToSet: { likes: id },
        $pull: { disLikes: id },
      }
    );
    res.status(200).json("the video has been Liked");
  } catch (ex) {
    next(ex);
  }
};
export const putDislike = async (req, res, next) => {
  const { id } = req.user;
  try {
    await Video.findOneAndUpdate(
      { videoId: req.params.videoId },
      {
        //* we dont use push because the Id is unique that's why we use a Set method
        $addToSet: { disLikes: id },
        $pull: { likes: id },
      }
    );
    res.status(200).json("the video has been DisLiked");
  } catch (ex) {
    next(ex);
  }
};
