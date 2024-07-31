import { Router } from 'express';
import { authRoutes } from '../app/Modules/auth/auth.routes';
import { userRoutes } from '../app/Modules/User/user.routes';

const router = Router();

const routes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
];

routes.forEach((item) => {
  router.use(item.path, item.route);
});

export default router;
