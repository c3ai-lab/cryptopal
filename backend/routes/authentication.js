// ================================================================================================
//  File Name: authentication.js
//  BasePath: /auth
//  Description:
//  This file holds the diffrent routes for managing users credentials. Registration, confirmation,
//  login and password related requests are passed to the authentication controller after validating
//  the request body data.
// ================================================================================================
const express = require('express');
const authentication = require('../controllers/authentication');
const validate = require('../middleware/Validation/authValidation/authValidation');

const router = express.Router();

// route to register a new user with authorization controller
router.post('/register', validate.registerValidation, authentication.register);

// route to resend confirmation email with authorization controller
router.get(
  '/resend-confirmation/:email',
  authentication.resendConfirmationMail
);

// route to validate a user with authorization controller
router.get('/validate/:token', authentication.confirmRegistration);

// route to log in a user with authorization controller
router.post('/login', validate.loginValidation, authentication.login);

// route to log in a user with authorization controller
router.post(
  '/change-password',
  validate.changePasswordValidation,
  authentication.changePassword
);

// route to log in a user with authorization controller
router.post(
  '/recover-password',
  validate.recoverPasswordValidation,
  authentication.recoverPassword
);

module.exports = router;
