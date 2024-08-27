// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  eventDate: {  // New field for event date
    type: Date,
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
    enum: ['Morning', 'Evening'],  // restrict to specific values
  },
  eventType: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: String,
    required: false,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  vendorName: {  // New field for vendor name
    type: String,
    required: true,
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', BookingSchema, 'bookings');

module.exports = Booking;
