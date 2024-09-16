/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TFollowers = {
  user: Types.ObjectId;
};

export type TFollowing = {
  user: Types.ObjectId;
};

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  photo: string;
  coverPhoto?: string;
  phoneNumber?: string;
  education?: string;
  headline?: string;
  about?: string;
  followers?: TFollowers[];
  following?: TFollowing[];
  info?: {
    tag?: string;
    website?: string;
    country?: string;
    city?: string;
  };
  passwordUpdatedAt?: Date;
  status: 'active' | 'blocked';
  role: 'user' | 'recruiter' | 'admin';
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangeTimeStamps: Date,
    jwtIssuedTimeStamps: number,
  ): boolean;
}
