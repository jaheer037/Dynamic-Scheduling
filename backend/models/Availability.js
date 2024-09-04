const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  email: { type: String, required: true },
  availabilities: [
    {
      day: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
});

const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;
