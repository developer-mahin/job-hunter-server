/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../../utils/AppError';
import Post from '../Post/post.model';
import { decodeToken } from '../../../utils/decodeToken';
import config from '../../../config';
import { JwtPayload, Secret } from 'jsonwebtoken';

const clickToLike = async (id: string, token: string) => {
  const postExist = await Post.findById(id);

  if (!postExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found with this ID!!!');
  }

  const decode = decodeToken(
    token,
    config.jwt.access_token as Secret,
  ) as JwtPayload;

  const userId = decode.userId;

  if (!postExist?.likes?.some((like) => like.user.toString() === userId)) {
    await Post.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          likes: { user: userId },
        },
      },
      { new: true },
    );
  } else {
    await Post.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          likes: { user: userId },
        },
      },
      { new: true },
    );
  }
};

const getLikedUser = async (id: string) => {
  return await Post.findById(id).select('likes').populate({
    path: 'likes.user',
    model: 'User',
  });
};

export const likeService = {
  clickToLike,
  getLikedUser,
};
