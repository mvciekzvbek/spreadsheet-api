import { Router } from 'express';
import previewsController from '../controllers/previewsController';
import catchAsync from '../middlewares/catchAsync';
import validateUuid from '../middlewares/validateUuid';

const router = Router();

/**
 * Retrieves single preview
 */
router.get('/:uuid', validateUuid, catchAsync(previewsController.findOne));

export default router;
