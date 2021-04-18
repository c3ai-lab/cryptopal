const { sendTransaction } = require('../helper/wallet/payment/sendTransaction');
const {
  generateKeyPair,
} = require('../helper/wallet/keyGeneration/generateKeyPair');
const Wallet = require('../models/Wallets/Wallet');
const User = require('../models/User/User');

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

/** *******************SEND TRANSACTION*********************** */
exports.signTransaction = async (req, res) => {
  sendTransaction()
    .then((hash) => res.status(201).send(hash))
    .catch((err) => res.status(400).send(err.message));
};
