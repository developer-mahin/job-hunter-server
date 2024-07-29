import httpStatus from 'http-status';
import AppError from '../../../utils/AppError';
import User from '../User/user.model';
import { TRegisterUser } from './auth.interface';
import generateToken from '../../../utils/generateToken';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import emailVerification from '../../../utils/emailVerification';
import { verifyHtml } from '../../Constant/verifyHtml';

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

  const token = generateToken(
    payload,
    config.jwt.access_token as Secret,
    config.jwt.access_expires_in as string,
  );

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

const verifyUser = async (token: string) => {
  console.log(token);
};

export const authService = {
  registerUserIntoDB,
  verifyUser,
};
