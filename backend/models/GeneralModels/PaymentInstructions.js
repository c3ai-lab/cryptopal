// ================================================================================================
//  File Name: PaymentInstructions.js
//  Description:
//  This file holds mongoose schemas for a platformFee and a paymentInstructions object. This
//  objects are used by several other mongoose schema.
// ================================================================================================
const mongoose = require('mongoose');
const money = require('./Money');
const payeeBase = require('./BasePayee');

const platformFee = new mongoose.Schema(
  {
    amount: money,
    payee: payeeBase,
  },
  { _id: false, strict: 'throw' }
);

const paymentInstructions = new mongoose.Schema(
  {
    platform_fees: [platformFee],
    disbursement_mode: { type: String, enum: ['INSTANT', 'DELAYED'] },
  },
  { _id: false, strict: 'throw' }
);

module.exports = { paymentInstructions, platformFee };
