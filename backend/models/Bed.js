// models/Bed.js
const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
  // other fields like bedNumber, room, etc.
  status: {
    type: String,
    enum: ['available', 'occupied', 'maintenance'], // Example statuses
    default: 'available'
  }
});

const Bed = mongoose.model('Bed', bedSchema);

module.exports = Bed;