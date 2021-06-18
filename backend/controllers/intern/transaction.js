// ================================================================================================
//  File Name: transaction.js
//  Description:
//  This file holds the diffrent functions for the transaction routes. These functions are called
//  from routes/intern/transaction.js. Functions are checking transaction receiver, sending a
//  transaction and getting transactions from database.
// ================================================================================================
const Web3 = require('web3');
const { sendPayment } = require('../../helper/wallet/transactions/sendPayment');
const Wallet = require('../../models/Wallets/Wallet');
const User = require('../../models/User/User');
const Transaction = require('../../models/Transaction/Transaction');
const {
  getUserTransactions,
} = require('../../helper/wallet/transactions/getUsersTransactions');

/**
 * Checks if the given receiver address is an email or wallet address. If it is
 * an email it is checked if the email is from a registered user and returns
 * the corresponding address. If it is an address, it is checked if the address
 * is from a registered user or external or invalid.
 * @param  {Object} req The request object with transaction receiver address
 * @param  {Object} res The response object
 * @returns Name and wallet address of registered user | external warning
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

/**
 * Sends a simple transfer transaction from the user to a entered receiver.
 * @param  {Object} req The request object with transaction receiver address, value and description
 * @param  {Object} res The response object
 * @returns transaction hash | error message
 */
exports.sendPayment = async (req, res) => {
  const { user } = req;
  const { to, value, description } = req.body;

  // get senders address and private key from database
  const wallet = await Wallet.findOne({ user_id: user._id });
  const from = wallet.address;
  const sk = wallet.privateKey;

  // send payment
  sendPayment(from, to, value, sk, description)
    .then((hash) => res.status(201).send(hash))
    .catch((err) => res.status(400).send(err.message));
};

/**
 * Gets transaction from database by id.
 * @param  {Object} req The request object with transaction id param
 * @param  {Object} res The response object
 * @returns transaction object | error message
 */
exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    res.status(200).send(transaction);
  } catch (err) {
    res.status(400).send('Failed catching transaction!');
  }
};

/**
 * Gets multiple transactions from database queried by page and page size.
 * @param  {Object} req The request object with page and page_size queries
 * @param  {Object} res The response object
 * @returns {Array} of transactions
 */
exports.getTransactions = async (req, res) => {
  const { user } = req;

  // get all selected transactions by query params
  const page = parseInt(req.query.page, 10) || 1;
  const numberOfItems = parseInt(req.query.page_size, 10) || 10;
  const skippedItems = (page - 1) * numberOfItems;
  try {
    const transactions = await getUserTransactions(
      user._id,
      numberOfItems,
      skippedItems
    );

    // get total items and pages if requested
    if (req.query.total_required) {
      const allTransactions = await Transaction.find({
        $or: [{ 'sender.id': user._id }, { 'receiver.id': user._id }],
      });
      const totalPages = Math.ceil(allTransactions.length / numberOfItems);
      res.status(200).send({
        transactions,
        total_items: allTransactions.length,
        total_pages: totalPages,
      });
    } else {
      res.status(200).send({ transactions });
    }
  } catch (err) {
    res.status(400).send('Failed fetching transactions.');
  }
};
