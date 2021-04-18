const { hdkey } = require('ethereumjs-wallet');
const bip39 = require('bip39');

/** *******************GENERATE PUBLIC AND PRIVATE KEY*********************** */
exports.generateKeyPair = async (index) => {
  // path for ethereum wallets
  const mnemonic =
    'text index ability power inquiry easily vague lunch truly phrase fiscal inflict';
  // increment last index for next pair
  const path = `m/44'/60'/0'/0/${index}`;

  // get seed
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const hdwallet = hdkey.fromMasterSeed(seed);

  // get next address, private and public key for wallet
  const wallet = hdwallet.derivePath(path).getWallet();
  const privateKey = wallet.getPrivateKeyString().slice(2);
  const publicKey = wallet.getPublicKeyString().slice(2);
  const address = `0x${wallet.getAddress().toString('hex')}`;

  return { address, publicKey, privateKey };
};
