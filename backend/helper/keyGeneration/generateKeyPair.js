const { hdkey } = require('ethereumjs-wallet');
const bip39 = require('bip39');

/** *******************GENERATE PUBLIC AND PRIVATE KEY*********************** */
exports.generateKeyPair = async () => {
  // path for ethereum wallets
  const mnemonic =
    'text index ability power inquiry easily vague lunch truly phrase fiscal inflict';
  // increment last index for next pair
  const path = "m/44'/60'/0'/0/0";

  const seed = await bip39.mnemonicToSeed(mnemonic);
  const hdwallet = hdkey.fromMasterSeed(seed);

  const wallet = hdwallet.derivePath(path).getWallet();
  const privateKey = wallet.getPrivateKeyString().slice(2);
  const publicKey = wallet.getPublicKeyString();
  const address = `0x${wallet.getAddress().toString('hex')}`;

  // safe these
  console.log(address);
  console.log(privateKey);
  console.log(publicKey);

  return { address, publicKey, privateKey };
};
