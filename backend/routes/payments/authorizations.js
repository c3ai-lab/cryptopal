// ================================================================================================
//  File Name: authorizations.js
//  BasePath: /payments/authorizations
//  Description:
//  This file holds the diffrent routes for managing payments authorizations. The user can show
//  authorized payments details, capture or void an authorized payment.
// ================================================================================================
const express = require('express');
const authorization = require('../../controllers/payments/authorizations');
const validate = require('../../middleware/Validation/paymentValidation/paymentValidation');
const verify = require('../../middleware/verify');

const router = express.Router();

// route to get informations for authorized payment by id
router.get('/:id', verify.user, authorization.getPayment);

// route to capture authorized payment with payment controller
router.post(
  '/:id/capture',
  verify.user,
  validate.captureAuthorizedPaymentValidation,
  authorization.capturePayment
);

// route to void an authorized payment with payment controller
router.post('/:id/void', verify.user, authorization.voidPayment);

module.exports = router;
