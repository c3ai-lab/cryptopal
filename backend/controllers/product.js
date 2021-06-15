// ================================================================================================
//  File Name: product.js
//  Description:
//  This file holds the diffrent functions for the products routes. These functions are called from
//  routes/products.js. Functions are adding, updating, deleting, getting one and getting all
//  products.
// ================================================================================================
const mongoose = require('mongoose');
const Product = require('../models/Product/Product');

/**
 * Adding a product to the database. Sending success/ error response
 * @param  {Object} req The request object with product data sent by user
 * @param  {Object} res The response object
 * @returns {Object} added product
 */
exports.addProduct = async (req, res) => {
  const { user } = req;

  // generate an id if the user does not provide one
  const id = req.body.id ? req.body.id : mongoose.Types.ObjectId();
  const creationTime = new Date().toISOString();

  // create new product with received data
  const product = new Product({
    _id: id,
    merchant_id: user.merchant_id,
    ...req.body,
    create_time: creationTime,
    update_time: creationTime,
  });

  // save new product in database
  try {
    await product.save();
    // send created product back
    res.status(201).send({
      id,
      ...req.body,
      create_time: creationTime,
      update_time: creationTime,
    });
  } catch (err) {
    if (err.code === 11000) return res.status(400).send('Duplicated id.');
    res.status(400).send('Failed saving product.');
  }
};

/**
 * Get products from database. Amount is set by req.query.page and req.query.page_size.
 * @param  {Object} req The request object send by user with page and page_size query
 * @param  {Object} res The response object
 * @returns {Array} Array of all requested products
 */
exports.getProducts = async (req, res) => {
  const { user } = req;

  // get all selected products by query params
  const page = parseInt(req.query.page, 10) || 1;
  const numberOfItems = parseInt(req.query.page_size, 10) || 10;
  const skippedItems = (page - 1) * numberOfItems;
  try {
    const products = await Product.find({ merchant_id: user.merchant_id })
      .skip(skippedItems)
      .limit(numberOfItems);

    // get total items and pages if requested
    if (req.query.total_required) {
      const allProducts = await Product.find({ merchant_id: user.merchant_id });
      const totalPages = Math.ceil(allProducts.length / numberOfItems);
      res.status(200).send({
        products,
        total_items: allProducts.length,
        total_pages: totalPages,
      });
    } else {
      res.status(200).send({ products });
    }
  } catch (err) {
    res.status(400).send('Failed fetching products.');
  }
};

/**
 * Get a product from database by id.
 * @param  {Object} req The request object with id param
 * @param  {Object} res The response object
 * @returns {Object} requested product
 */
exports.getProduct = async (req, res) => {
  try {
    // get product from database
    const product = await Product.findOne({ _id: req.params.id });
    // adjust returned data format
    const returnProduct = product.toObject();
    delete returnProduct._id;
    delete returnProduct.merchant_id;
    returnProduct.id = req.params.id;
    res.status(200).send(returnProduct);
  } catch (err) {
    res.status(400).send('Failed fetching product.');
  }
};

/**
 * Update a product by id.
 * @param  {Object} req The request object with id param and update data
 * @param  {Object} res The response object
 * @returns {Object} updated product
 */
exports.updateProduct = async (req, res) => {
  const { user } = req;
  // get product
  const product = await Product.findOne({
    _id: req.params.id,
    merchant_id: user.merchant_id,
  });
  if (!product) return res.status(400).send('Product not found');

  // change received values
  Object.entries(req.body).forEach(([key, value]) => {
    product[key] = value;
  });

  // change update time
  product.update_time = new Date();

  try {
    await product.save();
    res.status(204).send();
  } catch (err) {
    res.status(400).send('Failed updating product.');
  }
};

/**
 * Delete a product from database by id.
 * @param  {Object} req The request object with id param
 * @param  {Object} res The response object
 */
exports.deleteProduct = async (req, res) => {
  const { user } = req;

  // delete product
  try {
    await Product.deleteOne({
      _id: req.params.id,
      merchant_id: user.merchant_id,
    });
    res.status(204).send();
  } catch (err) {
    res.status(400).send('Failed deleting product.');
  }
};
