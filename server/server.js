import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import babyRoutes from './routes/babyRoutes.js';
import bundleRoutes from './routes/bundleRoutes.js';
import tipRoutes from './routes/tipRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://effective-space-trout-g9wr4x7vxwvcw9xw-5173.app.github.dev'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/babies', babyRoutes);
app.use('/api/bundles', bundleRoutes);
app.use('/api/tips', tipRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'BabyBliss API is running' });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/babybliss');
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API endpoint: http://localhost:${PORT}/api`);
  });
});

export default app;
