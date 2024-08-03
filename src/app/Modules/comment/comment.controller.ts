import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { commentService } from './comment.service';

const createComment = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const token = req.headers.authorization;
  const result = await commentService.createCommentIntoBD(
    postId,
    req.body,
    token as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'comment created successful',
    data: result,
  });
});

const updateComment = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const token = req.headers.authorization;
  const result = await commentService.updateCommentIntoDB(
    postId,
    req.body,
    token as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'comment update successful',
    data: result,
  });
});

export const commentController = {
  createComment,
  updateComment,
};
