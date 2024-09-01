import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { jobApplyService } from './jobApply.service';

const createJobApply = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const { jobId } = req.params;
  const result = await jobApplyService.createJobApplyIntoDB(
    req.body,
    jobId,
    token as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Job applied successful',
    data: result,
  });
});

const selectCandidate = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const { jobId } = req.params;
  const result = await jobApplyService.selectCandidate(
    req.body,
    jobId,
    token as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User Selected Successful',
    data: result,
  });
});

export const jobApplyController = {
  createJobApply,
  selectCandidate,
};
