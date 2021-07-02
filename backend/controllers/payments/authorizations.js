// ================================================================================================
//  File Name: authorizations.js
//  Description:
//  This file holds the diffrent functions for authorized payments routes. These functions are
//  called from routes/payments/authorizations.js. Functions are capturing, getting or voiding an
//  authorized payment.
// ================================================================================================
const Payment = require('../../models/Payment/Payment');
const Wallet = require('../../models/Wallets/Wallet');
const Order = require('../../models/Order/Order');
const { sendPayment } = require('../../helper/wallet/transactions/sendPayment');

/**
 * Capture an authorized payment by id
 * @param  {Object} req The request object with payment id and user id
 * @param  {Object} res The response object
 * @returns {Object} captured payment
 */
exports.capturePayment = async (req, res) => {
  // get requested payment and user
  const { user } = req;
  const payment = await Payment.findById(req.params.id);
  const updateTime = new Date().toISOString();

  // check if payment status is valid for being captured
  if (payment.status !== 'CREATED') {
    return res
      .status(400)
      .send(`Cannot capture payment. Payment status: ${payment.status}`);
  }

  // get sending wallet data
  const wallet = await Wallet.findOne({ user_id: user._id });
  const from = wallet.address;
  const sk = wallet.privateKey;

  // get receiving wallet address and value from order
  const order = await Order.findOne({ _id: payment.order_id });
  const to = order.payee.address;
  const { value } = order.purchase_units[0].amount;
  const description = `Order number ${order._id}`;

  // send transaction from payer to merchant
  await sendPayment(from, to, value, sk, description)
    .then(async (hash) => {
      payment.status = 'CAPTURED';
      payment.final_capture = true;
      payment.update_time = updateTime;
      payment.transaction_hash = hash;
      await payment.save();

      res.status(200).send(payment);
    })
    .catch((err) => res.status(400).send(err.message));
};

/**
 * Get the authorized payment by id
 * @param  {Object} req The request object with payment id
 * @param  {Object} res The response object
 * @returns {Object} authorized payment
 */
exports.getPayment = async (req, res) => {
  try {
    const requestedPayment = await Payment.findById(req.params.id);

    // check if payment is created and authorized
    if (requestedPayment && requestedPayment.status === 'CREATED') {
      res.status(201).send(requestedPayment);
    } else {
      res.status(400).send('Payment not found.');
    }
  } catch (err) {
    res.status(400).send('Payment not found.');
  }
};

/**
 * Voids the authorized payment by id
 * @param  {Object} req The request object with payment id
 * @param  {Object} res The response object
 * @returns {Object} voided payment
 */
exports.voidPayment = async (req, res) => {
  try {
    // get payment by id and check if the current payment status is valid
    const requestedPayment = await Payment.findById(req.params.id);

    if (!requestedPayment) return res.status(400).send('Payment not found.');

    if (!requestedPayment.status === 'CREATED') {
      return res.status(400).send('Cannot void this payment.');
    }

    // change payment status to void
    requestedPayment.status = 'VOID';
    await requestedPayment.save();
    res.status(204).send();
  } catch (err) {
    res.status(400).send('Error voiding payment');
  }
};
