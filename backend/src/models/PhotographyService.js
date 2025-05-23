const mongoose = require('mongoose');

const photographyServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a service name'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: ['wedding', 'baby shower', 'product', 'event', 'portrait', 'commercial', 'other']
  },
  basePrice: {
    type: Number,
    required: [true, 'Please provide a base price']
  },
  duration: {
    type: Number, // in hours
    required: [true, 'Please specify duration in hours']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PhotographyService', photographyServiceSchema); 