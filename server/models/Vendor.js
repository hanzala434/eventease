// models/Vendor.js
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

const VendorSchema = new mongoose.Schema({
    profilePic: {
        type: String,
        required: true,  // Path to the vendor's profile picture
    },
    name: {
        type: String,
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
        enum: ['Decor', 'Photography', 'Venue', 'Others'], // Restrict to specific categories
    },
    description: {
        type: String,
        required: false,
    },
    contactInfo: {
        type: String,
        required: false,
    },
    trendingServices: [ServiceSchema],
    allServices: [ServiceSchema],
}, { timestamps: true });

const Vendor = mongoose.model('Vendor', VendorSchema, 'vendors');

module.exports = Vendor;
