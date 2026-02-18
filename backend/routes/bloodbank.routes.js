const express = require('express');
const router = express.Router();
const Blood = require('../models/blood.model'); // You'll need to import the model here now

// GET: Fetch all blood data
// The controller logic is now directly inside this function
router.get('/', async (req, res) => {
  try {
    const allBloodData = await Blood.find();
    res.status(200).json(allBloodData);
  } catch (error) {
    console.error('Error fetching blood data:', error);
    res.status(500).json({ message: 'Failed to fetch data from the server' });
  }
});

// POST: Add new blood data (Example)
router.post('/', async (req, res) => {
  try {
    const newBloodEntry = new Blood({
      bloodGroup: req.body.bloodGroup,
      availability: req.body.availability,
      units: req.body.units,
    });
    const savedEntry = await newBloodEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    console.error('Error saving blood data:', error);
    res.status(400).json({ message: 'Failed to save data' });
  }
});


module.exports = router;