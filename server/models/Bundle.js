import mongoose from 'mongoose';

const bundleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Bundle name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  productIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  bundlePrice: {
    type: Number,
    required: [true, 'Bundle price is required'],
    min: 0
  },
  originalPrice: {
    type: Number, // Sum of individual product prices
    min: 0
  },
  discount: {
    type: Number, // Percentage discount
    min: 0,
    max: 100,
    default: 0
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop'
  },
  ageRange: {
    type: String,
    enum: ['0-3 months', '3-6 months', '6-12 months', '12+ months', 'all'],
    default: 'all'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Bundle = mongoose.model('Bundle', bundleSchema);

export default Bundle;
