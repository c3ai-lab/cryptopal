const express = require('express');
const wallet = require('../controllers/walletTests');

const router = express.Router();

// route to send an transaction
router.post('/send', wallet.sendPayment);

module.exports = router;
