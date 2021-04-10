const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  address: {
    street_address: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    locality: {
      type: String,
      required: true,
      max: 255,
    },
    region: {
      type: String,
      max: 255,
    },
    postal_code: {
      type: String,
      max: 255,
    },
    country: {
      type: String,
      required: true,
      max: 255,
    },
  },
});

module.exports = mongoose.model('Address', addressSchema);
