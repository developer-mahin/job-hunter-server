import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { authService } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await authService.registerUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'user registered successful',
    data: result,
  });
});

export const authController = {
  registerUser,
};
