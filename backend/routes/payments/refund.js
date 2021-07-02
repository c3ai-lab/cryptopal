// ================================================================================================
//  File Name: captures.js
//  BasePath: /payments/captures
//  Description:
//  This file holds the diffrent routes for managing payments captures. Captured payments can be
//  requested or refunded.
// ================================================================================================
const express = require('express');
const captures = require('../../controllers/payments/captures');
const verify = require('../../middleware/verify');

const router = express.Router();

// route to get informations for refunded payment by id
router.get('/:id', verify.user, captures.getCapturedPayment);

module.exports = router;
