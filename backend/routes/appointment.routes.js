const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment.model');

// @route   POST /api/appointments

router.post('/', async (req, res) => {
  try {
    const { patientName, patientEmail, bookingTime, priority, doctor } = req.body;

    const newAppointment = new Appointment({
      patientName,
      patientEmail,
      bookingTime,
      priority,
      doctor
    });

    const appointment = await newAppointment.save();
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/appointments/doctor/:doctorId

router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctor: doctorId }).sort({
      priority: -1, // high first, then medium, low
      bookingTime: 1 // then by time ascending
    });
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/appointments/doctor-name/:doctorName
// @desc    Get all appointments for a specific doctor by name, sorted by priority (high first)
router.get('/doctor-name/:doctorName', async (req, res) => {
  try {
    const { doctorName } = req.params;
    // First find the doctor by name to get ObjectId, then find appointments
    const Doctor = require('../models/doctor.model');
    const doctor = await Doctor.findOne({ name: doctorName });
    if (!doctor) {
      return res.status(404).json({ msg: 'Doctor not found' });
    }
    const appointments = await Appointment.find({ doctor: doctor._id }).sort({
      priority: -1, // high first, then medium, low
      bookingTime: 1 // then by time ascending
    });
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
