const PhotographyService = require('../models/PhotographyService');
const AdditionalService = require('../models/AdditionalService');
const Booking = require('../models/Booking');

// Create a new booking
exports.createBooking = async (req, res, next) => {
  try {
    const {
      photographyServiceId,
      additionalServices,
      eventDate,
      eventLocation,
      contactDetails,
      specialRequirements
    } = req.body;

    // Validate required fields
    if (!photographyServiceId || !eventDate || !eventLocation || !contactDetails) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Fetch the base photography service
    const photographyService = await PhotographyService.findById(photographyServiceId);
    if (!photographyService) {
      return res.status(404).json({
        success: false,
        message: 'Photography service not found'
      });
    }

    // Start with base price
    let totalAmount = photographyService.basePrice;
    const processedAdditionalServices = [];

    // Handle additional services
    if (additionalServices && additionalServices.length > 0) {
      const serviceIds = additionalServices.map(item => item.serviceId);

      const services = await AdditionalService.find({
        _id: { $in: serviceIds }
      });

      // Check if all services were found
      if (services.length !== serviceIds.length) {
        return res.status(404).json({
          success: false,
          message: 'One or more additional services not found'
        });
      }

      // Create a map for quick lookup
      const servicesMap = {};
      services.forEach(service => {
        servicesMap[service._id.toString()] = service;
      });

      // Process each requested additional service
      additionalServices.forEach(item => {
        const service = servicesMap[item.serviceId];
        if (!service) return; // Skip if not found (just in case)

        const quantity = item.quantity || 1;
        totalAmount += service.price * quantity;

        processedAdditionalServices.push({
          service: item.serviceId,
          quantity
        });
      });
    }

    // Create booking object
    const bookingData = {
      user: "682ef4ef6012bbd599b3a4bb",
      photographyService: photographyServiceId,
      additionalServices: processedAdditionalServices,
      eventDate,
      eventLocation,
      contactDetails,
      specialRequirements,
      totalAmount,
      paymentStatus: 'pending',
      bookingStatus: 'pending'
    };

    // Save to database
    const booking = await Booking.create(bookingData);

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (err) {
    console.error('Booking creation error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while creating booking',
      error: err.message
    }); 
  }
};

// @desc    Calculate total price for a booking
// @route   POST /api/bookings/calculate
// @access  Private
exports.calculateBookingPrice = async (req, res, next) => {
  try {
    const { photographyServiceId, additionalServices } = req.body;

    // Validate required fields
    if (!photographyServiceId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a photography service'
      });
    }

    // Get base photography service
    const photographyService = await PhotographyService.findById(photographyServiceId);
    if (!photographyService) {
      return res.status(404).json({
        success: false,
        message: 'Photography service not found'
      });
    }

    // Start with base price
    let totalAmount = photographyService.basePrice;

    // Add additional services price if any
    if (additionalServices && additionalServices.length > 0) {
      // Get all additional service ids
      const serviceIds = additionalServices.map(item => item.serviceId);
      
      // Find all services in one query
      const services = await AdditionalService.find({
        _id: { $in: serviceIds }
      });

      // Create a map for quick lookup
      const servicesMap = {};
      services.forEach(service => {
        servicesMap[service._id.toString()] = service;
      });

      // Calculate additional services total
      additionalServices.forEach(item => {
        const service = servicesMap[item.serviceId];
        if (service) {
          const quantity = item.quantity || 1;
          totalAmount += service.price * quantity;
        }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        basePrice: photographyService.basePrice,
        totalAmount,
        photographyService,
        calculationDetails: {
          baseService: {
            name: photographyService.name,
            price: photographyService.basePrice
          },
          additionalServicesCalculation: additionalServices && additionalServices.map(item => {
            const service = servicesMap[item.serviceId];
            return {
              name: service ? service.name : 'Unknown service',
              unitPrice: service ? service.price : 0,
              quantity: item.quantity || 1,
              total: service ? service.price * (item.quantity || 1) : 0
            };
          })
        }
      }
    });
  } catch (err) {
    next(err);
  }
};


// @desc    Get all user bookings
// @route   GET /api/bookings
// @access  Private
exports.getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Make sure user owns the booking or is admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = async (req, res, next) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Make sure user owns the booking or is admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    // Only allow updating specific fields
    const allowedUpdates = ['eventDate', 'eventLocation', 'contactDetails', 'specialRequirements'];
    const updateData = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updateData[key] = req.body[key];
      }
    });

    booking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Make sure user owns the booking or is admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    // Update booking status
    booking.bookingStatus = 'canceled';
    await booking.save();

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all bookings (admin only)
// @route   GET /api/bookings/admin
// @access  Private/Admin
exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update booking status (admin only)
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { bookingStatus, paymentStatus } = req.body;

    // Validate inputs
    if (!bookingStatus && !paymentStatus) {
      return res.status(400).json({
        success: false,
        message: 'Please provide booking or payment status to update'
      });
    }

    const updateData = {};
    if (bookingStatus) updateData.bookingStatus = bookingStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (err) {
    next(err);
  }
}; 