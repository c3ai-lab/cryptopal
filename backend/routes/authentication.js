const express = require('express');
const authentication = require('../controllers/authentication');

const router = express.Router();

// route to register a new user with authorization controller
router.post('/register', authentication.register);

// route to log in a user with authorization controller
router.post('/login', authentication.login);

module.exports = router;
