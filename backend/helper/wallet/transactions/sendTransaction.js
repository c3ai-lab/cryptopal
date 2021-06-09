const EthereumTx = require('ethereumjs-tx').Transaction;

/*
 * function to send a transaction with the passed values to the passed network
 * with the passed private key.
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
  console.log('ST: inside');
  // get current network parameters for function call
  const txCount = await web3.eth.getTransactionCount(from);
  const gasPrice = await web3.eth.getGasPrice();
  console.log(`ST: GasPrice: ${gasPrice}`);

  // define transaction data
  console.log(`ST: ${web3.utils.toHex(txCount)}`);
  const rawTx = {
    nonce: web3.utils.toHex(txCount),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex('80000'),
    to,
    value: web3.utils.toHex(web3.utils.toWei(value)),
    data: `0x${payload}`,
  };

  // sign transaction
  console.log('ST: sign tx');
  const tx = new EthereumTx(rawTx, networkInfo);
  const privateKey = Buffer.from(sk, 'hex');
  tx.sign(privateKey);

  // sending transaction
  let error;
  let txHash;
  const serializedTx = `0x${tx.serialize().toString('hex')}`;
  await web3.eth.sendSignedTransaction(serializedTx, (err, hash) => {
    if (err) {
      console.log('ST: err');
      console.log(err.message);
      error = err;
    } else {
      console.log('ST: send TX successfull');
      console.log(hash);
      txHash = hash;
    }
  });

  console.log('ST: create promise');

  // return promise
  return new Promise((resolve, reject) => {
    if (error) {
      console.log('ST: reject');
      reject(error);
    } else {
      console.log('ST: resolve');
      resolve(txHash);
    }
  });
};
