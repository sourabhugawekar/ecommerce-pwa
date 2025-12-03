import mongoose from 'mongoose';

const babySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  babyName: {
    type: String,
    required: [true, 'Baby name is required'],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say'],
    required: true
  },
  weight: {
    type: Number, // in kg
    min: 0
  },
  height: {
    type: Number, // in cm
    min: 0
  },
  skinType: {
    type: String,
    enum: ['sensitive', 'normal', 'dry', 'combination'],
    default: 'normal'
  },
  allergyNote: {
    type: String,
    trim: true,
    maxlength: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Virtual field to calculate baby age in months
babySchema.virtual('ageInMonths').get(function() {
  const now = new Date();
  const birthDate = new Date(this.dateOfBirth);
  const months = (now.getFullYear() - birthDate.getFullYear()) * 12 + 
                  (now.getMonth() - birthDate.getMonth());
  return Math.max(0, months);
});

// Ensure virtuals are included in JSON
babySchema.set('toJSON', { virtuals: true });
babySchema.set('toObject', { virtuals: true });

const Baby = mongoose.model('Baby', babySchema);

export default Baby;
