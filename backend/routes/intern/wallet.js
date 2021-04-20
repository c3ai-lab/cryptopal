const express = require('express');
const verify = require('../../middleware/verify');
const wallet = require('../../controllers/intern/wallet');

const router = express.Router();

// route to get information about users wallet
router.get('/address', verify.user, wallet.getAddress);

// get all data ralated to dashboard
router.get('/dashboard', verify.user, wallet.getDashboardData);

// route to get some test tokens
router.post('/faucet', wallet.getToken);

module.exports = router;
