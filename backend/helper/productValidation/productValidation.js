/*
 * Validation of send authentification data to reject
 * requests with wrong formated data
 */
const Joi = require('@hapi/joi');

// set up joi validation for add product data
exports.addProductValidation = (data) => {
  const link = Joi.object().keys({
    href: Joi.string().required(),
    method: Joi.string().required(),
  });

  const schema = Joi.object({
    id: Joi.string().min(6).max(50),
    name: Joi.string().required().min(1).max(127),
    description: Joi.string().min(1).max(256),
    type: Joi.string().required().min(1).max(24),
    category: Joi.string().min(4).max(256),
    img_url: Joi.string().min(1).max(2000),
    home_url: Joi.string().min(1).max(2000),
    links: Joi.array().items(link),
  });

  return schema.validate(data);
};

// setup joi validation for get all products data
exports.getProductsValidation = (data) => {
  const schema = Joi.object({
    merchant_id: Joi.string().required(),
  });
  return schema.validate(data);
};
