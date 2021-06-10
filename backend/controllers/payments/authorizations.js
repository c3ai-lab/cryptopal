const Payment = require('../../models/Payment/Payment');

/** **********************CAPTURE PAYMENT HANDLER*********************** */
exports.capturePayment = async (req, res) => {
  const requestedPayment = await Payment.findById(req.params.id);
  const updateTime = new Date().toISOString();

  if (requestedPayment.status !== 'CREATED') {
    return res
      .status(400)
      .send(
        `Cannot capture payment. Payment status: ${requestedPayment.status}`
      );
  }

  // ################### send transaction ###############
  requestedPayment.final_capture = true;
  requestedPayment.status = 'COMPLETED';
  requestedPayment.updateTime = updateTime;

  try {
    const savedPayment = await requestedPayment.save();
    // ############### create response object ##################
    res.status(201).send(savedPayment);
  } catch (err) {
    res.status(400).send('Failed saving payment.');
  }
};

/** **********************GET AUTHORIZED PAYMENT HANDLER*********************** */
exports.getPayment = async (req, res) => {
  try {
    // ################# und authorized ###################
    const requestedPayment = await Payment.findById(req.params.id);
    // ############### create response object ##################
    res.status(201).send(requestedPayment);
  } catch (err) {
    res.status(400).send('Payment not found.');
  }
};

/** **********************VOID PAYMENT HANDLER*********************** */
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
