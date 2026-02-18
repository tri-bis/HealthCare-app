const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// Patient Registration
router.post('/patient/register', async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    let patient = await Patient.findOne({ email });
    if (patient) {
      return res.status(400).json({ msg: 'A patient with this email already exists' });
    }
    patient = new Patient({ fullName, email, password });
    const salt = await bcrypt.genSalt(10);
    patient.password = await bcrypt.hash(password, salt);
    await patient.save();
    
    // Create JWT Token
    const payload = { user: { id: patient.id, role: 'patient' } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ token });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Patient Login
router.post('/patient/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    const payload = { user: { id: patient.id, role: 'patient' } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Doctor Login
router.post('/doctor/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      let doctor = await Doctor.findOne({ email });
      if (!doctor) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, doctor.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const payload = { user: { id: doctor.id, role: 'doctor' } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
          if (err) throw err;
          res.json({ token });
      });
    } catch (err) {
      res.status(500).send('Server Error');
    }
});

module.exports = router;