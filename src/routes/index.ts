import { Router } from 'express';
import { authRoutes } from '../app/Modules/Auth/auth.routes';

const router = Router();

const routes = [
  {
    path: '/auth',
    route: authRoutes,
  },
];

routes.forEach((item) => {
  router.use(item.path, item.route);
});

export default router;
