const express = require('express');
const {
  getPhotographyServices,
  getServicesByCategory,
  getPhotographyService,
  createPhotographyService,
  updatePhotographyService,
  deletePhotographyService
} = require('../controllers/photographyService');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getPhotographyServices);
router.get('/category/:category', getServicesByCategory);
router.get('/:id', getPhotographyService);

// Admin only routes
router.post('/', createPhotographyService);
router.put('/:id', protect, authorize('admin'), updatePhotographyService);
router.delete('/:id', protect, authorize('admin'), deletePhotographyService);

module.exports = router; 