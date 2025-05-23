const PhotographyService = require('../models/PhotographyService');

// @desc    Get all photography services
// @route   GET /api/services
// @access  Public
exports.getPhotographyServices = async (req, res, next) => {
  try {
    const services = await PhotographyService.find();

    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get photography services by category
// @route   GET /api/services/category/:category
// @access  Public
exports.getServicesByCategory = async (req, res, next) => {
  try {
    const services = await PhotographyService.find({ 
      category: req.params.category 
    });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single photography service
// @route   GET /api/services/:id
// @access  Public
exports.getPhotographyService = async (req, res, next) => {
  try {
    const service = await PhotographyService.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
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

// @desc    Create new photography service
// @route   POST /api/services
// @access  Private/Admin
exports.createPhotographyService = async (req, res, next) => {
  try {
    const service = await PhotographyService.create(req.body);

    res.status(201).json({
      success: true,
      data: service
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update photography service
// @route   PUT /api/services/:id
// @access  Private/Admin
exports.updatePhotographyService = async (req, res, next) => {
  try {
    const service = await PhotographyService.findByIdAndUpdate(
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
        message: 'Service not found'
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

// @desc    Delete photography service
// @route   DELETE /api/services/:id
// @access  Private/Admin
exports.deletePhotographyService = async (req, res, next) => {
  try {
    const service = await PhotographyService.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
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