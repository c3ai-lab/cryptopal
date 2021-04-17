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
      maxlength: 64,
    },
  },
  { strict: 'throw' }
);

module.exports = mongoose.model('Wallet', walletSchema);
