import express from 'express';
import { createOrder, getUserOrders, getOrderById } from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getUserOrders);
router.get('/:id', authMiddleware, getOrderById);

export default router;
