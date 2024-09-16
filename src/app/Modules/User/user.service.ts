/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../../utils/AppError';
import { decodeToken } from '../../../utils/decodeToken';
import config from '../../../config';
import { JwtPayload, Secret } from 'jsonwebtoken';
import User from './user.model';
import QueryBuilder from '../../../QueryBuilder/QueryBuilder';
import { TUser } from './user.interface';
import { USER_ROLE } from './user.constant';
import generateToken from '../../../utils/generateToken';
import mongoose from 'mongoose';

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

const deleteUserFormDB = async (
  id: string,
  payload: { isDeleted: boolean },
) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found !!');
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You are deleted user');
  }

  if (user.status === 'blocked') {
    throw new AppError(httpStatus.BAD_REQUEST, 'You are a blocked user');
  }

  await User.findByIdAndUpdate(id, payload, { new: true });
};

const changeUserRole = async (token: string) => {
  const user = decodeToken(
    token,
    config.jwt.access_token as string,
  ) as JwtPayload;

  let result;

  if (user.role === USER_ROLE.recruiter) {
    result = await User.findOneAndUpdate(
      { email: user.email },
      { $set: { role: 'user' } },
      { new: true },
    );
  } else if (user.role === USER_ROLE.user) {
    result = await User.findOneAndUpdate(
      { email: user.email },
      { $set: { role: 'recruiter' } },
      { new: true },
    );
  }

  const userData = {
    email: result?.email,
    userId: result?._id,
    role: result?.role,
  };

  const accessToken = generateToken(
    userData,
    config.jwt.access_token as Secret,
    config.jwt.access_expires_in as string,
  );

  const refreshToken = generateToken(
    userData,
    config.jwt.refresh_token as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const followUserIntoDB = async (token: string, userId: string) => {
  const user = decodeToken(
    token,
    config.jwt.access_token as string,
  ) as JwtPayload;

  const findMe = await User.findById(user.userId);
  const findFollowUser = await User.findById(userId);

  // Check if the user to follow exists
  if (!findFollowUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found with this ID');
  }

  if (!findMe) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found with this ID');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Update the other user's 'following' array
    let updatedUser;

    if (
      !findMe?.following?.some((follow) => follow.user.toString() === userId)
    ) {
      updatedUser = await User.findOneAndUpdate(
        { _id: findMe._id },
        {
          $push: {
            following: {
              user: userId,
            },
          },
        },
        { session, new: true },
      );
    } else {
      updatedUser = await User.findOneAndUpdate(
        { _id: findMe._id },
        {
          $pull: {
            following: {
              user: userId,
            },
          },
        },
        { session, new: true },
      );
    }

    // If no user is found or update fails
    if (!updatedUser) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Your profile wasn't updated; something went wrong!",
      );
    }

    // Update the other user's 'followers' array
    let updatedFollowUser;

    if (
      !findFollowUser?.followers?.some(
        (follow) => follow.user.toString() === user.userId,
      )
    ) {
      updatedFollowUser = await User.findOneAndUpdate(
        { _id: findFollowUser._id },
        {
          $push: {
            followers: {
              user: user.userId,
            },
          },
        },
        { session, new: true },
      );
    } else {
      updatedFollowUser = await User.findOneAndUpdate(
        { _id: findFollowUser._id },
        {
          $pull: {
            followers: {
              user: user.userId,
            },
          },
        },
        { session, new: true },
      );
    }

    // If the second update fails
    if (!updatedFollowUser) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Couldn't update the follow user's profile!",
      );
    }

    // Commit the transaction if everything is successful
    await session.commitTransaction();
    await session.endSession();

    return updatedUser;
  } catch (error: any) {
    // Rollback the transaction in case of an error
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const userService = {
  getMyProfileFromDB,
  getAllUsersFromDb,
  getSingleUsersFromDb,
  updateUserIntoDB,
  deleteUserFormDB,
  changeUserRole,
  followUserIntoDB,
};
