const express = require('express');
const order = require('../controllers/order');
const verify = require('../middleware/verify');

const router = express.Router();

// route to add new product with product controller
router.post('/', order.createOrder);

module.exports = router;
