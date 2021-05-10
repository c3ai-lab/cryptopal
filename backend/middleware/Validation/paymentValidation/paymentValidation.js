/*
 * Validation of send order data to reject
 * requests with wrong formated data
 */
const Joi = require('@hapi/joi');
const money = require('../../../models/GeneralModels/Money');
const paymentInstructions = require('../../../models/GeneralModels/PaymentInstructions');
const { validateSchema } = require('../validateSchema');

//----------------------------------------------------------------------
//      set up joi validation of capture authorized payment data
//----------------------------------------------------------------------
exports.captureAuthorizedPaymentValidation = (req, res, next) => {
  const catureReq = Joi.object({
    invoice_id: Joi.string().max(127),
    note_to_payer: Joi.string().max(255),
    amount: money,
    final_capture: Joi.boolean(),
    payment_instruction: paymentInstructions,
    soft_descriptor: Joi.string(),
  });

  validateSchema(req, res, next, catureReq);
};

//----------------------------------------------------------------------
//      set up joi validation of void authorized payment data
//----------------------------------------------------------------------
exports.refundPaymentValidation = (req, res, next) => {
  const refundReq = Joi.object({
    invoice_id: Joi.string().max(127),
    note_to_payer: Joi.string().max(255),
    amount: money,
  });

  validateSchema(req, res, next, refundReq);
};
