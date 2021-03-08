const express = require('express');
const identity = require('../controllers/identity');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// route to get users information with identity controller
router.get('/userinfo', verifyToken, identity.getUserInfo);

module.exports = router;
