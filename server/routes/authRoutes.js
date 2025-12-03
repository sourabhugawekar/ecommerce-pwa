import express from 'express';
import { signup, login, getCurrentUser, toggleFavorite, getFavorites } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/me', authMiddleware, getCurrentUser);
router.post('/favorites', authMiddleware, toggleFavorite);
router.get('/favorites', authMiddleware, getFavorites);

export default router;
