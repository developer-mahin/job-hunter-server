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
    message: 'Successfully login!!',
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

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;

  await authService.forgotPassword(email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Check your email and reset password',
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization as string;
  const result = await authService.resetPassword(req.body, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password reset successful, please login again',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Token retrieved successful',
    data: result,
  });
});

export const authController = {
  registerUser,
  verifyUser,
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
  refreshToken,
};
