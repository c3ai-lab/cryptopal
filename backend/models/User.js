const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  givenName: {
    type: String,
    required: true,
    max: 255,
  },
  familyName: {
    type: String,
    required: true,
    max: 255,
  },
  email: [
    {
      value: {
        type: String,
        required: true,
        min: 6,
        max: 255,
      },
      primary: {
        type: Boolean,
        required: true,
        min: 6,
        max: 255,
      },
      type: {
        type: String,
        required: true,
        min: 6,
        max: 255,
      },
    },
  ],
  address: {
    streetAddress: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    locality: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    region: {
      type: String,
      min: 6,
      max: 255,
    },
    postalCode: {
      type: String,
      min: 1,
      max: 255,
    },
    country: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
  },
  verifiedAccount: {
    type: Boolean,
    required: true,
  },
  payerId: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
});

module.exports = mongoose.model('User', userSchema);
