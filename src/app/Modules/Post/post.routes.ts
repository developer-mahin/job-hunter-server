import { Router } from 'express';
import { postController } from './post.controller';
import validateRequest from '../../../middlewares/validation';
import { postValidation } from './post.validation';
import { auth } from '../../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.post(
  '/create_post',
  validateRequest(postValidation.createPostValidationSchema),
  auth(USER_ROLE.user, USER_ROLE.recruiter, USER_ROLE.admin),
  postController.createPost,
);

router.get(
  '/all_post',
  auth(USER_ROLE.user, USER_ROLE.recruiter, USER_ROLE.admin),
  postController.getAllPost,
);

router.get(
  '/my_posts',
  auth(USER_ROLE.user, USER_ROLE.recruiter, USER_ROLE.admin),
  postController.getAllMyPost,
);

router.get(
  '/user_post/:userId',
  auth(USER_ROLE.user, USER_ROLE.recruiter, USER_ROLE.admin),
  postController.getUserPost,
);

router.get(
  '/all_single_post/:postId',
  auth(USER_ROLE.user, USER_ROLE.recruiter, USER_ROLE.admin),
  postController.getSinglePost,
);

router.patch(
  '/update_post/:postId',
  validateRequest(postValidation.updatePostValidationSchema),
  auth(USER_ROLE.user, USER_ROLE.recruiter, USER_ROLE.admin),
  postController.updatePost,
);

router.delete(
  '/delete_post/:postId',
  auth(USER_ROLE.user, USER_ROLE.recruiter, USER_ROLE.admin),
  postController.deletePost,
);

export const postRoutes = router;
