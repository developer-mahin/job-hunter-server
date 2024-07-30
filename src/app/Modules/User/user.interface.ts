/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUser = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  photo: string;
  coverPhoto?: string;
  education?: string;
  headline?: string;
  info?: {
    tag?: string;
    website?: string;
    country?: string;
    city?: string;
  };
  status: 'active' | 'blocked';
  role: 'user' | 'recruiter' | 'admin';
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser>;
}
