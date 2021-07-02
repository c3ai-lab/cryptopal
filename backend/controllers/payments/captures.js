// ================================================================================================
//  File Name: captures.js
//  Description:
//  This file holds the diffrent functions for captured payments routes. These functions are
//  called from routes/payments/catures.js. Functions are getting and refunding an already captured
//  payment by id.
// ================================================================================================
const Payment = require('../../models/Payment/Payment');
const Order = require('../../models/Order/Order');
const Wallet = require('../../models/Wallets/Wallet');
const Refund = require('../../models/Refund/Refund');
const { sendPayment } = require('../../helper/wallet/transactions/sendPayment');

/**
 * Refund the captured payment by id. Fully refunds a captured payment
 * to the buyer. Can only be called by the merchant who sold the order.
 * @param  {Object} req The request object with payment id
 * @param  {Object} res The response object
 * @returns {Object} refunded payment
 */
exports.captureRefund = async (req, res) => {
  // get user and payment from request data
  const { user } = req;
  const requestedPayment = await Payment.findById(req.params.id);
  const updateTime = new Date().toISOString();

  // check if payment has been fully captured
  if (!requestedPayment.final_capture) {
    return res.status(400).send('Payment not captured yet!');
  }

  // get sender receiver and value data from order
  const order = await Order.findOne({ _id: requestedPayment.order_id });

  // check if caller is the seller
  if (user.login_name !== order.payee.email_address) {
    return res
      .status(400)
      .send(
        'Caller is not the merchant who selled this order. Orders can only be refunded by the seller.'
      );
  }

  // get sending wallet data
  const wallet = await Wallet.findOne({ user_id: user._id });
  const from = wallet.address;
  const sk = wallet.privateKey;

  // get value and receiver data from order
  const to = order.payer.address;
  const { value } = order.purchase_units[0].amount;
  const description = `Refund order number ${order._id}`;

  // send transaction from seller to buyer
  await sendPayment(from, to, value, sk, description)
    .then(async () => {
      // updating payment status to refunded
      requestedPayment.status = 'REFUNDED';
      requestedPayment.update_time = updateTime;

      // creating a refund object
      const refund = new Refund({
        status: 'COMPLETED',
        amount: {
          currency_code: 'USD',
          value,
        },
        order_id: order._id,
        create_time: updateTime,
        update_time: updateTime,
      });

      await refund.save();
      await requestedPayment.save();

      res.status(200).send(requestedPayment);
    })
    .catch((err) => res.status(400).send(err.message));
};

/**
 * Get the captured payment by id
 * @param  {Object} req The request object with payment id
 * @param  {Object} res The response object
 * @returns {Object} captured payment
 */
exports.getCapturedPayment = async (req, res) => {
  try {
    const requestedPayment = await Payment.findById(req.params.id);

    if (requestedPayment.status !== 'CAPTURED') {
      return res.status(400).send('Payment not captured yet.');
    }

    res.status(201).send(requestedPayment);
  } catch (err) {
    res.status(400).send('Payment not found.');
  }
};
