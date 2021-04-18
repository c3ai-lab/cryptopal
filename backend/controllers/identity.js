const jwt = require('jsonwebtoken');
const { sendChangeEmailConfirmation } = require('../helper/mailer/mailSender');
const User = require('../models/User/User');

/** *******************GET USER INFO HANDLER******************* */
exports.getUserInfo = async (req, res) => {
  const { user } = req;
  const returnedUser = {
    user_id: user._id,
    name: user.given_name + user.family_name,
    given_name: user.given_name,
    family_name: user.family_name,
    emails: [user.emails],
    address: user.address,
    verified_account: user.verified_account,
    payer_id: user.payer_id,
  };
  res.status(200).send(returnedUser);
};

/** *******************UPDATE USER INFO HANDLER******************* */
exports.updateUserInfo = async (req, res) => {
  const { user } = req;
  const updateData = req.body.user;

  // check if email was changed
  if (updateData.emails[0].value !== user.emails[0].value) {
    const existingEmail = await User.findOne({
      login_name: updateData.emails[0].value,
    });
    // check if new email is already used for another account
    if (existingEmail) {
      return res
        .status(400)
        .send('Email already connected to another account.');
    }
    // send email with change email address request
    sendChangeEmailConfirmation({
      id: user.payer_id,
      name: user.given_name,
      oldEmail: user.emails[0].value,
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
    await user.save();
    res.redirect(`${process.env.FRONTEND_URL}/email-confirmed`);
  } catch (err) {
    res.status(400).send('Failed Email change');
  }
};

/** *******************UPGRADE USER TO MERCHANT HANDLER******************* */
exports.upgradeToMerchant = async (req, res) => {
  const { user } = req;

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
  const { user } = req;

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
