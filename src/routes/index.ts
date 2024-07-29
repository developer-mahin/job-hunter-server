import { Router } from 'express';
import { userRoutes } from '../app/Modules/User/user.routes';

const router = Router();

const routes = [
  {
    path: '/auth',
    route: userRoutes,
  },
];

routes.forEach((item) => {
  router.use(item.path, item.route);
});

export default router;
