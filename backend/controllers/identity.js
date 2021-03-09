const User = require('../models/User');

/** *******************RESEND CONFIRMATION EMAIL HANDLER******************* */
exports.getUserInfo = async (req, res) => {
  const user = await User.findOne({ _id: req.token._id });
  if (!user) return res.status(400).send('Invalid authorization token');

  const returnedUser = {
    user_id: user._id,
    name: user.givenName + user.familyName,
    given_name: user.givenName,
    family_name: user.familyName,
    emails: user.email,
    address: user.address,
    verified_account: user.verifiedAccount,
    payer_id: user.payerId,
  };
  res.status(200).send(returnedUser);
};
/** *******************UPDATE USER INFO HANDLER******************* */
exports.updateUserInfo = async (req, res) => {
  // delete for variables, which should not be changed by user
  const updateData = req.body.user;
  delete updateData._id;
  delete updateData.loginName;
  delete updateData.verifiedAccount;
  delete updateData.payerId;
  delete updateData.merchantId;
  delete updateData.password;

  // update database entry
  const user = await User.findOneAndUpdate(
    { _id: req.token._id },
    { $set: { ...updateData } },
    { useFindAndModify: false }
  );
  if (!user) return res.status(400).send('Invalid authorization token');

  res.status(200).send('Successfully updated');
};
