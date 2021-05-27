/*
 * Returns the parameters to connect to the selected chain. The chain has to be set
 * in the .env file. This function also returns the address of the erc20 token.
 */
const Common = require('ethereumjs-common').default;

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
    case 'COSTUM': {
      networkAddress = process.env.NETWORK_CUSTOM;
      contractAddress = process.env.DAI_CONTRACT_CUSTOM;
      networkInfo = {
        chain: 'kovan',
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
