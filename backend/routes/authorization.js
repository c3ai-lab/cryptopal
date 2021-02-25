const express = require('express');
const authorization = require('../controllers/authorization');

const router = express.Router();

router.post('/register', authorization.register);

module.exports = router;
