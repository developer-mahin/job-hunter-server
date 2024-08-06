import { Router } from 'express';
import { likeController } from './like.controller';

const router = Router();

router.post('/:postId', likeController.clickToLike);

export const likeRoutes = router;
