const { getBalance } = require('../../helper/wallet/transactions/balance');
const { getTokens } = require('../../helper/wallet/transactions/faucet');
const {
  getUserTransactions,
  getRecentContacts,
} = require('../../helper/wallet/transactions/getUsersTransactions');
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
  const transactions = await getUserTransactions(user._id, 3, 0);

  // get 5 last contacts
  const contacts = await getRecentContacts(user._id, 5);

  const returnData = {
    address: wallet.address,
    balance: parseFloat(balance).toFixed(2).toString(),
    transactions,
    contacts,
  };

  res.status(200).send(returnData);
};

/** *******************GET TOKENS FROM FAUCET*********************** */
exports.getToken = async (req, res) => {
  const { user } = req;
  const { value } = req.body;
  if (parseInt(value, 10) > 1000) return res.status(400).send('Amount to high');

  const wallet = await Wallet.findOne({ user_id: user._id });

  getTokens(wallet.address, value)
    .then((hashes) => res.status(201).send(hashes))
    .catch((err) => res.status(400).send(err.message));
};
