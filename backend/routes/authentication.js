const express = require('express');
const authentication = require('../controllers/authentication');

const router = express.Router();

// route to register a new user with authorization controller
router.post('/register', authentication.register);

// route to resend confirmation email with authorization controller
router.get(
  '/resend-confirmation/:email',
  authentication.resendConfirmationMail
);

// route to validate a user with authorization controller
router.get('/validate/:token', authentication.confirmRegistration);

// route to log in a user with authorization controller
router.post('/login', authentication.login);

// route to log in a user with authorization controller
router.post('/change-password', authentication.changePassword);

// route to log in a user with authorization controller
router.post('/recover-password', authentication.recoverPassword);

module.exports = router;
