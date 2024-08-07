import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { likeService } from './like.service';

const clickToLike = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const token = req.headers.authorization;
  const result = await likeService.clickToLike(postId, token as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'like added',
    data: result,
  });
});

const getLikedUser = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await likeService.getLikedUser(postId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'liked user get',
    data: result,
  });
});

export const likeController = {
  clickToLike,
  getLikedUser,
};
