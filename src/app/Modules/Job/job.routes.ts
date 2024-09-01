import { Router } from 'express';
import validateRequest from '../../../middlewares/validation';
import { jobValidation } from './job.validation';
import { auth } from '../../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { jobController } from './job.controller';

const router = Router();

router.post(
  '/create_job',
  validateRequest(jobValidation.createJobValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.recruiter),
  jobController.createJob,
);

router.get(
  '/get_all_jobs',
  auth(USER_ROLE.admin, USER_ROLE.recruiter, USER_ROLE.user),
  jobController.getAllJob,
);

router.get(
  '/get_all_my_jobs',
  auth(USER_ROLE.admin, USER_ROLE.recruiter),
  jobController.getAllMyJob,
);

router.get(
  '/get_single_job/:jobId',
  auth(USER_ROLE.admin, USER_ROLE.recruiter, USER_ROLE.user),
  jobController.getSingleJob,
);

router.patch(
  '/update_job/:jobId',
  validateRequest(jobValidation.updateJobValidationSchema),
  auth(USER_ROLE.recruiter),
  jobController.updateJob,
);

router.delete(
  '/delete_job/:jobId',
  auth(USER_ROLE.recruiter),
  jobController.deleteJob,
);

export const jobRoutes = router;
