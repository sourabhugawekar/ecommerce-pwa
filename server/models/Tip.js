import mongoose from 'mongoose';

const tipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Tip title is required'],
    trim: true
  },
  body: {
    type: String,
    required: [true, 'Tip body is required'],
    trim: true
  },
  ageRange: {
    type: String,
    enum: ['0-3 months', '3-6 months', '6-12 months', '12+ months', 'all'],
    default: 'all'
  },
  category: {
    type: String,
    enum: ['health', 'nutrition', 'sleep', 'development', 'safety', 'general'],
    default: 'general'
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

const Tip = mongoose.model('Tip', tipSchema);

export default Tip;
