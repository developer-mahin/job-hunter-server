import { Router } from 'express';
import { auth } from '../../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../../middlewares/validation';
import { jobApplyValidation } from './jobApply.validation';
import { jobApplyController } from './jobApply.controller';

const router = Router();

router.post(
  '/:jobId',
  auth(USER_ROLE.user),
  validateRequest(jobApplyValidation.createJobApplyValidationSchema),
  jobApplyController.createJobApply,
);

export const jobApplyRoutes = router;
