import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { authService } from './auth.service';
import AppError from '../../../utils/AppError';
import config from '../../../config';

const registerUser = catchAsync(async (req, res) => {
  const result = await authService.registerUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Please verify your email address!!',
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

const loginUser = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await authService.loginUser(req.body);

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'you are now verified user, Please login!!',
    data: {
      token: accessToken,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  const { ...passwordData } = req.body;
  const result = await authService.changePassword(user, passwordData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfully changed Password',
    data: result,
  });
});

export const authController = {
  registerUser,
  verifyUser,
  loginUser,
  changePassword,
};
