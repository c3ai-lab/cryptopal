const mongoose = require('mongoose');
const {
  addProductValidation,
} = require('../helper/productValidation/productValidation');
const Product = require('../models/Product');

/** **********************ADD PRODUCT HANDLER*********************** */
exports.addProduct = async (req, res) => {
  // validate received data before creating a product
  const { error } = addProductValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log('object');
  console.log(req.body);
};
