// ================================================================================================
//  File Name: captures.js
//  BasePath: /payments/captures
//  Description:
//  This file holds the diffrent routes for managing payments captures. Captured payments can be
//  requested or refunded.
// ================================================================================================
const express = require('express');
const captures = require('../../controllers/payments/captures');
const validate = require('../../middleware/Validation/paymentValidation/paymentValidation');
const verify = require('../../middleware/verify');

const router = express.Router();

// route to get informations for captured payment by id
router.get('/:id', verify.user, captures.getCapturedPayment);

// route to refund a captured payment with payment controller
router.post(
  '/:id/refund',
  verify.user,
  validate.refundPaymentValidation,
  captures.captureRefund
);

module.exports = router;
