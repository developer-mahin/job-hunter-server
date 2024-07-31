import httpStatus from 'http-status';
import AppError from '../../../utils/AppError';
import { decodeToken } from '../../../utils/decodeToken';
import config from '../../../config';
import { JwtPayload, Secret } from 'jsonwebtoken';
import User from './user.model';

const getMyProfileFromDB = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.FORBIDDEN, 'your are not authorized user');
  }

  const user = decodeToken(
    token,
    config.jwt.access_token as Secret,
  ) as JwtPayload;

  const isExist = await User.findOne({ email: user.email });

  if (!isExist) {
    throw new AppError(httpStatus.FORBIDDEN, 'User not found');
  }

  if (isExist.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are deleted user');
  }

  if (isExist.status === 'blocked') {
    throw new AppError(httpStatus.CONFLICT, 'You are a blocked user');
  }

  return isExist;
};

const getAllUsersFromDb = async () => {
  const users = await User.find({});
  return users;
};

const getSingleUsersFromDb = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found!!!');
  }

  return user;
};

export const userService = {
  getMyProfileFromDB,
  getAllUsersFromDb,
  getSingleUsersFromDb,
};
