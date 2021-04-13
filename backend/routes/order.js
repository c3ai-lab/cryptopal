const express = require('express');
const order = require('../controllers/order');

const router = express.Router();

// route to create a new order with order controller
router.post('/', order.createOrder);

// route to get a specific order with order controller
router.get('/:id', order.getOrder);

module.exports = router;
