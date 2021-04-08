const express = require('express');
const product = require('../controllers/product');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// route to add new product with product controller
router.post('/', verifyToken, product.addProduct);

// route to get specific product by id with product controller
router.get('/:id', verifyToken, product.getProduct);

// route to get all products of merchant with product controller
router.get('/', verifyToken, product.getProducts);

// route to update specific product by id with product controller
router.patch('/:id', verifyToken, product.updateProduct);

// route to delete specific product by id with product controller
router.delete('/:id', verifyToken, product.deleteProduct);

module.exports = router;
