const EthereumTx = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common').default;
const Web3 = require('web3');

// Helper function to pad each payload data to needed 32 bit length
const pad32Bytes = (data) => {
  let s = String(data).slice(2);
  while (s.length < (64 || 2)) {
    s = `0${s}`;
  }
  return s;
};

/*
 * Returns the parameters to connect to the selected chain. The chain has to be set
 * in the .env file. This function also returns the address of the erc20 token.
 */
const getNetworkParams = () => {
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

/** *******************RECOVER PASSWORD HANDLER*********************** */
exports.sendTransaction = async () => {
  // get parameters from database
  const address = '0x1c0611d45c041bfa2d5e30fc584bbe3dabd5b39f';
  const sk = '8c09ee6adcbfa63dd28c3e00b4a7ca3954516896820d5d2ccb391fc7154f48fd';
  const addressTo = '0x1c97Fb80B4ddb3Dd429AC07351AA5b26752B31dF';

  // connect to network
  const { networkAddress, contractAddress, networkInfo } = getNetworkParams();
  const provider = new Web3.providers.HttpProvider(networkAddress);
  const web3 = new Web3(provider);

  /* --------------- generating payload for contract call ---------------*/
  // get hashed function identifier
  const funcSig = web3.utils.sha3('transfer(address,uint256)').slice(2, 10);
  // extend receiver address to 32 bit
  const padAddressTo = pad32Bytes(addressTo);
  // get extended hashed amount to send
  const amountWei = web3.utils.toWei('5');
  const amountHex = web3.utils.toHex(amountWei);
  const padAmount = pad32Bytes(amountHex);
  // combine values for function call into payload string
  const payload = funcSig + padAddressTo + padAmount;

  // get current network parameters for function call
  const txCount = await web3.eth.getTransactionCount(address);
  const gasPrice = await web3.eth.getGasPrice();

  // define transaction data
  const rawTx = {
    nonce: web3.utils.toHex(txCount),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex('80000'),
    to: contractAddress,
    value: '0x00',
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
