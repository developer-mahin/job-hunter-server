import httpStatus from 'http-status';
import AppError from '../../../utils/AppError';
import Job from '../Job/job.model';
import { TJobApply } from './jobApply.interface';
import { decodeToken } from '../../../utils/decodeToken';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../../config';
import mongoose from 'mongoose';
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
  }
};

export const jobApplyService = {
  createJobApplyIntoDB,
};
