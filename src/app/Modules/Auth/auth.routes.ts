import { Router } from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../../middlewares/validation';
import { authValidation } from './auth.validation';

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

export const authRoutes = router;
