const express = require('express');
const router = express.Router();
const Department = require('../models/department.model');

// @route   GET /api/departments-with-doctors
// @desc    Get all departments and their associated doctors
router.get('/departments-with-doctors', async (req, res) => {
  try {
    // This is an advanced MongoDB feature called an "aggregation pipeline".
    // It's like a powerful, multi-step database query.
    const departments = await Department.aggregate([
      {
        // This step performs a "lookup" (similar to a JOIN in other databases)
        // to find matching documents in the 'doctors' collection.
        $lookup: {
          from: 'doctors', // The other collection
          localField: '_id', // The field from the Department collection
          foreignField: 'department', // The field from the Doctor collection
          as: 'doctors' // The name for the new array of matching doctors
        }
      }
    ]);
    res.json(departments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;