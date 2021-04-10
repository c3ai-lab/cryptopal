const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  primary: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
});

module.exports = mongoose.model('Email', emailSchema);
