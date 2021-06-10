const mongoose = require('mongoose');
const money = require('../GeneralModels/Money');
const {
  paymentInstructions,
  platformFee,
} = require('../GeneralModels/PaymentInstructions');

const statusDetails = new mongoose.Schema(
  {
    reason: {
      type: String,
      enum: ['PENDING_REVIEW'],
    },
  },
  { _id: false, strict: 'throw' }
);

const sellerProtection = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['ELIGIBLE', 'PARTIALLY_ELIGIBLE', 'NOT_ELIGIBLE'],
    },
    dispute_categories: [
      {
        dispute_category: {
          type: String,
          enum: ['ITEM_NOT_RECEIVED', 'UNAUTHORIZED_TRANSACTION'],
        },
      },
    ],
  },
  { _id: false, strict: 'throw' }
);

const sellerReceivableBreakdown = new mongoose.Schema(
  {
    gross_amount: money,
    cryptopal_fee: money,
    net_amount: money,
    receivable_amount: money,
    exchange_rate: money,
    platform_fees: [platformFee],
  },
  { _id: false, strict: 'throw' }
);

const paymentSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: [
      'CREATED',
      'CAPTURED',
      'DENIED',
      'EXPIRED',
      'PARTIALLY_CAPTURED',
      'PARTIALLY_CREATED',
      'VOIDED',
      'PENDING',
    ],
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
  final_capture: {
    type: Boolean,
  },
  seller_protection: sellerProtection,
  disbursement_mode: {
    type: String,
    enum: ['INSTANT', 'DELAYED'],
  },
  seller_receivable_breakdown: sellerReceivableBreakdown,
  expiration_time: {
    type: String,
    minLength: 20,
    max: 64,
  },
  note_to_payer: {
    type: String,
    max: 255,
  },
  soft_descriptor: {
    type: String,
    max: 22,
  },
  payment_instruction: paymentInstructions,
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
  transaction_hash: {
    type: String,
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

module.exports = mongoose.model('Payment', paymentSchema);
