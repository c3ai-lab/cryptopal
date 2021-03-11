const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generator = require('generate-password');
const User = require('../models/User');
const {
  registerValidation,
  loginValidation,
  changePasswordValidation,
  recoverPasswordValidation,
} = require('../helper/validation');
const {
  sendRegisterConfirmationEmail,
  sendPasswordRecoveryEmail,
} = require('../helper/mailSender');

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

  const payerId = mongoose.Types.ObjectId(); // unique payerId

  // get confirmation token and send email
  sendRegisterConfirmationEmail({
    id: payerId,
    email: req.body.email,
    name: req.body.givenName,
  });

  // create user with received data
  const user = new User({
    login_name: req.body.email,
    given_name: req.body.givenName,
    family_name: req.body.familyName,
    company: req.body.company,
    website: req.body.website,
    emails: [{ value: req.body.email, type: 'private', primary: true }],
    address: {
      street_address: req.body.streetAddress,
      locality: req.body.locality,
      region: req.body.region,
      postal_code: req.body.postalCode,
      country: req.body.country,
    },
    phone: req.body.phone,
    verified_account: false,
    payer_id: payerId,
    merchant_id: null,
    password: hashedPassword,
  });
  try {
    await user.save(); // save user
    res.status(200).send({ user: { email: req.body.email } });
  } catch (err) {
    res.status(400).send(err); // send db error
  }
};

/** *******************RESEND CONFIRMATION EMAIL HANDLER******************* */
exports.resendConfirmationMail = async (req, res) => {
  const user = await User.findOne({
    emails: { $elemMatch: { value: req.params.email, primary: true } },
  });
  if (!user) return res.status(400).send('Invalid email');

  if (user.verified_account) {
    return res.status(401).send('User already verified');
  }

  sendRegisterConfirmationEmail({
    id: user.payer_id,
    email: req.params.email,
    name: user.given_name,
  });

  res.status(200).send('Successfully send email');
};

/** **********************CONFIRM REGISTRATION HANDLER*********************** */
exports.confirmRegistration = async (req, res) => {
  const decodedUser = jwt.verify(
    req.params.token,
    process.env.TOKEN_SECRET_CONFIRM
  );
  const user = await User.findOne({ payer_id: decodedUser.id });
  if (!user) return res.status(400).send('Invalid Token');

  user.verified_account = true;
  user.save();
  res.redirect(`${process.env.FRONTEND_URL}/email-confirmed`);
};

/** **********************LOGIN HANDLER*********************** */
exports.login = async (req, res) => {
  // validate received data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user is already in the database
  const user = await User.findOne({ login_name: req.body.email });
  if (!user) return res.status(400).send('Invalid email');

  // check if email is confirmed
  if (!user.verified_account) {
    return res.status(400).send('Email not confirmed.');
  }

  // check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send('Invalid password');
  }

  // create auth token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_AUTH, {
    expiresIn: 900,
  });

  // delete password from response user data
  const { password, ...userWithoutPw } = user._doc;

  res.status(200).send({
    token,
    user: userWithoutPw,
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

/** *******************RECOVER PASSWORD HANDLER*********************** */
exports.recoverPassword = async (req, res) => {
  // validate received data
  const { error } = recoverPasswordValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user is already in the database
  const user = await User.findOne({ login_name: req.body.email });
  if (!user || user.family_name !== req.body.family_name) {
    return res.status(400).send('User cannot be found');
  }

  // generate new random password
  const password = generator.generate({
    length: 10,
    numbers: true,
  });

  // hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;

  // send email with new password
  const { login_name, given_name } = user;
  sendPasswordRecoveryEmail({ login_name, given_name }, password);
  try {
    await user.save(); // save user in database
    res.status(200).send('Send email with new password.');
  } catch (err) {
    res.status(400).send(err); // send db error
  }
};
