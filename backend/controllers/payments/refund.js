// ================================================================================================
//  File Name: refund.js
//  Description:
//  This file holds one functions for refunded payments routes. These function is called from
//  routes/payments/refund.js. The only function is to get a refunded payment by id.
// ================================================================================================
const Refund = require('../../models/Refund/Refund');

/**
 * Get the refunded payment by id
 * @param  {Object} req The request object with refund id
 * @param  {Object} res The response object
 * @returns {Object} refunded payment
 */
exports.getCapturedPayment = async (req, res) => {
  try {
    const requestedRefund = await Refund.findById(req.params.id);
    res.status(201).send(requestedRefund);
  } catch (err) {
    res.status(400).send('Payment not found.');
  }
};
