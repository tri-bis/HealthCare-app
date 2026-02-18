const mongoose = require('mongoose');

const BloodSchema = new mongoose.Schema({
  bloodGroup: {
     type: String,
     required: true,
      unique: true 
    },
  availability: { 
    type: String,
     enum: ['High', 'Moderate', 'Low'],
      required: true
     },
  units: { 
    type: Number, 
    required: true 
}
});

module.exports = mongoose.model('Blood', BloodSchema);