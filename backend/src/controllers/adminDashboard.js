const User = require('../models/User');
const Booking = require('../models/Booking');
const PhotographyService = require('../models/PhotographyService');
const AdditionalService = require('../models/AdditionalService');
const { ADMIN_CONFIG, ADMIN_EMAILS } = require('../config/adminConfig');

// Middleware to verify admin password for Google-authenticated admins
const verifyAdminPassword = async (req, res, next) => {
  // Admin must be authenticated with Google
  if (!req.user || !req.user.googleId) {
    return res.status(403).json({
      success: false,
      message: 'Admin must authenticate using Google'
    });
  }

  const { adminPassword } = req.headers;
  
  // Find admin config for this user's email
  const adminConfig = ADMIN_CONFIG.find(
    admin => admin.email.toLowerCase() === req.user.email.toLowerCase()
  );

  if (!adminConfig) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized as admin',
      requiresPassword: true
    });
  }

  // Check if password matches
  if (!adminPassword || adminPassword !== adminConfig.password) {
    return res.status(403).json({
      success: false,
      message: 'Admin password verification required',
      requiresPassword: true
    });
  }

  // Password verified, proceed
  req.adminPasswordVerified = true;
  next();
};

// @desc    Get dashboard overview stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getDashboardStats = async (req, res, next) => {
  try {
    // Get counts of various resources
    const [userCount, bookingCount, photographyServiceCount, additionalServiceCount] = await Promise.all([
      User.countDocuments(),
      Booking.countDocuments(),
      PhotographyService.countDocuments(),
      AdditionalService.countDocuments()
    ]);

    // Get recent bookings
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Get revenue stats
    const bookings = await Booking.find();
    const totalRevenue = bookings.reduce((total, booking) => total + booking.totalAmount, 0);
    
    // Get bookings by status
    const pendingBookings = await Booking.countDocuments({ bookingStatus: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ bookingStatus: 'confirmed' });
    const canceledBookings = await Booking.countDocuments({ bookingStatus: 'canceled' });
    const completedBookings = await Booking.countDocuments({ bookingStatus: 'completed' });

    res.status(200).json({
      success: true,
      data: {
        counts: {
          users: userCount,
          bookings: bookingCount,
          photographyServices: photographyServiceCount,
          additionalServices: additionalServiceCount
        },
        recentBookings,
        financials: {
          totalRevenue,
          pendingPayments: await Booking.countDocuments({ paymentStatus: 'pending' }),
          paidBookings: await Booking.countDocuments({ paymentStatus: 'paid' })
        },
        bookingStatuses: {
          pending: pendingBookings,
          confirmed: confirmedBookings,
          canceled: canceledBookings,
          completed: completedBookings
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user details
// @route   GET /api/admin/users/:id
// @access  Private/Admin
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's bookings
    const bookings = await Booking.find({ user: req.params.id });

    res.status(200).json({
      success: true,
      data: {
        user,
        bookings
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    // Validate role
    if (!role || !['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid role (user or admin)'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent changing role of whitelisted admin emails to non-admin
    if (ADMIN_EMAILS.includes(user.email.toLowerCase()) && role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Cannot change role of whitelisted admin emails'
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get booking analytics
// @route   GET /api/admin/analytics/bookings
// @access  Private/Admin
exports.getBookingAnalytics = async (req, res, next) => {
  try {
    // Get all bookings
    const bookings = await Booking.find();

    // Group bookings by month
    const bookingsByMonth = {};
    bookings.forEach(booking => {
      const date = new Date(booking.createdAt);
      const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
      
      if (!bookingsByMonth[monthYear]) {
        bookingsByMonth[monthYear] = {
          count: 0,
          revenue: 0
        };
      }
      
      bookingsByMonth[monthYear].count += 1;
      bookingsByMonth[monthYear].revenue += booking.totalAmount;
    });

    // Group by service type
    const bookingsByService = {};
    for (const booking of bookings) {
      const service = await PhotographyService.findById(booking.photographyService);
      
      if (service) {
        const category = service.category;
        
        if (!bookingsByService[category]) {
          bookingsByService[category] = {
            count: 0,
            revenue: 0
          };
        }
        
        bookingsByService[category].count += 1;
        bookingsByService[category].revenue += booking.totalAmount;
      }
    }

    res.status(200).json({
      success: true,
      data: {
        bookingsByMonth,
        bookingsByService
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get revenue analytics
// @route   GET /api/admin/analytics/revenue
// @access  Private/Admin
exports.getRevenueAnalytics = async (req, res, next) => {
  try {
    // Get all bookings
    const bookings = await Booking.find();
    
    // Calculate total revenue
    const totalRevenue = bookings.reduce((total, booking) => total + booking.totalAmount, 0);
    
    // Calculate revenue by payment status
    const revenueByPaymentStatus = {
      pending: 0,
      paid: 0,
      refunded: 0,
      failed: 0
    };
    
    bookings.forEach(booking => {
      revenueByPaymentStatus[booking.paymentStatus] += booking.totalAmount;
    });
    
    // Calculate revenue by booking status
    const revenueByBookingStatus = {
      pending: 0,
      confirmed: 0,
      canceled: 0,
      completed: 0
    };
    
    bookings.forEach(booking => {
      revenueByBookingStatus[booking.bookingStatus] += booking.totalAmount;
    });

    res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        revenueByPaymentStatus,
        revenueByBookingStatus
      }
    });
  } catch (err) {
    next(err);
  }
};

// Export the middleware along with the controllers
exports.verifyAdminPassword = verifyAdminPassword; 