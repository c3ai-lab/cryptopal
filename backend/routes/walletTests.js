const express = require('express');
const wallet = require('../controllers/walletTests');

const router = express.Router();

// route to send an transaction
router.post('/encode', wallet.encode);

module.exports = router;
