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
    id: Joi.string().min(6).max(50).allow('', null),
    name: Joi.string().required().min(1).max(127),
    description: Joi.string().min(1).max(256).allow('', null),
    type: Joi.string().required().min(1).max(24),
    category: Joi.string().min(4).max(256).allow('', null),
    img_url: Joi.string().min(1).max(2000).allow('', null),
    home_url: Joi.string().min(1).max(2000).allow('', null),
    links: Joi.array().items(link),
  });

  return schema.validate(data);
};

// setup joi validation for get all products data
exports.getProductsValidation = (data) => {
  const schema = Joi.object({
    page_size: Joi.number().integer().min(1).max(20),
    page: Joi.number().integer().min(1).max(1000),
    total_required: Joi.bool(),
  });
  return schema.validate(data);
};
// setup joi validation for updating a product data
exports.updateProductsValidation = (data) => {
  const schema = Joi.object({
    description: Joi.string().min(1).max(256).allow('', null),
    category: Joi.string().min(4).max(256).allow('', null),
    img_url: Joi.string().min(1).max(2000).allow('', null),
    home_url: Joi.string().min(1).max(2000).allow('', null),
  });
  return schema.validate(data);
};
