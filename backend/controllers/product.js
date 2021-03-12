const mongoose = require('mongoose');
const {
  addProductValidation,
  getProductsValidation,
} = require('../helper/productValidation/productValidation');
const User = require('../models/User');
const Product = require('../models/Product');

/** **********************ADD PRODUCT HANDLER*********************** */
exports.addProduct = async (req, res) => {
  // get user from database
  const user = await User.findOne({ _id: req.token._id });
  if (!user) return res.status(400).send('User not found');

  // check if sender is merchant
  if (!user.merchant_id) {
    return res.status(400).send('No Merchant. Upgrade to merchant first');
  }

  // validate received data before creating a product
  const { error } = addProductValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.body.id ? req.body.id : mongoose.Types.ObjectId();

  // create new product with received data
  const product = new Product({
    _id: id,
    merchant_id: user.merchant_id,
    ...req.body,
  });

  // save new product in database
  try {
    await product.save();
    // send created product back
    res.status(201).send({ id, ...req.body });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) return res.status(400).send('Duplicated id.');
    res.status(400).send('Failed saving product.');
  }
};

/** **********************GET ALL PRODUCTS HANDLER*********************** */
exports.getProducts = async (req, res) => {
  // validate received data before creating a product
  const { error } = getProductsValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // get user from database
  const user = await User.findOne({ _id: req.token._id });
  if (!user) return res.status(400).send('User not found');

  // check if the user is merchant
  if (!user.merchant_id) {
    return res.status(400).send('You are not a merchant yet.');
  }

  // get all selected products by query params
  const page = req.body.page || 1;
  const numberOfItems = req.body.page_size || 10;
  const skippedItems = (page - 1) * numberOfItems;
  try {
    const products = await Product.find({ merchant_id: user.merchant_id })
      .skip(skippedItems)
      .limit(numberOfItems);

    // get total items and pages if requested
    if (req.body.total_required) {
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

/** **********************GET SINGLE PRODUCT HANDLER*********************** */
exports.getProduct = async (req, res) => {
  // get product from database
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send('Failed fetching product.');
  }
};
