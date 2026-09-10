const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/User');

const setupPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails && profile.emails[0] && profile.emails[0].value;
          if (!email) return done(new Error('No email found in Google profile'), null);

          // Find existing user by email
          let user = await User.findOne({ email }).select('+password');

          if (!user) {
            // Create a new user with google profile
            user = await User.create({
              name: profile.displayName || 'No name',
              email,
              googleId: profile.id,
              profilePicture: profile.photos && profile.photos[0] && profile.photos[0].value,
              // no password for oauth users
            });
          } else if (!user.googleId) {
            // Update existing user to attach googleId if not set
            user.googleId = profile.id;
            await user.save();
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  // For session support (optional). We store user's id in session.
  passport.serializeUser((user, done) => {
    done(null, user.id || user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).select('-password');
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};

module.exports = setupPassport;
