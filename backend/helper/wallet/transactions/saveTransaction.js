const Transaction = require('../../../models/Transaction/Transaction');
const Wallet = require('../../../models/Wallets/Wallet');

/*
 * Function to get information about sender and receiver of transaction
 * and save transaction details in database.
 */
exports.saveTransaction = async (from, to, value, hash, description) => {
  const sendingWallet = await Wallet.findOne({ address: from });
  const receivingWallet = await Wallet.findOne({ address: to });

  const sender = {
    id: sendingWallet.user_id,
    name: sendingWallet.user_name,
    address: from,
  };

  const receiver = {
    id: receivingWallet ? receivingWallet.user_id : undefined,
    name: receivingWallet ? receivingWallet.user_name : 'External Wallet',
    address: to,
  };

  const status = 'pending';
  const date = new Date().toISOString();

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
    console.log('try to save');
    const savedTX = await transaction.save();
    transactionId = savedTX._id;
  } catch (err) {
    console.log(err);
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
