const Web3 = require('web3');
const { sendPayment } = require('./payment');
const { getNetworkParams, sendTransaction } = require('./sendTransaction');

// sending native test tokens like KETH or SPOA for the testing networks
const sendNativeTestTokens = async (to) => {
  // connect to network
  const { networkAddress, networkInfo } = getNetworkParams();
  const provider = new Web3.providers.HttpProvider(networkAddress);
  const web3 = new Web3(provider);

  const from = process.env.FAUCET_ADDRESS;
  const sk = process.env.FAUCET_PRIVATE_KEY;
  const value = '0.005';
  const payload = '00';

  return sendTransaction(web3, from, to, value, payload, networkInfo, sk);
};

exports.getTokens = async (to, value) => {
  let error;
  let txHashes;
  const from = process.env.FAUCET_ADDRESS;
  const sk = process.env.FAUCET_PRIVATE_KEY;

  // get erc20 tokens as stable coin for payment
  await sendPayment(from, to, value, sk)
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
