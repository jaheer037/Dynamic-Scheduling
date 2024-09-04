const express = require('express');
const Availability = require('../models/Availability');

const router = express.Router();

// Get user availability
router.get('/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const availability = await Availability.findOne({ email });
    res.json(availability);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add or update user availability
router.post('/', async (req, res) => {
  const { email, availabilities } = req.body;
  try {
    let availability = await Availability.findOne({ email });
    if (availability) {
      availability.availabilities = availabilities;
      await availability.save();
    } else {
      availability = new Availability({ email, availabilities });
      await availability.save();
    }
    res.json(availability);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete user availability
router.delete('/:email', async (req, res) => {
  const { email } = req.params;
  try {
    await Availability.findOneAndDelete({ email });
    res.json({ message: 'Availability deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
