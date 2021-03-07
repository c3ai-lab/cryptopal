const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  loginName: {
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
  company: {
    type: String,
    max: 255,
  },
  website: {
    type: String,
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
      max: 255,
    },
    region: {
      type: String,
      max: 255,
    },
    postalCode: {
      type: String,
      max: 255,
    },
    country: {
      type: String,
      required: true,
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
  merchantId: {
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
  phone: {
    type: String,
    min: 4,
    max: 30,
  },
});

module.exports = mongoose.model('User', userSchema);
