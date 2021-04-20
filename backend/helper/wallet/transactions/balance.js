const Web3 = require('web3');
const { getNetworkParams } = require('./sendTransaction');
const config = require('./dai_contract.json');

exports.getBalance = async (address) => {
  // connect to network
  const { networkAddress } = getNetworkParams();
  const provider = new Web3.providers.HttpProvider(networkAddress);
  const web3 = new Web3(provider);

  const contract = new web3.eth.Contract(
    config.abi,
    process.env.DAI_CONTRACT_KOVAN
  );

  const balance = await contract.methods.balanceOf(address).call();
  return web3.utils.fromWei(balance);
};
