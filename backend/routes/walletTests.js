const express = require('express');
const wallet = require('../controllers/walletTests');

const router = express.Router();

// route to create a new order with order controller
router.post('/create', wallet.createKeys);

// route to create a new order with order controller
router.post('/sign', wallet.signTransaction);

module.exports = router;
