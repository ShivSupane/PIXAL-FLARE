const express = require('express');
const {
  getAdditionalServices,
  getAdditionalService,
  createAdditionalService,
  updateAdditionalService,
  deleteAdditionalService
} = require('../controllers/additionalService');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAdditionalServices);
router.get('/:id', getAdditionalService);

// Admin only routes
// router.post('/', protect, authorize('admin'), createAdditionalService);

router.post('/', createAdditionalService);
router.put('/:id', protect, authorize('admin'), updateAdditionalService);
router.delete('/:id', protect, authorize('admin'), deleteAdditionalService);

module.exports = router; 