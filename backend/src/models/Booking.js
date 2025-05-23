const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A booking must belong to a user']
  },
  photographyService: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhotographyService',
    required: [true, 'A booking must include a photography service']
  },
  additionalServices: [{
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdditionalService'
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  eventDate: {
    type: Date,
    required: [true, 'Please provide the event date']
  },
  eventLocation: {
    address: {
      type: String,
      required: [true, 'Please provide an address']
    },
    city: {
      type: String,
      required: [true, 'Please provide a city']
    },
    state: {
      type: String,
      required: [true, 'Please provide a state']
    },
    zipCode: {
      type: String,
      required: [true, 'Please provide a zip code']
    },
    country: {
      type: String,
      default: 'USA'
    }
  },
  contactDetails: {
    phone: {
      type: String,
      required: [true, 'Please provide a contact phone number']
    },
    alternativeEmail: {
      type: String
    }
  },
  specialRequirements: {
    type: String
  },
  totalAmount: {
    type: Number,
    required: [true, 'A booking must have a total amount']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'pending'
  },
  bookingStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Populate related fields when querying
bookingSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name email'
  })
  .populate({
    path: 'photographyService',
    select: 'name category basePrice duration'
  })
  .populate({
    path: 'additionalServices.service',
    select: 'name price'
  });

  next();
});

module.exports = mongoose.model('Booking', bookingSchema); 