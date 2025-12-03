import express from 'express';
import { getAllBundles, getBundleById, getBundlesByAge } from '../controllers/bundleController.js';

const router = express.Router();

// Public routes
router.get('/', getAllBundles);
router.get('/age/:ageRange', getBundlesByAge);
router.get('/:id', getBundleById);

export default router;
