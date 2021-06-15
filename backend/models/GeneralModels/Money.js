// ================================================================================================
//  File Name: Money.js
//  Description:
//  This file holds a mongoose schema for a money object. This object is used by several other
//  mongoose schema.
// ================================================================================================
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
