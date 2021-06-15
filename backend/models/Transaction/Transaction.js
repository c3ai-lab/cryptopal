// ================================================================================================
//  File Name: Transaction.js
//  Description:
//  This file holds mongoose schemas for the transaction object. This object represents a payment
//  transaction between to users. Transactions will be saved this way in the database.
// ================================================================================================
const mongoose = require('mongoose');

const contactData = new mongoose.Schema(
  {
    id: {
      type: String,
      minlength: 24,
      maxlength: 24,
    },
    address: {
      type: String,
      required: true,
      minlength: 42,
      maxlength: 42,
    },
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
    },
    email: {
      type: String,
      minlength: 1,
      maxlength: 255,
    },
  },
  { _id: false }
);

const transactionSchema = new mongoose.Schema({
  sender: contactData,
  receiver: contactData,
  value: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'successful', 'reverted'],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
