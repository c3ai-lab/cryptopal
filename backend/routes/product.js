const express = require('express');
const product = require('../controllers/product');

const router = express.Router();

// route to add new product with product controller
router.post('/', product.addProduct);

module.exports = router;
