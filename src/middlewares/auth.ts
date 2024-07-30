import httpStatus from 'http-status';
import { TUserRole } from '../interface';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import { decodeToken } from '../utils/decodeToken';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../config';
import User from '../app/Modules/User/user.model';

export const auth = (...requestedRole: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
    }

    const decoded = decodeToken(
      token,
      config.jwt.access_token as Secret,
    ) as JwtPayload;

    const { role, email, iat } = decoded;

    if (requestedRole && !requestedRole.includes(role)) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
    }

    const user = await User.isUserExist(email);

    if (!user) {
      throw new AppError(httpStatus.FORBIDDEN, 'User not found');
    }

    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are deleted user');
    }

    if (user.status === 'blocked') {
      throw new AppError(httpStatus.CONFLICT, 'You are a blocked user');
    }

    if (
      user.passwordUpdatedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordUpdatedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
