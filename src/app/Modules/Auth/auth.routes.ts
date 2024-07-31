import { Router } from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../../middlewares/validation';
import { authValidation } from './auth.validation';
import { auth } from '../../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.post(
  '/register_user',
  validateRequest(authValidation.registerUserValidationSchema),
  authController.registerUser,
);

router.post(
  '/login_user',
  validateRequest(authValidation.loginUserValidationSchema),
  authController.loginUser,
);

router.get('/verify/:token', authController.verifyUser);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.recruiter, USER_ROLE.user),
  validateRequest(authValidation.changePasswordValidationSchema),
  authController.changePassword,
);

router.post(
  '/forgot-password',
  validateRequest(authValidation.forgotPasswordValidationSchema),
  authController.forgotPassword,
);

router.post(
  '/reset-password',
  validateRequest(authValidation.resetPasswordValidationSchema),
  authController.resetPassword,
);

export const authRoutes = router;
