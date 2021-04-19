const Web3 = require('web3');
const { getNetworkParams, sendTransaction } = require('./sendTransaction');

// Helper function to pad each payload data to needed 32 bit length
const pad32Bytes = (data) => {
  let s = String(data).slice(2);
  while (s.length < (64 || 2)) {
    s = `0${s}`;
  }
  return s;
};

/** *******************SEND TOKENS FOR PAYMENT*********************** */
exports.sendPayment = async (from, to, value, sk) => {
  // connect to network
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

  return sendTransaction(
    web3,
    from,
    contractAddress,
    '0',
    payload,
    networkInfo,
    sk
  );
};
