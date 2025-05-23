const User = require('../models/User');
const { validateAdminCredentials, ADMIN_CONFIG } = require('../config/adminConfig');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      });
    }

    // First validate against admin credentials
    const isValidAdmin = validateAdminCredentials(email, password);

    if (!isValidAdmin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

    // Find user in database or create if doesn't exist
    let user = await User.findOne({ email }).select('+password');

    if (!user) {
      // Create admin user if it doesn't exist
      user = await User.create({
        name: 'Admin',
        email,
        password,
        role: 'admin'
      });
    } else if (user.role !== 'admin') {
      // Ensure user has admin role
      user.role = 'admin';
      await user.save();
    }

    // Set a flag to indicate they've been verified through admin login
    req.adminPasswordVerified = true;
    
    sendTokenResponse(user, 200, res, true);
  } catch (err) {
    next(err);
  }
};

// @desc    Get current admin
// @route   GET /api/admin/me
// @access  Private/Admin
exports.getAdminProfile = async (req, res, next) => {
  try {
    // User already attached to req by auth middleware
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized as admin'
      });
    }

    res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Change admin password
// @route   PUT /api/admin/change-password
// @access  Private/Admin
exports.changeAdminPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const adminEmail = req.user.email;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password'
      });
    }

    // Validate current password
    const isValidAdmin = validateAdminCredentials(adminEmail, currentPassword);
    if (!isValidAdmin) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Find which admin config entry matches this email
    const adminIndex = ADMIN_CONFIG.findIndex(admin => 
      admin.email.toLowerCase() === adminEmail.toLowerCase()
    );

    if (adminIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Admin configuration not found'
      });
    }

    // Now update the .env file with the new password
    const envFilePath = path.resolve(process.cwd(), '.env');
    const envConfig = dotenv.parse(fs.readFileSync(envFilePath));

    // Determine which admin password to update (1, 2, or 3)
    let adminNumberToUpdate;
    for (let i = 1; i <= 3; i++) {
      if (envConfig[`ADMIN_EMAIL_${i}`]?.toLowerCase() === adminEmail.toLowerCase()) {
        adminNumberToUpdate = i;
        break;
      }
    }

    if (!adminNumberToUpdate) {
      return res.status(404).json({
        success: false,
        message: 'Admin entry not found in environment configuration'
      });
    }

    // Update the password in the .env file
    envConfig[`ADMIN_PASSWORD_${adminNumberToUpdate}`] = newPassword;

    // Convert the config object back to a string
    const newEnvContent = Object.entries(envConfig)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Write the updated content back to the .env file
    fs.writeFileSync(envFilePath, newEnvContent);

    // Reload environment variables
    process.env[`ADMIN_PASSWORD_${adminNumberToUpdate}`] = newPassword;

    res.status(200).json({
      success: true,
      message: 'Admin password changed successfully'
    });
  } catch (err) {
    next(err);
  }
};

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res, passwordVerified = false) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRE.replace(/\D/g, '') * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  // Use secure cookies in production
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      passwordVerified,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
}; 