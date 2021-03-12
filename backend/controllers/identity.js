const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { sendChangeEmailConfirmation } = require('../helper/mailSender');
const User = require('../models/User');

/** *******************GET USER INFO HANDLER******************* */
exports.getUserInfo = async (req, res) => {
  const user = await User.findOne({ _id: req.token._id });
  if (!user) return res.status(400).send('Invalid authorization token');

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
  // delete for variables, which should not be changed by user
  const updateData = req.body.user;
  delete updateData._id;
  delete updateData.login_name;
  delete updateData.verified_account;
  delete updateData.payer_id;
  delete updateData.merchant_id;
  delete updateData.password;

  const storedUser = await User.findOne({ _id: req.token._id });
  if (!storedUser) return res.status(400).send('Invalid authorization token');

  // check if email was changed - need confirmation
  if (
    updateData.emails &&
    updateData.emails[0].value !== storedUser.emails[0].value
  ) {
    // check if new email is already used for another account
    const existingEmail = await User.findOne({
      login_name: updateData.emails[0].value,
    });
    if (existingEmail) {
      return res
        .status(400)
        .send('Email already connected to another account.');
    }
    // send email with change email address request
    sendChangeEmailConfirmation({
      id: storedUser.payer_id,
      name: storedUser.given_name,
      oldEmail: storedUser.emails[0].value,
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
  user.emails[0].value = req.query.email;
  user.login_name = req.query.email;
  try {
    user.save();
    res.redirect(`${process.env.FRONTEND_URL}/email-confirmed`);
  } catch (err) {
    res.status(400).send('Failed Email change');
  }
};

/** *******************UPGRATE USER TO MERCHANT HANDLER******************* */
exports.upgradeToMerchant = async (req, res) => {
  const user = await User.findOne({ _id: req.token._id });
  if (!user) return res.status(400).send('Invalid authorization token');

  // generate unique merchantId for user
  const merchantId = mongoose.Types.ObjectId();
  user.merchant_id = merchantId;

  // save changes in db
  try {
    user.save();
    res.status(200).send('Upgrade successful');
  } catch (err) {
    res.status(400).send('Upgrade failed');
  }
};
