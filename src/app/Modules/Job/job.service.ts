import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import QueryBuilder from '../../../QueryBuilder/QueryBuilder';
import AppError from '../../../utils/AppError';
import { decodeToken } from '../../../utils/decodeToken';
import { TJob } from './job.interface';
import Job from './job.model';
import JobApply from '../JobApply/jobApply.model';

const createJobIntoDB = async (payload: TJob, token: string) => {
  const decode = decodeToken(
    token,
    config.jwt.access_token as Secret,
  ) as JwtPayload;

  const jobData = {
    ...payload,
    author: decode.userId,
  };

  const result = await Job.create(jobData);
  return result;
};

const getAllJobFromDB = async (query: Record<string, unknown>) => {
  const jobSearchableQuery = ['jobTitle', 'jobType'];

  // console.log(query)

  const jobQuery = new QueryBuilder(
    Job.find({}).populate('author').populate({
      path: 'candidate',
      model: 'User',
    }),
    query,
  )
    .search(jobSearchableQuery)
    .paginate()
    .filter()
    .sort();

  const result = await jobQuery.queryModel;

  const meta = await jobQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleJobFromDB = async (jobId: string) => {
  const applyJob = await JobApply.find({
    jobId,
  })
    .populate({
      path: 'candidateId',
      model: 'User',
    })
    .populate({
      path: 'jobId',
      model: 'Job',
    });

  return applyJob;
};

const getAllMyJobFromDB = async (
  query: Record<string, unknown>,
  token: string,
) => {
  const jobSearchableQuery = ['jobDetails'];
  const decode = decodeToken(
    token,
    config.jwt.access_token as Secret,
  ) as JwtPayload;

  const jobQuery = new QueryBuilder(
    Job.find({ author: decode.userId }).populate('author').populate({
      path: 'candidate',
      model: 'User',
    }),
    query,
  )
    .search(jobSearchableQuery)
    .paginate()
    .sort();
  const result = await jobQuery.queryModel;
  const meta = await jobQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getUserJobFromDB = async (
  query: Record<string, unknown>,
  userId: string,
) => {
  const jobSearchableQuery = ['jobDetails'];

  const jobQuery = new QueryBuilder(
    Job.find({ author: userId }).populate('author').populate({
      path: 'comments.user',
      model: 'User',
    }),
    query,
  )
    .search(jobSearchableQuery)
    .paginate()
    .sort();
  const result = await jobQuery.queryModel;
  const meta = await jobQuery.countTotal();
  return {
    result,
    meta,
  };
};

const updateJobIntoDB = async (
  token: string,
  jobId: string,
  payload: Partial<TJob>,
) => {
  const decode = decodeToken(
    token,
    config.jwt.access_token as Secret,
  ) as JwtPayload;

  const findJob = await Job.findById(jobId);

  if (!findJob?.author?.equals(decode?.userId)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'your are not the author of this job',
    );
  }

  return await Job.findByIdAndUpdate(jobId, payload, { new: true });
};

const deleteJobFromDB = async (jobId: string, token: string) => {
  const decode = decodeToken(
    token,
    config.jwt.access_token as Secret,
  ) as JwtPayload;

  const findJob = await Job.findById(jobId);

  if (!findJob?.author?.equals(decode?.userId)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'your are not the author of this job',
    );
  }

  return await Job.findByIdAndDelete(jobId);
};

export const jobService = {
  createJobIntoDB,
  getAllJobFromDB,
  getSingleJobFromDB,
  updateJobIntoDB,
  deleteJobFromDB,
  getUserJobFromDB,
  getAllMyJobFromDB,
};
