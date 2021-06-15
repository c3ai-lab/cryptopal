// ================================================================================================
//  File Name: generateKyPair.js
//  Description:
//  This file holds a function to generate a private and public key pair for each user. All
//  wallets are generated with the same seed incrementing the accounts path. The private key
//  is encrypted with cryptojs. For generating the keys bip39 and ethereumjs-wallet is used.
// ================================================================================================
const { hdkey } = require('ethereumjs-wallet');
const bip39 = require('bip39');
const CryptoJS = require('crypto-js');

/**
 * Generating address, public and encrypted private key for passed in path index
 * of the mnemonic seed given in .env file.
 * @param  {Number} index The index of the wallet to be created
 * @return {Object} Containing the address, public and encrypted private key
 */
exports.generateKeyPair = async (index) => {
  // path for ethereum wallets
  const mnemonic = process.env.MNEMONIC;
  // increment last index for next pair
  const path = `m/44'/60'/0'/0/${index}`;

  // get seed
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const hdwallet = hdkey.fromMasterSeed(seed);

  // get next address, private and public key for wallet
  const wallet = hdwallet.derivePath(path).getWallet();
  let privateKey = wallet.getPrivateKeyString().slice(2);
  const publicKey = wallet.getPublicKeyString().slice(2);
  const address = `0x${wallet.getAddress().toString('hex')}`;

  // encode private key
  privateKey = CryptoJS.AES.encrypt(
    privateKey,
    process.env.SECRET_PRIVATE_KEY
  ).toString();

  return { address, publicKey, privateKey };
};
