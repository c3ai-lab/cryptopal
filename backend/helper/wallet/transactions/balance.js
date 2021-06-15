// ================================================================================================
//  File Name: balance.js
//  Description:
//  This function fetches the balance for the given address. It is using web3 and makes a contract
//  call to the provided dai contract for requesting current balance. The contract address has to
//  be set in .env file.
// ================================================================================================
const Web3 = require('web3');
const { getNetworkParams } = require('../networkConfig');
const config = require('./dai_contract.json');

/**
 * Get balance of user by calling ERC20 token contract with requested address on connected
 * blockchain.
 * @param  {String} address The address of the wallet
 * @return {String} The ERC20 token balance of the wallet
 */
exports.getBalance = async (address) => {
  // connect to network
  const { networkAddress } = getNetworkParams();
  const provider = new Web3.providers.HttpProvider(networkAddress);
  const web3 = new Web3(provider);

  // define interface to erc20 token
  const contract = new web3.eth.Contract(
    config.abi,
    process.env.DAI_CONTRACT_KOVAN
  );

  // get erc20 token balance
  const balance = await contract.methods.balanceOf(address).call();
  return web3.utils.fromWei(balance);
};
