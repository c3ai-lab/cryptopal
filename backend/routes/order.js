const express = require('express');
const order = require('../controllers/order');
const validate = require('../middleware/Validation/orderValidation/orderValidation');

const router = express.Router();

// route to create a new order with order controller
router.post('/', validate.createOrderValidation, order.createOrder);

// route to get a specific order with order controller
router.get('/:id', order.getOrder);

// route to update specific order by id with order controller
router.patch('/:id', validate.updateOrderValidation, order.updateOrder);

module.exports = router;
