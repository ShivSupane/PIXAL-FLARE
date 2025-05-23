const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ADMIN_EMAILS } = require('../config/adminConfig');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password in queries
  },
  googleId: {
    type: String
  },
  profilePicture: {
    type: String,
    default: 'default-profile.jpg'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Check if email is in admin whitelist and set role accordingly
userSchema.pre('save', async function(next) {
  // Only run if this is a new user or email was modified
  if (this.isNew || this.isModified('email')) {
    // Check if the email is in the admin whitelist
    if (ADMIN_EMAILS.includes(this.email.toLowerCase())) {
      this.role = 'admin';
    } else {
      // Make sure non-admin emails always have user role
      // This prevents someone from setting their role to admin manually
      this.role = 'user';
    }
  }
  next();
});

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  // Only run if password was modified
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this._id }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 