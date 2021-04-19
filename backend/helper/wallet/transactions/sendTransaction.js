const EthereumTx = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common').default;

/*
 * Returns the parameters to connect to the selected chain. The chain has to be set
 * in the .env file. This function also returns the address of the erc20 token.
 */
exports.getNetworkParams = () => {
  const network = process.env.NETWORK;
  let contractAddress;
  let networkAddress;
  let networkInfo = {};
  switch (network) {
    case 'LOCALHOST': {
      networkAddress = process.env.NETWORK_LOCAL;
      contractAddress = process.env.DAI_CONTRACT_LOCAL;
      break;
    }
    case 'KOVAN': {
      networkAddress = process.env.NETWORK_KOVAN;
      contractAddress = process.env.DAI_CONTRACT_KOVAN;
      networkInfo = {
        chain: 'kovan',
      };
      break;
    }
    case 'SOKOL': {
      networkAddress = process.env.NETWORK_SOKOL;
      contractAddress = process.env.DAI_CONTRACT_SOKOL;

      const customCommon = Common.forCustomChain(
        'mainnet',
        {
          name: 'sokol',
          networkId: 77,
          chainId: 77,
        },
        'petersburg'
      );
      networkInfo = {
        common: customCommon,
      };
      break;
    }
    default: {
      networkAddress = process.env.NETWORK_LOCAL;
      contractAddress = process.env.DAI_CONTRACT_LOCAL;
      networkInfo = {};
      break;
    }
  }
  return { networkAddress, contractAddress, networkInfo };
};

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

  // sign transaction
  const tx = new EthereumTx(rawTx, networkInfo);
  const privateKey = Buffer.from(sk, 'hex');
  tx.sign(privateKey);

  // sending transaction
  let error;
  let txHash;
  const serializedTx = `0x${tx.serialize().toString('hex')}`;
  await web3.eth.sendSignedTransaction(serializedTx, (err, hash) => {
    if (err) {
      console.log(err);
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
