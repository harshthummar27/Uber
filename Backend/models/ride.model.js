// models/ride.model.js
const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  address: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
}, { _id: false });

const rideSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  captain: { type: mongoose.Schema.Types.ObjectId, ref: 'captain' },

  pickup: { type: placeSchema, required: true },
  destination: { type: placeSchema, required: true },

  fare: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
    default: 'pending'
  },

  // store numeric values so frontend can show them quickly
  duration: { type: Number, default: 0 }, // seconds
  distance: { type: Number, default: 0 }, // meters

  paymentID: String,
  orderId: String,
  signature: String,

  otp: { type: String, select: false, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ride', rideSchema);
