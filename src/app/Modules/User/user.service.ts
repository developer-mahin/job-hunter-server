import httpStatus from 'http-status';
import AppError from '../../../utils/AppError';
import { decodeToken } from '../../../utils/decodeToken';
import config from '../../../config';
import { JwtPayload, Secret } from 'jsonwebtoken';
import User from './user.model';
import QueryBuilder from '../../../QueryBuilder/QueryBuilder';
import { TUser } from './user.interface';

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

const getAllUsersFromDb = async (query: Record<string, unknown>) => {
  const userSearchableQuery = [
    'name',
    'email',
    'education',
    'tag.country',
    'tag.city',
  ];

  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableQuery)
    .sort()
    .paginate()
    .filter();

  const result = await userQuery.queryModel;
  const meta = await userQuery.countTotal();
  return { result, meta };
};

const getSingleUsersFromDb = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found!!!');
  }

  return user;
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const { info, ...remainingData } = payload;

  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found!!!');
  }

  const modifiedData: Record<string, unknown> = {
    ...remainingData,
  };

  if (info && Object.keys(info).length) {
    for (const [key, value] of Object.entries(info)) {
      modifiedData[`info.${key}`] = value;
    }
  }

  const result = await User.findByIdAndUpdate(id, modifiedData, {
    new: true,
  });

  return result;
};

export const userService = {
  getMyProfileFromDB,
  getAllUsersFromDb,
  getSingleUsersFromDb,
  updateUserIntoDB,
};
