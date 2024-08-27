// models/VendorProfile.js
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true, // URL or path to the service image
    },
    estimatedPrice: {
        type: Number,
        required: true, // Estimated price in the currency
    },
    isTrending: {
        type: Boolean,
        default: false, // Indicates if the service is trending
    },
});

const VendorProfileSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.String,
        ref: 'Vendor',
        required: true,
    },
    trendingServices: [ServiceSchema],
    allServices: [ServiceSchema],
}, { timestamps: true });

const VendorProfile = mongoose.model('VendorProfile', VendorProfileSchema,'VendorProfile');

module.exports = VendorProfile;
