const Payment = require('../../models/Payments/payment');

/** **********************CREATE ORDER HANDLER*********************** */
exports.captureRefund = async (req, res) => {
  const requestedPayment = await Payment.findById(req.params.id);
  const updateTime = new Date().toISOString();

  if (!requestedPayment.final_capture) {
    return res.status(400).send('Payment not captured yet!');
  }
  // ############### enable partial refund ##############

  // ################### send transaction ###############
  requestedPayment.updateTime = updateTime;
  requestedPayment.status = 'REFUNDED';

  try {
    const savedPayment = await requestedPayment.save();
    // ############### create response object ##################
    res.status(201).send(savedPayment);
  } catch (err) {
    res.status(400).send('Failed saving payment.');
  }
};

/** **********************GET CAPTURED PAYMENT HANDLER*********************** */
exports.getCapturedPayment = async (req, res) => {
  try {
    const requestedPayment = await Payment.findById(req.params.id);

    if (requestedPayment.status !== 'CAPTURED') {
      return res.status(400).send('Payment not captured yet.');
    }

    // ############### create response object ##################
    res.status(201).send(requestedPayment);
  } catch (err) {
    res.status(400).send('Payment not found.');
  }
};
