import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['clothing', 'diapers-care', 'feeding', 'toys', 'nursery', 'bath']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  badge: {
    type: String,
    default: ''
  },
  tagline: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  emoji: {
    type: String,
    default: '🍼'
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
