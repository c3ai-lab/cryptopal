/* eslint-disable object-curly-newline */
const CryptoJS = require('crypto-js');

/** *******************ENCODE PRIVATE KEY*********************** */
// function to encode given private key with server salt
const encodeKey = async (sec) => {
  // encode private key
  const privateKey = CryptoJS.AES.encrypt(
    sec,
    process.env.SECRET_PRIVATE_KEY
  ).toString();

  // return promise
  const error = false;
  return new Promise((resolve, reject) => {
    if (error) {
      reject(error);
    } else {
      resolve(privateKey);
    }
  });
};

exports.encode = async (req, res) => {
  encodeKey(req.privateKey)
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(400).send(err.message));
};
