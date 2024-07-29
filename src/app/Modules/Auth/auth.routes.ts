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

export const authRoutes = router;
