const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let ADMIN_EMAILS = [];
try {
  const adminConfig = require('../config/adminConfig');
  ADMIN_EMAILS = Array.isArray(adminConfig.ADMIN_EMAILS) ? adminConfig.ADMIN_EMAILS : [];
} catch (err) {
  ADMIN_EMAILS = [];
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    googleId: {
      type: String,
      index: true,
      sparse: true,
    },
    profilePicture: {
      type: String,
      default: 'default-profile.jpg',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

userSchema.pre('save', function (next) {
  if (this.isNew && this.email) {
    const emailLower = this.email.toLowerCase();
    if (ADMIN_EMAILS.includes(emailLower)) {
      this.role = 'admin';
    }
  }
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  if (!this.password) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.getSignedJwtToken = function () {
  const payload = {
    id: this._id,
    role: this.role,
    name: this.name,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
