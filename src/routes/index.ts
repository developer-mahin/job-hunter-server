import { Router } from 'express';
import { authRoutes } from '../app/Modules/auth/auth.routes';
import { userRoutes } from '../app/Modules/User/user.routes';
import { postRoutes } from '../app/Modules/Post/post.routes';
import { commentRoutes } from '../app/Modules/comment/comment.routes';
import { likeRoutes } from '../app/Modules/like/like.routes';
import { jobRoutes } from '../app/Modules/Job/job.routes';
import { jobApplyRoutes } from '../app/Modules/JobApply/jobApply.routes';

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
  {
    path: '/like',
    route: likeRoutes,
  },
  {
    path: '/job',
    route: jobRoutes,
  },
  {
    path: '/job_apply',
    route: jobApplyRoutes,
  },
];

routes.forEach((item) => {
  router.use(item.path, item.route);
});

export default router;
