import multer from 'multer';
import { Router } from 'express';
import spreadsheetsController from '../controllers/spreadsheetsController';
import catchAsync from '../middlewares/catchAsync';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

/**
 * Uploads new spreadsheet
 */
router.post('/', upload.single('spreadsheet'), catchAsync(spreadsheetsController.upload));

export default router;
