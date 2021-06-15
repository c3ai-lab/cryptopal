// ================================================================================================
//  File Name: faucet.js
//  Description:
//  This file holds functions for requesting balance on the selected blockchain. It sends some home
//  network tokens (i.e. keth) and the requested amount of erc20 token (dai). The native token is
//  needed for paying gas fees by sending transactions. Liquidity for payments is provided with dai.
//  The address of the faucet needs to have native testnet tokens and erc20 tokens. Its private
//  key and address has to be set in .env file.
// ================================================================================================
const Web3 = require('web3');
const CryptoJS = require('crypto-js');
const { sendPayment } = require('./sendPayment');
const { sendTransaction } = require('./sendTransaction');
const { getNetworkParams } = require('../networkConfig');

/**
 * Sending native testnet tokens like KETH or SPOA to given address.This function creates
 * transaction data for sending 0.005 testnet tokens from faucet address to an arbitrary address.
 * @param  {String} to The receivers address
 * @return {Promise} Containing transaction hash if successful
 */
const sendNativeTestTokens = async (to) => {
  // connect to blockchain network with web3
  const { networkAddress, networkInfo } = getNetworkParams();
  const provider = new Web3.providers.HttpProvider(networkAddress);
  const web3 = new Web3(provider);

  // creating transaction call data
  const from = process.env.FAUCET_ADDRESS;
  const sk = CryptoJS.AES.encrypt(
    process.env.FAUCET_PRIVATE_KEY,
    process.env.SECRET_PRIVATE_KEY
  ).toString();
  const value = '0.005';
  const payload = '00';

  return sendTransaction(web3, from, to, value, payload, networkInfo, sk);
};

/**
 * Sending requested ERC20 tokens and native tokens from faucet to receiving address.
 * This happens with two seperate transactions. The keys of the faucet account has to
 * be set in .env file.
 * @param  {String} to The receivers address
 * @param  {String} value The amount of ERC20 tokens to be send
 * @return {Promise} Containing transaction hashes if successful
 */
exports.getTokens = async (to, value) => {
  let error;
  let txHashes;
  // encrypt private key
  const from = process.env.FAUCET_ADDRESS;
  const sk = CryptoJS.AES.encrypt(
    process.env.FAUCET_PRIVATE_KEY,
    process.env.SECRET_PRIVATE_KEY
  ).toString();

  // get erc20 tokens as stable coin for payment
  const description = 'Getting liquidity from CryptoPal Token faucet.';
  await sendPayment(from, to, value, sk, description)
    .then((hash) => {
      txHashes = { dai: hash };
    })
    .catch((err) => {
      error = err;
    });

  // get native testnetwork tokens for tx fees
  if (txHashes) {
    await sendNativeTestTokens(to)
      .then((hash) => {
        txHashes = { ...txHashes, native: hash };
      })
      .catch((err) => {
        error = err;
      });
  }

  // return promise with tx hashes
  return new Promise((resolve, reject) => {
    if (error) {
      reject(error);
    } else {
      resolve(txHashes);
    }
  });
};
