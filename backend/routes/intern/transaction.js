const express = require('express');
const verify = require('../../middleware/verify');
const transaction = require('../../controllers/intern/transaction');

const router = express.Router();

// route to check if a entered payment receiver is valid
router.post('/check-payment', verify.user, transaction.checkPayment);

// route to send a payment
router.post('/send-payment', verify.user, transaction.sendPayment);

// route to get transaction details
router.get('/:id', verify.user, transaction.getTransaction);

module.exports = router;
