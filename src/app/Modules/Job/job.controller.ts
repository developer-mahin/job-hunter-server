import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { jobService } from './job.service';

const createJob = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await jobService.createJobIntoDB(req.body, token as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Job created successful',
    data: result,
  });
});

const getAllJob = catchAsync(async (req, res) => {
  const result = await jobService.getAllJobFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Job retrieve successful',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleJob = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  const result = await jobService.getSingleJobFromDB(jobId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Job retrieve successful',
    data: result,
  });
});

const getAllMyJob = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await jobService.getAllMyJobFromDB(req.query, token as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Job retrieve successful',
    meta: result.meta,
    data: result.result,
  });
});

const getUserJob = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await jobService.getUserJobFromDB(req.query, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Job retrieve successful',
    meta: result.meta,
    data: result.result,
  });
});

const updateJob = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  const token = req.headers.authorization;
  const result = await jobService.updateJobIntoDB(
    token as string,
    jobId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Job update successful',
    data: result,
  });
});

const deleteJob = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  const token = req.headers.authorization;
  const result = await jobService.deleteJobFromDB(jobId, token as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Job delete successful',
    data: result,
  });
});

export const jobController = {
  createJob,
  getAllJob,
  getSingleJob,
  updateJob,
  deleteJob,
  getUserJob,
  getAllMyJob,
};
