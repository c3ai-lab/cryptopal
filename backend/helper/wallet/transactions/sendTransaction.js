// ================================================================================================
//  File Name: sendTransaction.js
//  Description:
//  This function sends a transaction with passed in data to the passed in blockchain.
// ================================================================================================#
const EthereumTx = require('ethereumjs-tx').Transaction;
const CryptoJS = require('crypto-js');

/**
 * Creating a transaction with received data and send it to the blockchain
 * @param  {any} web3 The id of the user
 * @param  {String} from The address of the sending wallet
 * @param  {String} to The address of the reiceiving wallet
 * @param  {String} value The amount of erc20 token to be sent
 * @param  {String} payload The payload data attached to the transaction
 * @param  {Object} networkInfo The network information for sending a transaction
 * @param  {String} sk The encrypted secret key of senders wallet
 * @return {Promise} Containing the sent transaction hash
 */
exports.sendTransaction = async (
  web3,
  from,
  to,
  value,
  payload,
  networkInfo,
  sk
) => {
  // get current network parameters for function call
  const txCount = await web3.eth.getTransactionCount(from);
  const gasPrice = await web3.eth.getGasPrice();

  // define transaction data
  const rawTx = {
    nonce: web3.utils.toHex(txCount),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex('80000'),
    to,
    value: web3.utils.toHex(web3.utils.toWei(value)),
    data: `0x${payload}`,
  };

  // encode private key and convert to hex format
  const encodedKeyBytes = CryptoJS.AES.decrypt(
    sk,
    process.env.SECRET_PRIVATE_KEY
  );
  const encodedKey = encodedKeyBytes.toString(CryptoJS.enc.Utf8);
  const privateKey = Buffer.from(encodedKey, 'hex');

  // sign transaction for network
  const tx = new EthereumTx(rawTx, networkInfo);
  tx.sign(privateKey);

  // sending transaction to network
  let error;
  let txHash;
  const serializedTx = `0x${tx.serialize().toString('hex')}`;
  await web3.eth.sendSignedTransaction(serializedTx, (err, hash) => {
    if (err) {
      error = err;
    } else {
      txHash = hash;
    }
  });

  // return promise
  return new Promise((resolve, reject) => {
    if (error) {
      reject(error);
    } else {
      resolve(txHash);
    }
  });
};
