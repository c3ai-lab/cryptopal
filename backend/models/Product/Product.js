// ================================================================================================
//  File Name: Product.js
//  Description:
//  This file holds a mongoose schema for the product object. This object represents a product
//  created by a merchant. Prducts will be saved this way in the database.
// ================================================================================================
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    minLength: 6,
    max: 50,
  },
  merchant_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 1,
    max: 127,
  },
  description: {
    type: String,
    minLength: 1,
    max: 256,
  },
  type: {
    type: String,
    required: true,
    minLength: 1,
    max: 24,
  },
  category: {
    type: String,
    minLength: 4,
    max: 256,
  },
  img_url: {
    type: String,
    minLength: 1,
    max: 2000,
  },
  home_url: {
    type: String,
    minLength: 1,
    max: 2000,
  },
  create_time: {
    type: String,
    minLength: 20,
    max: 64,
  },
  update_time: {
    type: String,
    minLength: 20,
    max: 64,
  },
  links: [
    {
      href: {
        type: String,
        required: true,
        max: 255,
      },
      method: {
        type: String,
        required: true,
        max: 255,
      },
    },
  ],
});

module.exports = mongoose.model('Product', productSchema);
