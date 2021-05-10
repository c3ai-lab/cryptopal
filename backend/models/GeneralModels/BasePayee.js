const mongoose = require('mongoose');

const payeeBase = new mongoose.Schema(
  {
    email_address: {
      type: String,
      minLength: 3,
      max: 255,
    },
    merchant_id: {
      type: String,
      minLength: 1,
      max: 50,
    },
  },
  { _id: false, strict: 'throw' }
);

module.exports = payeeBase;
