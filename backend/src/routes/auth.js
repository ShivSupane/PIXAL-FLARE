const express = require('express');
const passport = require('passport');
const crypto = require('crypto');

const router = express.Router();

// Helpers to encode/decode state
const encodeState = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64');
const decodeState = (str) => JSON.parse(Buffer.from(str, 'base64').toString('utf8'));

// Start Google OAuth flow. Accepts an optional `next` or `state` query param for redirect destination.
router.get('/google', (req, res, next) => {
  try {
    const redirectPath = req.query.next || req.query.redirect || '/';

    // Create a random token to validate the roundtrip
    const stateToken = crypto.randomBytes(16).toString('hex');
    const statePayload = { token: stateToken, redirect: redirectPath };
    const stateParam = encodeState(statePayload);

    // Set a short-lived HttpOnly cookie to validate the roundtrip
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 5 * 60 * 1000, // 5 minutes
    };
    res.cookie('oauth_state', stateToken, cookieOptions);

    // Initiate passport authentication with the state parameter
    const authenticator = passport.authenticate('google', {
      scope: ['profile', 'email'],
      state: stateParam,
      session: false,
    });

    return authenticator(req, res, next);
  } catch (err) {
    return next(err);
  }
});

// OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/auth/google/failure', session: false }),
  (req, res) => {
    try {
      // passport attached the user to req.user
      if (!req.user) {
        return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/failure`);
      }

      // Validate state cookie against returned state param
      const rawState = req.query.state;
      if (!rawState) {
        console.warn('Missing state in OAuth callback');
        return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/failure`);
      }

      let stateObj;
      try {
        stateObj = decodeState(rawState);
      } catch (err) {
        console.warn('Invalid state in OAuth callback', err);
        return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/failure`);
      }

      const cookieState = req.cookies && req.cookies.oauth_state;
      if (!cookieState || cookieState !== stateObj.token) {
        console.warn('OAuth state mismatch or missing cookie');
        return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/failure`);
      }

      // Clear the oauth_state cookie
      res.clearCookie('oauth_state');

      // Issue JWT for the user
      // req.user is a mongoose model instance (we added getSignedJwtToken on it)
      const token = req.user.getSignedJwtToken();

      const safeUser = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      };

      const redirectBase = process.env.FRONTEND_URL || 'http://localhost:5173';
      const redirectPath = stateObj.redirect || '/';

      const fragmentParts = [
        `token=${encodeURIComponent(token)}`,
        `user=${encodeURIComponent(JSON.stringify(safeUser))}`,
      ];

      const redirectUrl = `${redirectBase.replace(/\/$/, '')}${redirectPath.startsWith('/') ? '' : '/'}${redirectPath}#${fragmentParts.join('&')}`;

      return res.redirect(redirectUrl);
    } catch (err) {
      console.error('Error in OAuth callback handler:', err);
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/failure`);
    }
  }
);

router.get('/google/failure', (req, res) => {
  res.status(401).json({ success: false, message: 'Google authentication failed' });
});

// Simple endpoint to verify current token (protected)
const protect = require('../middleware/auth');
router.get('/me', protect, (req, res) => {
  res.json({ success: true, data: req.user });
});

module.exports = router;
