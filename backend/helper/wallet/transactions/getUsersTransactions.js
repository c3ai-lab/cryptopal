const Transaction = require('../../../models/Transaction/Transaction');
const Wallet = require('../../../models/Wallets/Wallet');

exports.getUserTransactions = async (userId, limit, skip) => {
  const transactions = await Transaction.find({
    $or: [{ 'sender.id': userId }, { 'receiver.id': userId }],
  })
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  const returnedTransactions = [];
  transactions.forEach((tx) => {
    let type;
    let name;
    if (tx.sender.id.toString() === userId.toString()) {
      type = 'OUT';
      name = tx.receiver.name;
    } else {
      type = 'IN';
      name = tx.sender.name;
    }
    const returnTx = {
      type,
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

// get the last receiving contacts from all transactions of user
exports.getRecentContacts = async (userId, limit) => {
  const transactions = await Transaction.find({ 'sender.id': userId });
  const recentContacts = [];

  // iterate over all transations
  for (let i = 0; i < transactions.length; i++) {
    const tx = transactions[i];
    let alreadyListed = false;
    // iterate over all already listed contacts
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
      // push contact to recent list
      recentContacts.push(contact);
      if (recentContacts.length === limit) return recentContacts;
    }
  }

  return recentContacts;
};
