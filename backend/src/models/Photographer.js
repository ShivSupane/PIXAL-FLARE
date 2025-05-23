const mongoose = require('mongoose');

const photographerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide photographer name'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Please provide a role'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Please provide a location']
  },
  image: {
    type: String,
    default: 'default-profile.jpg'
  },
  bio: {
    type: String,
    required: [true, 'Please provide a short bio']
  },
  specialization: {
    type: String,
    required: [true, 'Please provide area of specialization']
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5'],
    default: 5.0
  },
  reviews: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Photographer', photographerSchema); 