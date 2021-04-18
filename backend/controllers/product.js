const mongoose = require('mongoose');
const Product = require('../models/Product/Product');

/** **********************ADD PRODUCT HANDLER*********************** */
exports.addProduct = async (req, res) => {
  const { user } = req;

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
    console.log(err);
    if (err.code === 11000) return res.status(400).send('Duplicated id.');
    res.status(400).send('Failed saving product.');
  }
};

/** **********************GET ALL PRODUCTS HANDLER*********************** */
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

/** **********************GET SINGLE PRODUCT HANDLER*********************** */
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

/** **********************UPDATE PRODUCT HANDLER*********************** */
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

/** **********************DELETE PRODUCT HANDLER*********************** */
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
