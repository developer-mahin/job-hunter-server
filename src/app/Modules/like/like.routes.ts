import { Router } from 'express';
import { likeController } from './like.controller';
import { auth } from '../../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.post(
  '/:postId',
  auth(USER_ROLE.admin, USER_ROLE.recruiter, USER_ROLE.user),
  likeController.clickToLike,
);

router.get(
  '/:postId',
  auth(USER_ROLE.admin, USER_ROLE.recruiter, USER_ROLE.user),
  likeController.getLikedUser,
);

export const likeRoutes = router;
