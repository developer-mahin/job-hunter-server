import { Router } from 'express';
import { auth } from '../../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { userController } from './user.controller';

const router = Router();

router.get(
  '/my_profile',
  auth(USER_ROLE.admin, USER_ROLE.recruiter, USER_ROLE.user),
  userController.getMyProfile,
);

router.get(
  '/all_users',
  auth(USER_ROLE.admin, USER_ROLE.recruiter, USER_ROLE.user),
  userController.getAllUser,
);

router.get(
  '/single_user/:id',
  auth(USER_ROLE.admin, USER_ROLE.recruiter, USER_ROLE.user),
  userController.getSingleUser,
);

router.patch(
  '/update_user/:id',
  auth(USER_ROLE.admin, USER_ROLE.recruiter, USER_ROLE.user),
  userController.updateUser,
);

export const userRoutes = router;
