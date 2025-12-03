import express from 'express';
import {
  getDashboardStats,
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllBundlesAdmin,
  createBundle,
  updateBundle,
  deleteBundle,
  getAllTipsAdmin,
  createTip,
  updateTip,
  deleteTip,
  getAllUsers,
  getAllOrders,
  updateOrderStatus
} from '../controllers/adminController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(authMiddleware, adminMiddleware);

// Dashboard
router.get('/stats', getDashboardStats);

// Products
router.get('/products', getAllProductsAdmin);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Bundles
router.get('/bundles', getAllBundlesAdmin);
router.post('/bundles', createBundle);
router.put('/bundles/:id', updateBundle);
router.delete('/bundles/:id', deleteBundle);

// Tips
router.get('/tips', getAllTipsAdmin);
router.post('/tips', createTip);
router.put('/tips/:id', updateTip);
router.delete('/tips/:id', deleteTip);

// Users
router.get('/users', getAllUsers);

// Orders
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

export default router;
