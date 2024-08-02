import { Router } from 'express';
import { authRoutes } from '../app/Modules/auth/auth.routes';
import { userRoutes } from '../app/Modules/User/user.routes';
import { postRoutes } from '../app/Modules/Post/post.routes';

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
  {
    path: '/post',
    route: postRoutes,
  },
];

routes.forEach((item) => {
  router.use(item.path, item.route);
});

export default router;
