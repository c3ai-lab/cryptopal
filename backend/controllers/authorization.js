const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { registerValidation } = require('../helper/validation');

exports.register = async (req, res) => {
  // validate data before creating a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user is already in the database
  const emailExists = await User.findOne({ email: { value: req.body.email } });
  if (emailExists) return res.status(400).send('Email already exists');

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create user
  const user = new User({
    name: `${req.body.givenName} ${req.body.familyName}`,
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
