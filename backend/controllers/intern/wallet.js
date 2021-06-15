// ================================================================================================
//  File Name: wallet.js
//  Description:
//  This file holds the diffrent functions for the wallet routes. These functions are called
//  from routes/intern/wallets.js. Functions are getting users balance, getting dashboard data
//  for the front end and getting tokens from a faucet.
// ================================================================================================
const { getBalance } = require('../../helper/wallet/transactions/balance');
const { getTokens } = require('../../helper/wallet/transactions/faucet');
const {
  getUserTransactions,
  getRecentContacts,
} = require('../../helper/wallet/transactions/getUsersTransactions');
const Wallet = require('../../models/Wallets/Wallet');

/**
 * Gets the current users balance
 * @param  {Object} req The users request object with user id
 * @param  {Object} res The response object
 * @returns {Object} containing the users address
 */
exports.getAddress = async (req, res) => {
  const { user } = req;

  const wallet = await Wallet.findOne({ user_id: user._id });

  res.status(200).send({ address: wallet.address });
};

/**
 * Gets users data needed for displaying on dashboard on the frondend
 * @param  {Object} req The users request object with user id
 * @param  {Object} res The response object
 * @returns {Object} containing the users address, balance, recent contacts and recent transactions
 */
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

/**
 * Faucet for getting some testnet tokens. This gets some native tokens for gas fees
 * and some ERC20 tokens as payment tokens.
 * @param  {Object} req The users request object with user id and requested amount
 * @param  {Object} res The response object
 * @returns {Object} containing the transaction hashes of both transactions
 */
exports.getToken = async (req, res) => {
  const { user } = req;
  const { value } = req.body;
  if (parseInt(value, 10) > 1000) return res.status(400).send('Amount to high');

  const wallet = await Wallet.findOne({ user_id: user._id });

  getTokens(wallet.address, value)
    .then((hashes) => res.status(201).send(hashes))
    .catch((err) => res.status(400).send(err.message));
};
