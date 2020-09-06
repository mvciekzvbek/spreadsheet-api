import { Router } from 'express';
import spreadsheetsController from '../controllers/spreadsheetsController';
import catchAsync from '../middlewares/catchAsync';
import upload from '../middlewares/multer';

const router = Router();

/**
 * Uploads new spreadsheet
 */
router.post(
  '/',
  upload.single('spreadsheet'),
  catchAsync(spreadsheetsController.upload),
);

export default router;
