// ================================================================================================
//  File Name: product.js
//  BasePath: /product
//  Description:
//  This file holds the diffrent routes for managing products. A merchant can do all CRUD operations
//  on products. Access control is managed by verify middleware that only merchants can modify.
//  products. Data validation is made by productValidation. All routes are passed to the related
//  functions in product controller.
// ================================================================================================
const express = require('express');
const product = require('../controllers/product');
const verify = require('../middleware/verify');
const validate = require('../middleware/Validation/productValidation/productValidation');

const router = express.Router();

// route to add new product with product controller
router.post(
  '/',
  validate.addProductValidation,
  verify.merchant,
  product.addProduct
);

// route to get specific product by id with product controller
router.get('/:id', verify.merchant, product.getProduct);

// route to get all products of merchant with product controller
router.get(
  '/',
  validate.getProductsValidation,
  verify.merchant,
  product.getProducts
);

// route to update specific product by id with product controller
router.patch(
  '/:id',
  validate.updateProductValidation,
  verify.merchant,
  product.updateProduct
);

// route to delete specific product by id with product controller
router.delete('/:id', verify.merchant, product.deleteProduct);

module.exports = router;
