const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAILADDRESS_SENDER,
    pass: process.env.EMAILPASSWORD,
  },
});

// sending an email for registration confirmation
exports.sendConfirmationEmail = (user) => {
  // generate token for confirmation
  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET_CONFIRM, {
    expiresIn: '7d',
  });
  const mailOptions = {
    from: process.env.EMAILADDRESS_SENDER,
    to: user.email,
    subject: 'Confirm your registration',
    text: `Hi ${user.name}!\n\nThank you for signing up for Cryptopal - the payment provider for cryptocurrency.\n\nTo confirm your account, you need to click on the following link:\n\n${process.env.SERVER_URL}/auth/validation/${token}\n\nThis link will expire in seven (7) days, so if you don't manage to click on it in time, you'll need to sign in again.\n\nOnce you have validated your account, you will receive an email giving you access to Cryptopal. If we experience extremly high levels of demand, you may not receive you email immediately but we will do all that we can to get it to you as quickly as possible.\n\nYour Cryptopal-Team `,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      throw new Error('Failed to send email');
    }
  });
  return token;
};
