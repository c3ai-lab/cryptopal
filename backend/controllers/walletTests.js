const { sendTransaction } = require('../helper/payment/sendTransaction');
const { generateKeyPair } = require('../helper/keyGeneration/generateKeyPair');

/** *******************GENERATE PUBLIC AND PRIVATE KEY*********************** */
exports.createKeys = async (req, res) => {
  // safe these in database
  const { address, publicKey, privateKey } = await generateKeyPair();

  res.status(201).send('Users keypair generated!');
};

/** *******************SEND TRANSACTION*********************** */
exports.signTransaction = async (req, res) => {
  sendTransaction()
    .then((hash) => res.status(201).send(hash))
    .catch((err) => res.status(400).send(err.message));
};
