// ================================================================================================
//  File Name: payment.js
//  Description:
//  This file holds a function to send a payment on the ethereum blockchain. Therefore web3 is used
//  to conect to the chain and create the right format of needed variables. A payment is done
//  by calling the transfer function of an erc20 token contract. This function works for all
//  all tokens following the erc20 token standart on every evm based blockchain.
// ================================================================================================
/* eslint-disable no-return-assign */
const Web3 = require('web3');
const { saveTransaction } = require('./saveTransaction');
const { sendTransaction } = require('./sendTransaction');
const { getNetworkParams } = require('../networkConfig');

/**
 * Helper function to pad each payload data to needed 32 bit length
 * @param  {any} data data to pad to 32 bit length
 * @return {String} 32 bit length string for input data with leading zeros
 */
const pad32Bytes = (data) => {
  let s = String(data).slice(2);
  while (s.length < (64 || 2)) {
    s = `0${s}`;
  }
  return s;
};

/**
 * Sending payment by ERC20 token contract call. This function generates the
 * payload for the contract call, uses sendTransaction function to broadcast
 * the payment transaction and saves related data in database.
 * @param  {String} from The senders wallet address
 * @param  {String} to The receivers wallet address
 * @param  {String} value The sending amount of payment
 * @param  {String} sk The senders secret key
 * @param  {String} description The description of the payment
 * @return {Promise} Containing the transaction hash on success
 */
exports.sendPayment = async (from, to, value, sk, description) => {
  // connect to blockchain network with web3
  const { networkAddress, contractAddress, networkInfo } = getNetworkParams();
  const provider = new Web3.providers.HttpProvider(networkAddress);
  const web3 = new Web3(provider);

  /* --------------- generating payload for contract call ---------------*/
  // get hashed function identifier
  const funcSig = web3.utils.sha3('transfer(address,uint256)').slice(2, 10);
  // extend receiver address to 32 bit
  const padAddressTo = pad32Bytes(to);
  // get extended hashed amount to send
  const amountWei = web3.utils.toWei(value);
  const amountHex = web3.utils.toHex(amountWei);
  const padAmount = pad32Bytes(amountHex);
  // combine values for function call into payload string
  const payload = funcSig + padAddressTo + padAmount;

  // send transaction
  let error;
  let hash;
  await sendTransaction(
    web3,
    from,
    contractAddress,
    '0',
    payload,
    networkInfo,
    sk
  )
    .then((txHash) => (hash = txHash))
    .catch((err) => (error = err));

  // save transaction details in database
  if (hash) {
    await saveTransaction(from, to, value, hash, description)
      .then()
      .catch((err) => (error = err));
  }

  // return promise with error or transaction hash
  return new Promise((resolve, reject) => {
    if (error) {
      reject(error);
    } else {
      resolve(hash);
    }
  });
};
