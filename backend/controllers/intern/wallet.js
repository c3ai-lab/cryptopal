const Web3 = require('web3');
const { getBalance } = require('../../helper/wallet/transactions/balance');
const { getTokens } = require('../../helper/wallet/transactions/faucet');
const {
  getUserTransactions,
  getRecentContacts,
} = require('../../helper/wallet/transactions/getUsersTransactions');
const { sendPayment } = require('../../helper/wallet/transactions/payment');
const User = require('../../models/User/User');
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

/** *******************CHECK PAYMENT INPUT*********************** */
/*
 * Checks if the receiver input is a valid address or email and returns
 * the receivers information, if its a user from database
 */
exports.checkPayment = async (req, res) => {
  const { user } = req;
  const { receiver } = req.body;

  // check if input type is wallet address or email
  const address = Web3.utils.isAddress(receiver);
  let email = false;
  if (!address) {
    const re = /\S+@\S+\.\S+/;
    email = re.test(receiver);
  }

  // get user by email address
  if (email) {
    const receivingUser = await User.findOne({ login_name: receiver });
    if (!receivingUser) {
      return res.status(400).send('No user found for given email!');
    }
    const receivingWallet = await Wallet.findOne({
      user_id: receivingUser._id,
    });

    // check if receiver same address as sender
    if (user._id.toString() === receivingUser._id.toString()) {
      return res.status(400).send('Cannot send payment to own account!');
    }

    // send back name and address of receiver
    return res.status(200).send({
      name: `${receivingUser.given_name} ${receivingUser.family_name}`,
      address: receivingWallet.address,
    });
  }

  // get user by wallet address
  if (address) {
    const receivingWallet = await Wallet.findOne({ address: receiver });
    if (!receivingWallet) {
      return res.status(200).send({ foreign: true });
    }
    const receivingUser = await User.findOne({ _id: receivingWallet.user_id });

    // check if receiver same address as sender
    if (user._id.toString() === receivingUser._id.toString()) {
      return res.status(400).send('Cannot send payment to own account!');
    }

    // send back name and address of receiver
    return res.status(200).send({
      name: `${receivingUser.given_name} ${receivingUser.family_name}`,
      address: receiver,
    });
  }
  return res.status(400).send('Receiver is not an email or valid address.');
};

/** *******************SEND PAYMENT*********************** */
exports.sendPayment = async (req, res) => {
  const { user } = req;
  const { to, value, description } = req.body;

  const wallet = await Wallet.findOne({ user_id: user._id });
  const from = wallet.address;
  const sk = wallet.privateKey;
  sendPayment(from, to, value, sk, description)
    .then((hash) => res.status(201).send(hash))
    .catch((err) => res.status(400).send(err.message));
};
