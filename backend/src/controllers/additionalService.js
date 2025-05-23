const AdditionalService = require('../models/AdditionalService');

// @desc    Get all additional services
// @route   GET /api/additional-services
// @access  Public
exports.getAdditionalServices = async (req, res, next) => {
  try {
    const services = await AdditionalService.find();

    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single additional service
// @route   GET /api/additional-services/:id
// @access  Public
exports.getAdditionalService = async (req, res, next) => {
  try {
    const service = await AdditionalService.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Additional service not found'
      });
    }

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new additional service
// @route   POST /api/additional-services
// @access  Private/Admin
exports.createAdditionalService = async (req, res, next) => {
  try {
    const service = await AdditionalService.create(req.body);

    res.status(201).json({
      success: true,
      data: service
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update additional service
// @route   PUT /api/additional-services/:id
// @access  Private/Admin
exports.updateAdditionalService = async (req, res, next) => {
  try {
    const service = await AdditionalService.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Additional service not found'
      });
    }

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete additional service
// @route   DELETE /api/additional-services/:id
// @access  Private/Admin
exports.deleteAdditionalService = async (req, res, next) => {
  try {
    const service = await AdditionalService.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Additional service not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
}; 