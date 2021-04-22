const mongoose = require('mongoose');

const contactData = new mongoose.Schema({
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
});

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
