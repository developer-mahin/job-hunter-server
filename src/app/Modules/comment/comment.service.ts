import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import AppError from '../../../utils/AppError';
import { decodeToken } from '../../../utils/decodeToken';
import { TComment } from '../Post/post.interface';
import Post from '../Post/post.model';
import { TUpdateCommentData } from './comment.interface';
import mongoose from 'mongoose';

const createCommentIntoBD = async (
  id: string,
  payload: TComment,
  token: string,
) => {
  const postExist = await Post.findById(id);
  if (!postExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found with this ID!!!');
  }

  const decode = decodeToken(
    token,
    config.jwt.access_token as Secret,
  ) as JwtPayload;

  const commentData = {
    commentBody: payload.commentBody,
    image: payload?.image || '',
    user: decode.userId,
  };

  const result = await Post.updateOne(
    { _id: new mongoose.Types.ObjectId(id) },
    { $push: { comments: commentData } },
    { new: true },
  );

  return result;
};

const updateCommentIntoDB = async (
  id: string,
  payload: TUpdateCommentData,
  token: string,
) => {
  const postExist = await Post.findById(id);

  if (!postExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found with this ID!!!');
  }

  const decode = decodeToken(
    token,
    config.jwt.access_token as Secret,
  ) as JwtPayload;

  const userId = decode.userId;

  // Find the specific comment
  const post = await Post.findOne(
    {
      _id: id,
      'comments._id': payload.commentId,
      'comments.user': userId,
    },
    {
      'comments.$': 1,
    },
  );

  if (!post) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can't update this comment!! you are not the author of this comment",
    );
  }

  // Get the existing comment data
  const existingComment = post?.comments?.[0];

  // // Merge existing data with new data
  const updatedCommentData = {
    commentBody: payload?.commentBody || existingComment?.commentBody,
    image: payload.image || existingComment?.image,
  };

  // // Update the specific comment with the merged data
  const result = await Post.updateOne(
    { _id: id, 'comments._id': payload.commentId },
    {
      $set: {
        'comments.$.commentBody': updatedCommentData.commentBody,
        'comments.$.image': updatedCommentData.image,
      },
    },
  );

  return result;
};

const deleteCommentFromDB = async (
  id: string,
  payload: { commentId: string },
  token: string,
) => {
  const postExist = await Post.findById(id);

  if (!postExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found with this ID!!!');
  }

  const decode = decodeToken(
    token,
    config.jwt.access_token as Secret,
  ) as JwtPayload;

  const userId = decode.userId;

  // Find the specific comment
  const post = await Post.findOne(
    {
      _id: id,
      'comments._id': payload.commentId,
      'comments.user': userId,
    },
    {
      'comments.$': 1,
    },
  );

  if (!post) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can't delete this comment!! you are not the author of this comment",
    );
  }

  // Delete the specific comment
  const result = await Post.updateOne(
    { _id: id, 'comments._id': payload.commentId },
    {
      $pull: { comments: { _id: payload.commentId } },
    },
  );

  return result;
};

export const commentService = {
  createCommentIntoBD,
  updateCommentIntoDB,
  deleteCommentFromDB,
};
