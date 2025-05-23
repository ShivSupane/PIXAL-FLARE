const express = require('express');
const passport = require('passport');
const { register, login, logout, getMe, changePassword } = require('../controllers/auth');
const { googleCallback } = require('../controllers/googleAuth');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Regular authentication routes
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePassword);

// Google OAuth routes
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback', 
  passport.authenticate('google', { 
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`
  }),
  googleCallback
);

module.exports = router; 