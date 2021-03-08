const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  registerValidation,
  loginValidation,
  changePasswordValidation,
} = require('../helper/validation');

// create and assign a token
const generateJWT = (id) => {
  const token = jwt.sign({ _id: id }, process.env.TOKEN_SECRET, {
    expiresIn: 900,
  });
  return token;
};

const getDataWithoutPassword = (user) => {
  const { password, ...otherData } = user._doc;
  return otherData;
};

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
    company: req.body.company,
    website: req.body.website,
    email: [{ value: req.body.email, type: 'private', primary: true }],
    address: {
      streetAddress: req.body.streetAddress,
      locality: req.body.locality,
      region: req.body.region,
      postalCode: req.body.postalCode,
      country: req.body.country,
    },
    phone: req.body.phone,
    verifiedAccount: false,
    payerId: mongoose.Types.ObjectId(),
    merchantId: null,
    password: hashedPassword,
  });
  try {
    // save user
    const savedUser = await user.save();
    // send token and user data to client
    const token = generateJWT(savedUser._id);
    const returnedUser = getDataWithoutPassword(user);
    res.status(200).send({ token, user: returnedUser });
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

  const token = generateJWT(user._id);
  const returnedUser = getDataWithoutPassword(user);

  res.status(200).send({
    token,
    user: returnedUser,
  });
};

/** *******************CHANGE PASSWORD HANDLER*********************** */
exports.changePassword = async (req, res) => {
  // validate received data
  const { error } = changePasswordValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user is already in the database
  const user = await User.findOne({ _id: req.body.id });
  if (!user) return res.status(400).send('User id cannot be found');

  // check if password is correct
  const validPassword = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );
  if (!validPassword) {
    return res.status(400).send('Invalid password');
  }

  try {
    // hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
    user.password = hashedPassword;

    await user.save(); // save user in database

    res.status(200).send();
  } catch (err) {
    res.status(400).send(err); // send db error
  }
};
