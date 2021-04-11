const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { sendChangeEmailConfirmation } = require('../helper/mailSender');
const User = require('../models/User/User');
const Email = require('../models/User/Email');
const Address = require('../models/User/Address');

/** *******************GET USER INFO HANDLER******************* */
exports.getUserInfo = async (req, res) => {
  const user = await User.findOne({ _id: req.token._id });
  if (!user) return res.status(400).send('User not found');

  const returnedUser = {
    user_id: user._id,
    name: user.given_name + user.family_name,
    given_name: user.given_name,
    family_name: user.family_name,
    emails: user.emails,
    address: user.address,
    verified_account: user.verified_account,
    payer_id: user.payer_id,
  };
  res.status(200).send(returnedUser);
};

/** *******************UPDATE USER INFO HANDLER******************* */
exports.updateUserInfo = async (req, res) => {
  const updateData = req.body.user;
  // get user from database
  const currentUser = await User.findOne({ _id: req.token._id });
  if (!currentUser) return res.status(400).send('User not found');

  // check if address details changed
  const address = await Address.findOne({
    _id: currentUser.address.address_id,
  });

  const { _id, ...storedAddressData } = address._doc;
  delete updateData.address._id;
  if (!_.isEqual(storedAddressData, updateData.address)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(updateData.address)) {
      address[key] = value;
    }
    await address.save();
  }
  delete updateData.address;

  // check if new email is already used for another account
  const existingEmail = await User.findOne({
    login_name: updateData.emails[0].value,
  });

  if (!currentUser.equals(existingEmail)) {
    if (existingEmail) {
      return res
        .status(400)
        .send('Email already connected to another account.');
    }
    // send email with change email address request
    const currentEmail = await Email.findOne({
      _id: currentUser.emails[0].email_id,
    });
    sendChangeEmailConfirmation({
      id: currentUser.payer_id,
      name: currentUser.given_name,
      oldEmail: currentEmail.value,
      newEmail: updateData.emails[0].value,
    });
    // dont set email yet - wait for confirmation
    delete updateData.emails;
  }

  // update database entry
  try {
    await User.findOneAndUpdate(
      { _id: req.token._id },
      { $set: { ...updateData } },
      { useFindAndModify: false }
    );

    res.status(200).send(updateData);
  } catch (err) {
    res.status(400).send('Failed to update user!');
  }
};

/** *******************VALIDATE CHANGE EMAIL HANDLER******************* */
exports.validateEmailChange = async (req, res) => {
  // check if token is valid
  const decodedUser = jwt.verify(
    req.params.token,
    process.env.TOKEN_SECRET_CONFIRM
  );

  const user = await User.findOne({ payer_id: decodedUser.id });
  if (!user) return res.status(400).send('Invalid Token');

  // save new email of user in database
  const email = await Email.findOne({ _id: user.emails[0].email_id });
  email.value = req.query.email;
  user.login_name = req.query.email;

  try {
    await email.save();
    await user.save();
    res.redirect(`${process.env.FRONTEND_URL}/email-confirmed`);
  } catch (err) {
    res.status(400).send('Failed Email change');
  }
};

/** *******************UPGRADE USER TO MERCHANT HANDLER******************* */
exports.upgradeToMerchant = async (req, res) => {
  // get user from database
  const user = await User.findOne({ _id: req.token._id });
  if (!user) return res.status(400).send('User not found');

  // use unique userid as merchant id
  const id = user._id;
  user.merchant_id = id;

  // save changes in db
  try {
    user.save();
    res.status(200).send({ merchant_id: id });
  } catch (err) {
    res.status(400).send('Upgrade failed');
  }
};

/** *******************DOWNGRADE MERCHANT TO USER HANDLER******************* */
exports.downgradeToUser = async (req, res) => {
  // get user from database
  const user = await User.findOne({ _id: req.token._id });
  if (!user) return res.status(400).send('User not found');

  // reset merchant id
  user.merchant_id = null;

  // save changes in db
  try {
    user.save();
    res.status(200).send();
  } catch (err) {
    res.status(400).send('Upgrade failed');
  }
};
