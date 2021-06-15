// ================================================================================================
//  File Name: productValidation.js
//  Description:
//  This file holds functions for verifing request data with joi validation schemas. It creates
//  joi validation schema objects and calls the validateSchema function to validate request data.
//  This functions are used as a middleware on product routes (only for merchants).
// ================================================================================================
const Joi = require('@hapi/joi');
const { validateSchema } = require('../validateSchema');

/**
 * Set up joi validation schema for add product data and call validate function.
 * @param  {Object} req The request object
 * @param  {Object} res The response object
 * @param  {Function} next The function to proceed
 */
exports.addProductValidation = (req, res, next) => {
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
  validateSchema(req, res, next, schema);
};

/**
 * Set up joi validation schema for get products data and call validate function.
 * @param  {Object} req The request object
 * @param  {Object} res The response object
 * @param  {Function} next The function to proceed
 */
exports.getProductsValidation = (req, res, next) => {
  const schema = Joi.object({
    page_size: Joi.number().integer().min(1).max(20),
    page: Joi.number().integer().min(1).max(1000),
    total_required: Joi.bool(),
  });
  validateSchema(req, res, next, schema);
};

/**
 * Set up joi validation schema for update product data and call validate function.
 * @param  {Object} req The request object
 * @param  {Object} res The response object
 * @param  {Function} next The function to proceed
 */
exports.updateProductValidation = (req, res, next) => {
  const schema = Joi.object({
    description: Joi.string().min(1).max(256).allow('', null),
    category: Joi.string().min(4).max(256).allow('', null),
    img_url: Joi.string().min(1).max(2000).allow('', null),
    home_url: Joi.string().min(1).max(2000).allow('', null),
  });
  validateSchema(req, res, next, schema);
};
