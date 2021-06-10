const express = require('express');
const order = require('../controllers/order');
const verify = require('../middleware/verify');
const validate = require('../middleware/Validation/orderValidation/orderValidation');

const router = express.Router();

// route to create a new order with order controller
router.post(
  '/',
  verify.merchant,
  validate.createOrderValidation,
  order.createOrder
);

// route to authorize a payment for order with order controller
router.post('/:id/authorize', verify.user, order.authorizePayment);

// route to capture a payment for order with order controller
router.post('/:id/capture', verify.user, order.capturePayment);

// route to get a specific order with order controller
router.get('/:id', verify.user, order.getOrder);

// route to update specific order by id with order controller
router.patch(
  '/:id',
  verify.merchant,
  validate.updateOrderValidation,
  order.updateOrder
);

module.exports = router;
