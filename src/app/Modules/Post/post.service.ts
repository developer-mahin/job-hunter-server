import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import QueryBuilder from '../../../QueryBuilder/QueryBuilder';
import AppError from '../../../utils/AppError';
import { decodeToken } from '../../../utils/decodeToken';
import { TPost } from './post.interface';
import Post from './post.model';

const createPostIntoDB = async (
  payload: Pick<TPost, 'postDetails' | 'image'>,
  token: string,
) => {
  const decode = decodeToken(
    token,
    config.jwt.access_token as Secret,
  ) as JwtPayload;

  const postData = {
    postDetails: payload.postDetails,
    author: decode?.userId,
    image: payload.image || '',
  };

  const result = await Post.create(postData);
  return result;
};

const getAllPostFromDB = async (query: Record<string, unknown>) => {
  const postSearchableQuery = ['postDetails'];

  const postQuery = new QueryBuilder(
    Post.find({}).populate('author').populate({
      path: 'comments.user',
      model: 'User',
    }),
    query,
  )
    .search(postSearchableQuery)
    .paginate()
    .sort();
  const result = await postQuery.queryModel;
  const meta = await postQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getAllMyPostFromDB = async (
  query: Record<string, unknown>,
  token: string,
) => {
  const postSearchableQuery = ['postDetails'];
  const decode = decodeToken(
    token,
    config.jwt.access_token as Secret,
  ) as JwtPayload;

  const postQuery = new QueryBuilder(
    Post.find({ author: decode.userId }).populate('author').populate({
      path: 'comments.user',
      model: 'User',
    }),
    query,
  )
    .search(postSearchableQuery)
    .paginate()
    .sort();
  const result = await postQuery.queryModel;
  const meta = await postQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSinglePostFromDB = async (postId: string) => {
  return await Post.findById(postId)
    .populate('author')
    .populate({
      path: 'comments.user',
      model: 'User',
    })
    .populate({
      path: 'likes.user',
      model: 'User',
    });
};

const updatePostIntoDB = async (
  token: string,
  postId: string,
  payload: Partial<TPost>,
) => {
  const decode = decodeToken(
    token,
    config.jwt.access_token as Secret,
  ) as JwtPayload;

  const findPost = await Post.findById(postId);

  if (!findPost?.author?.equals(decode?.userId)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'your are not the author of this post',
    );
  }

  return await Post.findByIdAndUpdate(postId, payload, { new: true });
};

const deletePostFromDB = async (postId: string, token: string) => {
  const decode = decodeToken(
    token,
    config.jwt.access_token as Secret,
  ) as JwtPayload;

  const findPost = await Post.findById(postId);

  if (!findPost?.author?.equals(decode?.userId)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'your are not the author of this post',
    );
  }

  return await Post.findByIdAndDelete(postId);
};

export const postService = {
  createPostIntoDB,
  getAllPostFromDB,
  getSinglePostFromDB,
  updatePostIntoDB,
  deletePostFromDB,
  getAllMyPostFromDB,
};
