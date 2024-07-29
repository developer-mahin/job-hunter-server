import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { authService } from './auth.service';
import AppError from '../../../utils/AppError';

const registerUser = catchAsync(async (req, res) => {
  const result = await authService.registerUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'user registered successful',
    data: result,
  });
});

const verifyUser = catchAsync(async (req, res) => {
  const { token } = req.params;
  if (!token) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'something went wrong Please try again ',
    );
  }
  const result = await authService.verifyUser(res, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'you are now verified user, Please login!!',
    data: result,
  });
});

export const authController = {
  registerUser,
  verifyUser,
};
