const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login_name: {
    type: String,
    required: true,
    min: 6,
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
      email_id: {
        type: String,
        min: 6,
        max: 255,
      },
    },
  ],
  address: {
    address_id: {
      type: String,
      min: 6,
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
