const express = require('express');
const product = require('../controllers/product');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// route to add new product with product controller
router.post('/', verifyToken, product.addProduct);

// route to get all products of merchant with product controller
router.get('/', product.getProducts);

module.exports = router;
