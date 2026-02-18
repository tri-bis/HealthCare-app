// routes/bed.routes.js

const express = require('express');
const router = express.Router();
const Bed = require('../models/Bed'); // Adjust path to your Bed model if needed

router.get('/stats', async (req, res) => {
  try {
    // Get total number of beds
    const totalBeds = await Bed.countDocuments({});

    // Get the number of occupied beds
    const occupiedBeds = await Bed.countDocuments({ status: 'occupied' });

    // Calculate available beds
    const availableBeds = totalBeds - occupiedBeds;

    // Calculate occupancy rate
    const availabilityRate = totalBeds > 0 ? (availableBeds / totalBeds) * 100 : 0;

    // Send the final data as a JSON object
    res.json({
      totalBeds,
      occupiedBeds,
      availableBeds,
     availabilityRate: availabilityRate.toFixed(1)
    });

  } catch (error) {
    console.error('Error fetching bed statistics:', error);
    res.status(500).json({ message: 'Failed to retrieve bed statistics' });
  }
});

router.get('/', async (req, res) => {
  try {
    // Fetches all documents from the 'beds' collection
    const beds = await Bed.find({});
    res.json(beds);
  } catch (error) {
    console.error('Error fetching list of beds:', error);
    res.status(500).json({ message: 'Server Error fetching beds list' });
  }
});

module.exports = router;