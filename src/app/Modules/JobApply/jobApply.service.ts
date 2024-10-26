import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../../config';
import AppError from '../../../utils/AppError';
import { decodeToken } from '../../../utils/decodeToken';
import emailVerification from '../../../utils/emailVerification';
import { hiredHtml } from '../../Constant/hiredHtml';
import Job from '../Job/job.model';
import User from '../User/user.model';
import { TJobApply } from './jobApply.interface';
import JobApply from './jobApply.model';

const createJobApplyIntoDB = async (
  payload: TJobApply,
  jobId: string,
  token: string,
) => {
  const isJobExist = await Job.findById(jobId);
  if (!isJobExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Job not found');
  }

  const user = decodeToken(
    token,
    config.jwt.access_token as string,
  ) as JwtPayload;

  const applyData = {
    ...payload,
    jobId,
    candidateId: user.userId,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const result = await JobApply.create([applyData], { session });

    await Job.updateOne(
      { _id: jobId },
      { $push: { candidate: user.userId } },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Job application failed',
    );
  }
};

const selectCandidate = async (
  payload: { userId: string },
  jobId: string,
  token: string,
) => {
  const findJob = await Job.findById(jobId);
  const user = decodeToken(
    token,
    config.jwt.access_token as string,
  ) as JwtPayload;

  if (!findJob?.author?._id.equals(user.userId)) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not the job author');
  }

  // Find user by ID using new keyword
  const findUser = await User.findById(payload.userId);

  if (!findUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }

  const result = await Job.findByIdAndUpdate(
    jobId,
    {
      $set: { selectedCandidate: payload.userId },
    },
    { new: true },
  ).populate({
    path: 'selectedCandidate',
    model: 'User',
  });

  try {
    const mailData = {
      email: findUser.email,
      subject: `You are selected for the position of ${findJob.jobTitle} in ${findJob.companyName} company`,
      html: hiredHtml(findUser.name, findJob.jobTitle, findJob.companyName),
    };

    await emailVerification(mailData);
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'failed to send email');
  }

  return result;
};

export const jobApplyService = {
  createJobApplyIntoDB,
  selectCandidate,
};
