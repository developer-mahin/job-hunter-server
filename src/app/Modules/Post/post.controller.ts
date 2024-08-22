import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { postService } from './post.service';

const createPost = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await postService.createPostIntoDB(req.body, token as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Post created successful',
    data: result,
  });
});

const getAllPost = catchAsync(async (req, res) => {
  const result = await postService.getAllPostFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post retrieve successful',
    meta: result.meta,
    data: result.result,
  });
});

const getAllMyPost = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await postService.getAllMyPostFromDB(
    req.query,
    token as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post retrieve successful',
    meta: result.meta,
    data: result.result,
  });
});

const getUserPost = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await postService.getUserPostFromDB(req.query, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post retrieve successful',
    meta: result.meta,
    data: result.result,
  });
});

const getSinglePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await postService.getSinglePostFromDB(postId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post retrieve successful',
    data: result,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const token = req.headers.authorization;
  const result = await postService.updatePostIntoDB(
    token as string,
    postId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post update successful',
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const token = req.headers.authorization;
  const result = await postService.deletePostFromDB(postId, token as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post delete successful',
    data: result,
  });
});

export const postController = {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
  getUserPost,
  getAllMyPost,
};
