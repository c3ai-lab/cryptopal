const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
  },
  description: {
    type: String,
    max: 1024,
  },
  type: {
    type: String,
    required: true,
    max: 255,
  },
  category: {
    type: String,
    max: 255,
  },
  img_url: {
    type: String,
    max: 255,
  },
  home_url: {
    type: String,
    max: 255,
  },
  create_time: {
    type: String,
    max: 255,
  },
  update_time: {
    type: String,
    max: 255,
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
