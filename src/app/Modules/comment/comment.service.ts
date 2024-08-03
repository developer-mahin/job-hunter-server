import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import AppError from '../../../utils/AppError';
import { decodeToken } from '../../../utils/decodeToken';
import { TComment } from '../Post/post.interface';
import Post from '../Post/post.model';

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

export const commentService = {
  createCommentIntoBD,
};
