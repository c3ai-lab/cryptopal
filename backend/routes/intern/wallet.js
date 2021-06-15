// ================================================================================================
//  File Name: wallet.js
//  BasePath: /wallet
//  Description:
//  This file holds the diffrent routes for wallet related requests. All routes are protected by
//  the verify user middleware. Thies routes are only used by the frontend and are not listet
//  in the api documentation.
// ================================================================================================
const express = require('express');
const verify = require('../../middleware/verify');
const wallet = require('../../controllers/intern/wallet');

const router = express.Router();

// route to get users wallet address
router.get('/address', verify.user, wallet.getAddress);

// get all data ralated to dashboard on frontend
router.get('/dashboard', verify.user, wallet.getDashboardData);

// route to get some test tokens
router.post('/faucet', verify.user, wallet.getToken);

module.exports = router;
