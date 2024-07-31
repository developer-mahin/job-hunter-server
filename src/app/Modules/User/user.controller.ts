import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { userService } from './user.service';

const getMyProfile = catchAsync(async (req, res) => {
  const token = req.headers.authorization as string;
  const result = await userService.getMyProfileFromDB(token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfully get my profile',
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await userService.getAllUsersFromDb();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfully get all users',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userService.getSingleUsersFromDb(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfully get single user',
    data: result,
  });
});

export const userController = {
  getMyProfile,
  getAllUser,
  getSingleUser,
};
