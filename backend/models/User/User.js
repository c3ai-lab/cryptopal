const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login_name: {
    type: String,
    required: true,
    minLength: 6,
    max: 255,
  },
  given_name: {
    type: String,
    required: true,
    max: 255,
  },
  family_name: {
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
  emails: [
    {
      value: {
        type: String,
        required: true,
        minLength: 6,
        max: 255,
      },
      primary: {
        type: Boolean,
        required: true,
      },
      type: {
        type: String,
        required: true,
        minLength: 6,
        max: 255,
      },
    },
  ],
  address: {
    street_address: {
      type: String,
      required: true,
      minLength: 6,
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
  verified_account: {
    type: Boolean,
    required: true,
  },
  payer_id: {
    type: String,
    required: true,
    length: 13,
  },
  merchant_id: {
    type: String,
    minLength: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    max: 1024,
  },
  phone: {
    type: String,
    minLength: 4,
    max: 30,
  },
});

module.exports = mongoose.model('User', userSchema);
