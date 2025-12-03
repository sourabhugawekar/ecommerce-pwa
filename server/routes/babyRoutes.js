import express from 'express';
import { createOrUpdateBabyProfile, getBabyProfile } from '../controllers/babyController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.post('/', authMiddleware, createOrUpdateBabyProfile);
router.get('/me', authMiddleware, getBabyProfile);

export default router;
