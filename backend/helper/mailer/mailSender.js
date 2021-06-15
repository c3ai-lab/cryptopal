// ================================================================================================
//  File Name: mailSender.js
//  Description:
//  This class holds functions to send emails. Emails are send with nodemailer. Emails are send for
//  registration confirmation, recovery of the password and confirmation for password changes.
//  The credentials for the mail acoount must be set in .env file.
// ================================================================================================
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// defining transporter to connect to mail host
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_PROVIDER,
  port: 587,
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false,
  },
  debug: true,
  auth: {
    user: process.env.EMAILADDRESS_SENDER,
    pass: process.env.EMAILPASSWORD,
  },
});

/**
 * Sending an confirmation email for the users registration
 * @param  {Object} user The id, name and email address of the user
 */
exports.sendRegisterConfirmationEmail = (user) => {
  // generate token for confirmation
  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET_CONFIRM, {
    expiresIn: '7d',
  });

  // create mail object
  const mailOptions = {
    from: process.env.EMAILADDRESS_SENDER,
    to: user.email,
    subject: 'Confirm your registration',
    text: `Hi ${user.name}!\n\nThank you for signing up for Cryptopal - the payment provider for cryptocurrency.\n\nTo confirm your account, you need to click on the following link:\n\n${process.env.SERVER_URL}/api/auth/validate/${token}\n\nThis link will expire in seven (7) days, so if you don't manage to click on it in time, you'll need to sign in again.\n\nOnce you have validated your account, you will receive an email giving you access to Cryptopal. If we experience extremly high levels of demand, you may not receive you email immediately but we will do all that we can to get it to you as quickly as possible.\n\nYour Cryptopal-Team `,
  };

  // send email with defined transporter
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      throw new Error('Failed to send email');
    }
  });
};

/**
 * Sending an confirmation email for changing users email address
 * @param  {Object} user The id, name, new email and old email address of the user
 */
exports.sendChangeEmailConfirmation = (user) => {
  // generate token for confirmation
  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET_CONFIRM, {
    expiresIn: '7d',
  });

  // creating mail object
  const mailOptions = {
    from: process.env.EMAILADDRESS_SENDER,
    to: user.oldEmail,
    subject: 'Confirm email change',
    text: `Hi ${user.name}!\n\nYou requested an email address change for your CryptoPal account. For your security you have to confirm the change of the email address.\n\nNew email address:\n\n${user.newEmail}\n\nTo confirm the changes, you need to click on the following link:\n\n${process.env.SERVER_URL}/api/identity/validate/${token}?email=${user.newEmail}\n\nThis link will expire in seven (7) days, so if you don't manage to click on it in time, no changes will be made.\n\nYour Cryptopal-Team `,
  };

  // send confirmation email with defined transporter
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      throw new Error('Failed to send email');
    }
  });
};

/**
 * Sending an email with a new password for the user
 * @param  {Object} user The login name and given name of the user
 * @param  {String} password The new password of the users account
 */
exports.sendPasswordRecoveryEmail = (user, password) => {
  // create mail object
  const mailOptions = {
    from: process.env.EMAILADDRESS_SENDER,
    to: user.login_name,
    subject: 'Recovery',
    text: `Hi ${user.given_name}!\n\nYou requested a new password for your CryptoPal account.\n\nNew password:\n${password}\n\nWe strongly recommend to change the password after you logged in.\n\nYour Cryptopal-Team `,
  };

  // send email with defined transporter
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      throw new Error('Failed to send email');
    }
  });
};
