import { Router } from 'express';
import spreadsheetsController from '../controllers/spreadsheetsController';
import catchAsync from '../middlewares/catchAsync';

const router = Router();

/**
 * Uploads new spreadsheet
 */
router.post('/', catchAsync(spreadsheetsController.upload));

export default router;
