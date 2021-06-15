// ================================================================================================
//  File Name: Wallet.js
//  Description:
//  This file holds mongoose schemas for the wallet object. This object contains all information
//  about the blockchain wallet as well as user information. Transactions will be saved this way
//  in the database.
// ================================================================================================
const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
      minlength: 24,
      maxlength: 24,
    },
    user_name: {
      type: String,
      minlength: 1,
      maxlength: 255,
    },
    user_email: {
      type: String,
      minlength: 1,
      maxlength: 255,
    },
    address: {
      type: String,
      required: true,
      minlength: 42,
      maxlength: 42,
    },
    publicKey: {
      type: String,
      required: true,
      minlength: 128,
      maxlength: 128,
    },
    privateKey: {
      type: String,
      required: true,
      minlength: 64,
    },
  },
  { strict: 'throw' }
);

module.exports = mongoose.model('Wallet', walletSchema);
