import mongoose from 'mongoose';
import { TUser, UserModel } from './user.interface';
import { hashPassword } from '../../../utils/hashPassword';
import config from '../../../config';

const userSchema = new mongoose.Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: 0,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Confirm Password is required'],
      select: 0,
    },
    photo: {
      type: String,
      required: [true, 'Photo is required'],
    },
    phoneNumber: {
      type: String,
    },
    about: {
      type: String,
    },
    coverPhoto: String,
    education: {
      type: String,
      trim: true,
    },
    headline: {
      type: String,
      trim: true,
    },
    info: {
      tag: {
        type: String,
        trim: true,
      },
      website: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
    },
    passwordUpdatedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      required: [true, 'Status is required'],
      default: 'active',
    },
    role: {
      type: String,
      enum: ['user', 'recruiter', 'admin'],
      required: [true, 'Role is required'],
      default: 'user',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  this.password = (await hashPassword(
    this.password,
    Number(config.salt_round) as number,
  )) as string;

  this.confirmPassword = this.password;

  next();
});

// query middlewares
userSchema.pre('find', async function (next) {
  this.find({ isDeleted: false });
  next();
});

userSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

userSchema.post('save', function (doc, next) {
  this.password = '';
  this.confirmPassword = '';
  doc.confirmPassword = '';
  doc.password = '';
  next();
});

userSchema.statics.isUserExist = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangeTimeStamps: Date,
  jwtIssuedTimeStamps: number,
) {
  const passwordChangedTime =
    new Date(passwordChangeTimeStamps).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimeStamps;
};

const User = mongoose.model<TUser, UserModel>('User', userSchema);
export default User;
