const User = require('../models/User');
const { ADMIN_EMAILS, ADMIN_CONFIG } = require('../config/adminConfig');
const { sendAdminAccessEmail } = require('../utils/emailSender');

// @desc    Process Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
exports.googleCallback = async (req, res, next) => {
  try {
    // The user info will be available in req.user from passport
    const { id, displayName, emails, photos } = req.user;
    
    if (!emails || emails.length === 0) {
      return next(new Error('No email found from Google account'));
    }
    
    const email = emails[0].value;
    
    // Check if email is in admin whitelist
    const isAdminEmail = ADMIN_EMAILS.includes(email.toLowerCase());
    
    // Check if user already exists
    let user = await User.findOne({ googleId: id });
    
    if (!user) {
      // Check if email already exists
      const emailExists = await User.findOne({ email });
      
      if (emailExists) {
        // Update existing user with Google ID
        emailExists.googleId = id;
        if (photos && photos.length > 0) {
          emailExists.profilePicture = photos[0].value;
        }
        
        // If this is an admin email, ensure they have admin role
        if (isAdminEmail) {
          emailExists.role = 'admin';
        }
        
        await emailExists.save();
        user = emailExists;
      } else {
        // Create new user
        user = await User.create({
          name: displayName,
          email,
          googleId: id,
          profilePicture: photos && photos.length > 0 ? photos[0].value : 'default-profile.jpg',
          role: isAdminEmail ? 'admin' : 'user' // Assign admin role if email is in whitelist
        });
        
        // If this is an admin email, log the creation
        if (isAdminEmail) {
          console.log(`Admin user created via Google OAuth: ${email}`);
        }
      }
    } else {
      // If the user exists but their email is in admin whitelist, ensure they have admin role
      if (isAdminEmail && user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
        console.log(`User ${email} upgraded to admin via Google OAuth`);
      }
    }
    
    // Create token
    const token = user.getSignedJwtToken();
    
    // Create cookie options
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_EXPIRE.replace(/\D/g, '') * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };

    // Determine redirect URL based on user role
    let redirectUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    
    // If user is admin, redirect to admin dashboard
    if (user.role === 'admin') {
      // Store admin status in token payload
      const adminConfig = ADMIN_CONFIG.find(admin => 
        admin.email.toLowerCase() === email.toLowerCase()
      );
      
      if (adminConfig) {
        // For admins via Google auth, they'll still need to verify password
        redirectUrl = `${redirectUrl}/admin/verify`;
        
        // Send admin login notification email
        try {
          await sendAdminAccessEmail(
            email,
            displayName,
            req.ip,
            new Date()
          );
        } catch (error) {
          console.error('Error sending admin access email:', error);
          // Continue with the authentication flow even if email fails
        }
      }
    }
    
    // Redirect to frontend with token in cookie
    res
      .cookie('token', token, options)
      .redirect(redirectUrl);
    
  } catch (err) {
    next(err);
  }
}; 