import { Router } from 'express';
import { auth } from '../../../middlewares/auth';
import validateRequest from '../../../middlewares/validation';
import { USER_ROLE } from '../User/user.constant';
import { commentController } from './comment.controller';
import { commentValidation } from './comment.validation';

const router = Router();

router.post(
  '/create_comment/:postId',
  validateRequest(commentValidation.commentValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.recruiter, USER_ROLE.user),
  commentController.createComment,
);

router.patch(
  '/update_comment/:postId',
  validateRequest(commentValidation.updateCommentValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.recruiter, USER_ROLE.user),
  commentController.updateComment,
);

export const commentRoutes = router;
