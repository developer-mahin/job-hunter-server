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
import { hashPassword } from '../../../utils/hashPassword';
import { forgotPasswordHtml } from '../../Constant/forgotPasswordHtml';

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
    email: user?.email,
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

const changePassword = async (
  userData: JwtPayload,
  payload: { newPassword: string; oldPassword: string },
) => {
  const user = await User.isUserExist(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const checkIsDeleted = user?.isDeleted;
  if (checkIsDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are deleted user');
  }

  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.NOT_FOUND, 'You are a blocked user');
  }

  // compare old password
  const matchPassword = await isMatchedPassword(
    payload.oldPassword,
    user.password,
  );

  if (!matchPassword) {
    throw new AppError(httpStatus.FORBIDDEN, 'password not matched');
  }

  // hash new password
  const hashNewPassword = await hashPassword(
    payload?.newPassword,
    Number(config.salt_round) as number,
  );

  await User.findOneAndUpdate(
    { email: userData?.email, role: userData?.role },
    {
      password: hashNewPassword,
      passwordUpdatedAt: new Date(),
    },
  );

  return null;
};

const forgotPassword = async (email: string) => {
  const user = await User.isUserExist(email);
  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'User not found');
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User was deleted');
  }

  if (user.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'you are a block user');
  }

  const userDate = {
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    userDate,
    config.jwt.access_token as Secret,
    '5m',
  );

  const generatedLink = `${config.front_end_url}/forgot_password?email=${user?.email}&token=${accessToken}`;

  const mailData = {
    email: user.email,
    subject: 'Reset your password!!',
    html: forgotPasswordHtml(user.name, generatedLink),
  };

  emailVerification(mailData);
};

const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  const user = await User.isUserExist(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found! Invalid ID!!');
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User was deleted');
  }

  if (user.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'you are a block user');
  }

  const decoded = decodeToken(
    token,
    config.jwt.access_token as Secret,
  ) as JwtPayload;

  if (payload.email !== decoded.email) {
    throw new AppError(httpStatus.FORBIDDEN, 'Forbidden access');
  }

  const passwordHash = await hashPassword(
    payload.newPassword,
    Number(config.salt_round) as number,
  );

  await User.findOneAndUpdate(
    { email: payload.email, role: decoded.role },
    { password: passwordHash, passwordUpdatedAt: new Date() },
  );
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
  }

  const decoded = decodeToken(
    token,
    config.jwt.refresh_token as Secret,
  ) as JwtPayload;

  const { email, iat } = decoded;
  const user = await User.isUserExist(email);
  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'User not found');
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are deleted user');
  }

  if (
    user.passwordUpdatedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordUpdatedAt, iat as number)
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
  }

  if (user.status === 'blocked') {
    throw new AppError(httpStatus.CONFLICT, 'You are a blocked user');
  }

  const userData = {
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    userData,
    config.jwt.access_token as Secret,
    config.jwt.access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const authService = {
  registerUserIntoDB,
  verifyUser,
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
  refreshToken,
};
