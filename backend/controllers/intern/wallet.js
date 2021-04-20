const { getBalance } = require('../../helper/wallet/transactions/balance');
const { getTokens } = require('../../helper/wallet/transactions/faucet');
const Wallet = require('../../models/Wallets/Wallet');

/** *******************GET USERS WALLET ADDRESS******************* */
exports.getAddress = async (req, res) => {
  const { user } = req;

  const wallet = await Wallet.findOne({ user_id: user._id });

  res.status(200).send({ address: wallet.address });
};

/** *******************GET USER DASHBOARD DATA******************* */
exports.getDashboardData = async (req, res) => {
  const { user } = req;

  const wallet = await Wallet.findOne({ user_id: user._id });

  // get current balance
  const balance = await getBalance(wallet.address);

  // get last 3 transactions

  // get 5 last contacts

  const returnData = {
    address: wallet.address,
    balance,
    transactions: [],
    contacts: [],
  };

  res.status(200).send(returnData);
};

/** *******************GET TOKENS FROM FAUCET*********************** */
exports.getToken = async (req, res) => {
  const { to, value } = req.body;
  if (parseInt(value, 10) > 1000) return res.status(400).send('Amount to high');
  getTokens(to, value)
    .then((hash) => res.status(201).send(hash))
    .catch((err) => res.status(400).send(err.message));
};
