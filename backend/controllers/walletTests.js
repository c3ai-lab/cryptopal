/* eslint-disable object-curly-newline */
const { sendPayment } = require('../helper/wallet/transactions/payment');
const { getTokens } = require('../helper/wallet/transactions/faucet');

/** *******************SEND PAYMENT*********************** */
exports.sendPayment = async (req, res) => {
  const { from, to, value, sk } = req.body;
  sendPayment(from, to, value, sk)
    .then((hash) => res.status(201).send(hash))
    .catch((err) => res.status(400).send(err.message));
};
