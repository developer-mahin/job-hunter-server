import httpStatus from 'http-status';
import AppError from '../../../utils/AppError';
import User from '../User/user.model';
import { TLoginUser, TRegisterUser } from './auth.interface';
import generateToken from '../../../utils/generateToken';
import config from '../../../config';
import { JwtPayload, Secret } from 'jsonwebtoken';
import emailVerification from '../../../utils/emailVerification';
import { verifyHtml } from '../../Constant/verifyHtml';
import { decodeToken } from '../../../utils/decodeToken';
import { Response } from 'express';
import { isMatchedPassword } from '../../../utils/matchPassword';

const registerUserIntoDB = async (payload: TRegisterUser) => {
  const isExist = await User.findOne({
    email: payload.email,
  });

  if (isExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'User already exist with this email address please try again with another email address',
    );
  }

  const token = generateToken(payload, config.jwt.access_token as Secret, '5m');

  try {
    const mailData = {
      email: payload.email,
      subject: 'Account Activation Email',
      html: verifyHtml(payload.name, token, config.server_url as string),
    };

    await emailVerification(mailData);
  } catch (error) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'failed to send verification email',
    );
  }
};

const verifyUser = async (res: Response, token: string) => {
  const user = decodeToken(
    token,
    config.jwt.access_token as Secret,
  ) as JwtPayload;

  const { name, email, password, confirmPassword, photo } = user;

  const isExistUser = await User.exists({ email });

  if (isExistUser) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'user already with this email address please try another email address',
    );
  }

  await User.create({
    name,
    email,
    password,
    confirmPassword,
    photo,
  });

  res.redirect(`${config.front_end_url}/login`);
};

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  const user = await User.isUserExist(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  const checkUserStatus = user?.status;
  if (checkUserStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  const matchPassword = await isMatchedPassword(password, user.password);

  if (!matchPassword) {
    throw new AppError(httpStatus.FORBIDDEN, 'password not matched');
  }

  const userDate = {
    userId: user?.email,
    role: user?.role,
  };

  const accessToken = generateToken(
    userDate,
    config.jwt.access_token as Secret,
    config.jwt.access_expires_in as string,
  );

  const refreshToken = generateToken(
    userDate,
    config.jwt.refresh_token as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const authService = {
  registerUserIntoDB,
  verifyUser,
  loginUser,
};
