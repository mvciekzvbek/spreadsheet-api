import { Router } from 'express';
import previewsController from '../controllers/previewsController';
import catchAsync from '../middlewares/catchAsync';

const router = Router();

/**
 * Retrieves single preview
 */
router.get('/:uuid', catchAsync(previewsController.findOne));

export default router;
