// ================================================================================================
//  File Name: getUsersTransactions.js
//  Description:
//  This file holds functions to filter transactions for a user. It is possible to get a given
//  number of transactions with all detaild or to get the latest three transaction contacts of a
//  specific user by id.
// ================================================================================================
const Transaction = require('../../../models/Transaction/Transaction');
const Wallet = require('../../../models/Wallets/Wallet');

/**
 * Getting transactions with the user as sender or receiver by id.
 * @param  {String} userId The id of the user
 * @param  {Number} limit The maximum amount of returned transactions
 * @param  {Number} skip The number of skipped transactions
 * @return {Array} Containing the filtered transactions
 */
exports.getUserTransactions = async (userId, limit, skip) => {
  // fetch requested transactions
  const transactions = await Transaction.find({
    $or: [{ 'sender.id': userId }, { 'receiver.id': userId }],
  })
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  // create response format
  const returnedTransactions = [];
  transactions.forEach((tx) => {
    // check if the transaction is in or out going for user
    let type;
    let name;
    if (tx.sender.id.toString() === userId.toString()) {
      type = 'OUT';
      name = tx.receiver.name;
    } else {
      type = 'IN';
      name = tx.sender.name;
    }

    // create transaction object with needed data
    const returnTx = {
      type,
      id: tx._id,
      name,
      value: tx.value,
      hash: tx.hash,
      date: tx.date,
      description: tx.description,
    };
    returnedTransactions.push(returnTx);
  });

  return returnedTransactions;
};

/**
 * Getting last contacts (name and email) the user sent funds to
 * @param  {String} userId The id of the user
 * @param  {Number} limit The maximum amount of returned contacts
 * @return {Array} Containing the filtered contacts email and name
 */
exports.getRecentContacts = async (userId, limit) => {
  // fetch users outgoing transactions
  const transactions = await Transaction.find({ 'sender.id': userId });
  const recentContacts = [];

  // iterate over all users outgoing transations
  for (let i = 0; i < transactions.length; i++) {
    const tx = transactions[i];
    let alreadyListed = false;
    // iterate over all already listed contacts and check if receiver is already
    // listed in recent contacts array to avoid double occurence of a contact
    for (let j = 0; j < recentContacts.length; j++) {
      if (recentContacts[j].address === tx.receiver.address) {
        alreadyListed = true;
        break;
      }
    }

    // get wallet information if not listed yet
    if (!alreadyListed) {
      // eslint-disable-next-line no-await-in-loop
      const contactWallet = await Wallet.findOne({
        address: tx.receiver.address,
      });
      let contact;
      if (contactWallet) {
        contact = {
          name: contactWallet.user_name,
          address: contactWallet.address,
        };
      } else {
        contact = {
          name: 'External Wallet',
          address: tx.receiver.address,
        };
      }
      // push contact to recent list and return if limit is reached
      recentContacts.push(contact);
      if (recentContacts.length === limit) return recentContacts;
    }
  }

  return recentContacts;
};
