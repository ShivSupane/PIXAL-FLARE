const express = require('express');
const {
  getDashboardStats,
  getAllUsers,
  getUser,
  updateUserRole,
  getBookingAnalytics,
  getRevenueAnalytics,
  verifyAdminPassword
} = require('../controllers/adminDashboard');

const {
  getAdminProfile,
  changeAdminPassword
} = require('../controllers/adminAuth');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protected admin routes
// All routes below this line are protected with admin authorization
router.use(protect);
router.use(authorize('admin'));

// Admin profile
router.get('/me', getAdminProfile);

// Routes that need additional password verification if logged in via Google
// Add the verifyAdminPassword middleware to all sensitive admin routes
router.use(verifyAdminPassword);

// Admin dashboard routes
router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.get('/users/:id', getUser);
router.put('/users/:id/role', updateUserRole);
router.get('/analytics/bookings', getBookingAnalytics);
router.get('/analytics/revenue', getRevenueAnalytics);

// Admin password management
router.put('/change-password', changeAdminPassword);

// Verify admin password - for frontend to check if admin password is needed
router.post('/verify-password', (req, res) => {
  // If we reach here, the password has been verified by the middleware
  res.status(200).json({
    success: true,
    message: 'Admin password verified'
  });
});

module.exports = router; 

const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb+srv://Nikhsbro:Nikhil!19@pixelflair.zazaxf4.mongodb.net/";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db();
    const users = database.collection('users');
    
    // Find admin user
    const adminUser = await users.findOne({email: "20220801082@dypiu.ac.in"});
    console.log("User found:", adminUser);
    
    // Update role if needed
    if (adminUser && adminUser.role !== 'admin') {
      const result = await users.updateOne(
        {email: "20220801082@dypiu.ac.in"},
        {$set: {role: "admin"}}
      );
      console.log("Updated role to admin:", result.modifiedCount > 0);
    }
  } finally {
    await client.close();
  }
}

main().catch(console.error);