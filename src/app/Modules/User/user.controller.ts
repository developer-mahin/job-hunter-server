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
  const result = await userService.getAllUsersFromDb(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfully get all users',
    meta: result.meta,
    data: result.result,
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

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await userService.updateUserIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'user details update successful',
    data: result,
  });
});

export const userController = {
  getMyProfile,
  getAllUser,
  getSingleUser,
  updateUser,
};
