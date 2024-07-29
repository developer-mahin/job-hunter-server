import mongoose from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new mongoose.Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    confirmPassword: {
      type: String,
      required: [true, 'Confirm Password is required'],
    },
    photo: {
      type: String,
      required: [true, 'Photo is required'],
    },
    coverPhoto: String,
    education: String,
    headline: String,
    info: {
      tag: String,
      website: String,
      country: String,
      city: String,
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      required: [true, 'Status is required'],
    },
    role: {
      type: String,
      enum: ['user', 'recruiter', 'admin'],
      required: [true, 'Role is required'],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<TUser>('User', userSchema);
export default User;
