const express = require('express');
const verify = require('../../middleware/verify');
const wallet = require('../../controllers/intern/wallet');

const router = express.Router();

// route to get information about users wallet
router.get('/address', verify.user, wallet.getAddress);

// get all data ralated to dashboard
router.get('/dashboard', verify.user, wallet.getDashboardData);

// route to get some test tokens
router.post('/faucet', verify.user, wallet.getToken);

// route to get some test tokens
router.post('/check-payment', verify.user, wallet.checkPayment);

// route to get some test tokens
router.post('/send-payment', verify.user, wallet.sendPayment);

module.exports = router;
