import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import AppError from '../../../utils/AppError';
import { decodeToken } from '../../../utils/decodeToken';
import { TComment } from '../Post/post.interface';
import Post from '../Post/post.model';
import { TUpdateCommentData } from './comment.interface';

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
    { _id: id },
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
  const postExist = await Post.findById(id).populate('author').populate({
    path: 'comments.user',
    model: 'User',
  });
  if (!postExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found with this ID!!!');
  }

  console.log(postExist);

  const decode = decodeToken(
    token,
    config.jwt.access_token as Secret,
  ) as JwtPayload;

  const commentData = {
    commentBody: payload.commentBody,
    image: payload?.image || '',
    user: decode.userId,
  };

  // return result;
};

export const commentService = {
  createCommentIntoBD,
  updateCommentIntoDB,
};
