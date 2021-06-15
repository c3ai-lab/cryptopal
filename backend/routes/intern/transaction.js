// ================================================================================================
//  File Name: transaction.js
//  BasePath: /transaction
//  Description:
//  This file holds the diffrent routes for transactions and directs the request to the correct
//  functions of the transaction controller. For access control of this routes the verify user
//  middleware is used.This routes are only usered service intern by the frontend and are not
//  listed in the api documentation.
// ================================================================================================
const express = require('express');
const verify = require('../../middleware/verify');
const transaction = require('../../controllers/intern/transaction');

const router = express.Router();

// route to check if a entered payment receiver is valid
router.post('/check-payment', verify.user, transaction.checkPayment);

// route to send a payment to an other user
router.post('/send-payment', verify.user, transaction.sendPayment);

// route to get transaction details by id
router.get('/:id', verify.user, transaction.getTransaction);

// route to get a list of transactions
router.get('/', verify.user, transaction.getTransactions);

module.exports = router;
