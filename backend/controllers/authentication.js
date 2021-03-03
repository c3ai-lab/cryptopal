const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../helper/validation');

/** **********************REGISTER HANDLER*********************** */
exports.register = async (req, res) => {
  // validate received data before creating a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user is already in the database
  const emailExists = await User.findOne({ loginName: req.body.email });
  if (emailExists) return res.status(400).send('Email already exists');

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create user with received data
  const user = new User({
    loginName: req.body.email,
    givenName: req.body.givenName,
    familyName: req.body.familyName,
    email: [{ value: req.body.email, type: 'private', primary: true }],
    address: {
      streetAddress: req.body.streetAddress,
      locality: req.body.locality,
      region: req.body.region,
      postalCode: req.body.postalCode,
      country: req.body.country,
    },
    verifiedAccount: false,
    payerId: mongoose.Types.ObjectId(),
    password: hashedPassword,
  });

  // save user
  try {
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err); // send db error
  }
};

/** **********************LOGIN HANDLER*********************** */
exports.login = async (req, res) => {
  // validate received data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user is already in the database
  const user = await User.findOne({ loginName: req.body.email });
  if (!user) return res.status(400).send('Invalid email');

  // check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send('Invalid password');
  }

  // create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.setHeader('auth-token', token);
  res.send(token);
};
