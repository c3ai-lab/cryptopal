const express = require('express');
const authorization = require('../controllers/authorization');

const router = express.Router();

// route to register a new user with authorization controller
router.post('/register', authorization.register);

// route to log in a user with authorization controller
router.post('/login', authorization.login);

module.exports = router;
