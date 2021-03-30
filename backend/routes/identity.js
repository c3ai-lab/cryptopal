const express = require('express');
const identity = require('../controllers/identity');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// route to get users information with identity controller
router.get('/userinfo', verifyToken, identity.getUserInfo);

// route to update users information with identity controller
router.patch('/userinfo', verifyToken, identity.updateUserInfo);

// route to validate users email change with identity controller
router.get('/validate/:token', identity.validateEmailChange);

// route to upgrade user to merchant with identity controller
router.post('/upgrade-merchant', verifyToken, identity.upgradeToMerchant);

// route to downgrade merchant to user with identity controller
router.post('/downgrade-user', verifyToken, identity.downgradeToUser);

module.exports = router;
