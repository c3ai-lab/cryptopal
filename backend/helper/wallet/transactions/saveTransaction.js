// ================================================================================================
//  File Name: safeTransaction.js
//  Description:
//  This function saves all data related to passed in transaction in the database.
// ================================================================================================
const Transaction = require('../../../models/Transaction/Transaction');
const Wallet = require('../../../models/Wallets/Wallet');

/**
 * Fetch data related to passed in transaction data and save full
 * transaction data in database.
 * @param  {String} from The address of the sending wallet
 * @param  {String} to The address of the reiceiving wallet
 * @param  {String} value The amount of erc20 token to be sent
 * @param  {String} hash The payload data attached to the transaction
 * @param  {String} description The encrypted secret key of senders wallet
 * @return {Promise} Containing the saved transaction hash
 */
exports.saveTransaction = async (from, to, value, hash, description) => {
  // fetching wallet data of receiver and sender
  const sendingWallet = await Wallet.findOne({ address: from });
  const receivingWallet = await Wallet.findOne({ address: to });

  // create sender object
  const sender = {
    id: sendingWallet.user_id,
    name: sendingWallet.user_name,
    email: sendingWallet.user_email,
    address: from,
  };

  // create receiver object
  const receiver = {
    id: receivingWallet ? receivingWallet.user_id : undefined,
    name: receivingWallet ? receivingWallet.user_name : 'External Wallet',
    email: receivingWallet ? receivingWallet.user_email : undefined,
    address: to,
  };

  const status = 'pending';
  const date = new Date().toISOString();

  // create new transaction object
  const transaction = new Transaction({
    sender,
    receiver,
    value,
    hash,
    status,
    date,
    description,
  });

  // try to save transaction in database
  let transactionId;
  let error;
  try {
    const savedTX = await transaction.save();
    transactionId = savedTX._id;
  } catch (err) {
    error = err;
  }

  // return promise
  return new Promise((resolve, reject) => {
    if (transactionId) {
      resolve(transactionId);
    } else {
      reject(error);
    }
  });
};
