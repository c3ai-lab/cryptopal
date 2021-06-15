// ================================================================================================
//  File Name: verify.js
//  Description:
//  This file holds functions for verifing the request sender. The request sender will be verified
//  if he is an user or if he is a merchant. This functions are used as middleware for by calling
//  several routes of the api. The varification token is a jason webtoken set in the header
//  containing the users id (cp-auth-token).
// ================================================================================================
const jwt = require('jsonwebtoken');
const User = require('../models/User/User');

/**
 * Middleware to identify if the by checking authentication header token.
 * If token is from a merchant the next function is called otherwise an error is thrown.
 * @param  {Object} req The request object
 * @param  {Object} res The response object
 * @param  {Function} next The function to proceed
 */
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

/**
 * Middleware to identify if the user is a merchant by checking
 * authentication header token. If token is from a merchant the
 * next function is called otherwise an error is thrown.
 * @param  {Object} req The request object
 * @param  {Object} res The response object
 * @param  {Function} next The function to proceed
 */
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
    // proceed to function - authentication successful
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};
