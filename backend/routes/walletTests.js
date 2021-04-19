const express = require('express');
const wallet = require('../controllers/walletTests');

const router = express.Router();

// route to create a new keypair for user
router.post('/create', wallet.createKeys);

// route to send an transaction
router.post('/send', wallet.sendPayment);

// route to get some test tokens
router.post('/faucet', wallet.getToken);

module.exports = router;
