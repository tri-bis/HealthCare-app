const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  email: { // Using email as the primary identifier for doctors too
    type: String,
    required: [true, 'Please provide Doctor ID'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid ID',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
  },
});

module.exports = mongoose.model('Doctor', DoctorSchema);