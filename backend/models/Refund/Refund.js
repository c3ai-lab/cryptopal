// ================================================================================================
//  File Name: Refund.js
//  Description:
//  This file holds mongoose schemas for the refund object. This object represents a refund payment
//  created by a merchant. Refunds will be saved this way in the database.
// ================================================================================================
const mongoose = require('mongoose');
const money = require('../GeneralModels/Money');
const platformFee = require('../GeneralModels/PaymentInstructions');

const statusDetails = new mongoose.Schema(
  {
    reason: {
      type: String,
      enum: ['ECHECK '],
    },
  },
  { _id: false, strict: 'throw' }
);

const sellerPayableBreakdown = new mongoose.Schema(
  {
    gross_amount: money,
    cryptopal_fee: money,
    net_amount: money,
    platform_fees: [platformFee],
    total_refunded_amount: money,
  },
  { _id: false, strict: 'throw' }
);

const refundSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: ['CANCELLED', 'PENDING', 'COMPLETED'],
  },
  status_details: statusDetails,
  amount: money,
  invoice_id: {
    type: String,
    minLength: 1,
  },
  order_id: {
    type: String,
    minLength: 1,
  },
  custom_id: {
    type: String,
    max: 127,
  },
  seller_payable_breakdown: sellerPayableBreakdown,
  note_to_payer: {
    type: String,
    max: 255,
  },
  create_time: {
    type: String,
    minLength: 20,
    max: 64,
  },
  update_time: {
    type: String,
    minLength: 20,
    max: 64,
  },
  links: [
    {
      href: {
        type: String,
        required: true,
        max: 255,
      },
      method: {
        type: String,
        required: true,
        max: 255,
      },
    },
  ],
});

module.exports = mongoose.model('Refund', refundSchema);
