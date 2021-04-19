/* eslint-disable object-curly-newline */
const Wallet = require('../models/Wallets/Wallet');
const User = require('../models/User/User');
const {
  generateKeyPair,
} = require('../helper/wallet/keyGeneration/generateKeyPair');
const { sendPayment } = require('../helper/wallet/transactions/payment');
const { getTokens } = require('../helper/wallet/transactions/faucet');

/** *******************GENERATE PUBLIC AND PRIVATE KEY*********************** */
exports.createKeys = async (req, res) => {
  const index = (await User.count()) + 2;
  // safe these in database
  const { address, publicKey, privateKey } = await generateKeyPair(index);
  const user = await User.findById('60743cf903550e31180cb417');

  const wallet = new Wallet({
    user_id: user._id,
    address,
    publicKey,
    privateKey,
  });

  try {
    const savedWallet = await wallet.save();
    res.status(201).send(savedWallet);
  } catch (err) {
    console.log(err);
    console.log(err.message);
    res.status(400).send('Failed saving wallet keys.');
  }
};

/** *******************SEND PAYMENT*********************** */
exports.sendPayment = async (req, res) => {
  const { from, to, value, sk } = req.body;
  sendPayment(from, to, value, sk)
    .then((hash) => res.status(201).send(hash))
    .catch((err) => res.status(400).send(err.message));
};

/** *******************GET TOKENS FROM FAUCET*********************** */
exports.getToken = async (req, res) => {
  const { to, value } = req.body;
  getTokens(to, value)
    .then((hash) => res.status(201).send(hash))
    .catch((err) => res.status(400).send(err.message));
};
