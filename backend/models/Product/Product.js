const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    min: 6,
    max: 50,
  },
  merchant_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    min: 1,
    max: 127,
  },
  description: {
    type: String,
    min: 1,
    max: 256,
  },
  type: {
    type: String,
    required: true,
    min: 1,
    max: 24,
  },
  category: {
    type: String,
    min: 4,
    max: 256,
  },
  img_url: {
    type: String,
    min: 1,
    max: 2000,
  },
  home_url: {
    type: String,
    min: 1,
    max: 2000,
  },
  create_time: {
    type: String,
    min: 20,
    max: 64,
  },
  update_time: {
    type: String,
    min: 20,
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
