// ================================================================================================
//  File Name: identity.js
//  BasePath: /identity
//  Description:
//  This file holds the diffrent routes for managing users information. Users can get users
//  information, update personal information and change role between user and merchant. The verify
//  middleware is used for access control. The requests are passed to the related functions in
//  identity controller.
// ================================================================================================
const express = require('express');
const identity = require('../controllers/identity');
const verify = require('../middleware/verify');

const router = express.Router();

// route to get users information with identity controller
router.get('/userinfo', verify.user, identity.getUserInfo);

// route to update users information with identity controller
router.patch('/userinfo', verify.user, identity.updateUserInfo);

// route to validate users email change with identity controller
router.get('/validate/:token', identity.validateEmailChange);

// route to upgrade user to merchant with identity controller
router.post('/upgrade-merchant', verify.user, identity.upgradeToMerchant);

// route to downgrade merchant to user with identity controller
router.post('/downgrade-user', verify.merchant, identity.downgradeToUser);

module.exports = router;
