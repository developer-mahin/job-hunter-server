import { Router } from 'express';
import { authRoutes } from '../app/Modules/auth/auth.routes';
import { userRoutes } from '../app/Modules/User/user.routes';
import { postRoutes } from '../app/Modules/Post/post.routes';
import { commentRoutes } from '../app/Modules/comment/comment.routes';

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
  {
    path: '/comment',
    route: commentRoutes,
  },
];

routes.forEach((item) => {
  router.use(item.path, item.route);
});

export default router;
