import express from 'express';
import { getAllTips, getRandomTip } from '../controllers/tipController.js';

const router = express.Router();

// Public routes
router.get('/', getAllTips);
router.get('/random', getRandomTip);

export default router;
