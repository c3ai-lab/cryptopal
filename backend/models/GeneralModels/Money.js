const mongoose = require('mongoose');

const money = new mongoose.Schema(
  {
    currency_code: {
      type: String,
      minLength: 3,
      max: 3,
      required: true,
    },
    value: {
      type: String,
      max: 32,
      required: true,
    },
  },
  { _id: false, strict: 'throw' }
);

module.exports = money;
