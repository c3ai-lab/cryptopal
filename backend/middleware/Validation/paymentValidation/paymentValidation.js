// ================================================================================================
//  File Name: paymentValidation.js
//  Description:
//  This file holds functions for verifing request data with joi validation schemas. It creates
//  joi validation schema objects and calls the validateSchema function to validate request data.
//  This functions are used as a middleware on payment routes.
// ================================================================================================
const Joi = require('@hapi/joi');
const money = require('../../../models/GeneralModels/Money');
const paymentInstructions = require('../../../models/GeneralModels/PaymentInstructions');
const { validateSchema } = require('../validateSchema');

/**
 * Set up joi validation schema for capture authorized payment data and call validate function.
 * @param  {Object} req The request object
 * @param  {Object} res The response object
 * @param  {Function} next The function to proceed
 */
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

/**
 * Set up joi validation schema for refund payment data and call validate function.
 * @param  {Object} req The request object
 * @param  {Object} res The response object
 * @param  {Function} next The function to proceed
 */
exports.refundPaymentValidation = (req, res, next) => {
  const refundReq = Joi.object({
    invoice_id: Joi.string().max(127),
    note_to_payer: Joi.string().max(255),
    amount: money,
  });

  validateSchema(req, res, next, refundReq);
};
