const jwt = require('jsonwebtoken');
const User = require('../models/User/User');

// middleware to identify the user and verify access
exports.user = async (req, res, next) => {
  // check if token is set
  const token = req.header('cp-auth-token');
  if (!token) return res.status(401).send('Access denied');

  try {
    // verify token
    const verified = jwt.verify(token, process.env.TOKEN_SECRET_AUTH);
    req.token = verified;
    // get user from db
    const user = await User.findOne({ _id: verified._id });
    if (!user) return res.status(400).send('User not found');
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

// middleware to identify the user and verify access
exports.merchant = async (req, res, next) => {
  // check if token is set
  const token = req.header('cp-auth-token');
  if (!token) return res.status(401).send('Access denied');

  try {
    // verify token
    const verified = jwt.verify(token, process.env.TOKEN_SECRET_AUTH);
    req.token = verified;
    // get user from db
    const user = await User.findOne({ _id: verified._id });
    if (!user) return res.status(400).send('User not found');
    req.user = user;
    // check if the user is merchant
    if (!user.merchant_id) {
      return res.status(400).send('You are not a merchant yet.');
    }
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};
