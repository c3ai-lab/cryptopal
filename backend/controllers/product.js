const {
  addProductValidation,
  getProductsValidation,
} = require('../helper/productValidation/productValidation');
const User = require('../models/User');
const Product = require('../models/Product');

/** **********************ADD PRODUCT HANDLER*********************** */
exports.addProduct = async (req, res) => {
  // check for valid authorization token
  const user = await User.findOne({ _id: req.token._id });
  if (!user) return res.status(400).send('Invalid authorization token');

  // check if sender is merchant
  if (!user.merchant_id) {
    return res.status(400).send('No Merchant. Upgrade to merchant first');
  }

  // validate received data before creating a product
  const { error } = addProductValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // create new product with received data
  const product = new Product({
    merchant_id: user.merchant_id,
    ...req.body,
  });

  // save new product in database
  try {
    await product.save();
    res.status(200).send('Product added.');
  } catch (err) {
    res.status(400).send('Failed saving product.');
  }
};

/** **********************GET PRODUCTS HANDLER*********************** */
exports.getProducts = async (req, res) => {
  // validate received data before creating a product
  const { error } = getProductsValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // get all products of one merchant from database
  try {
    const products = await Product.find({ merchant_id: req.body.merchant_id });
    res.status(200).send(products);
  } catch (err) {
    res.status(400).send('Failed fetching products.');
  }
};
