// ================================================================================================
//  File Name: authValidation.js
//  Description:
//  This file holds functions for verifing request data with joi validation schemas. It creates
//  joi validation schema objects and calls the validateSchema function to validate request data.
//  This functions are used as a middleware on authentication routes.
// ================================================================================================
const Joi = require('@hapi/joi');
const { validateSchema } = require('../validateSchema');

/**
 * Set up joi validation schema for registration data and call validate function.
 * @param  {Object} req The request object
 * @param  {Object} res The response object
 * @param  {Function} next The function to proceed
 */
exports.registerValidation = (req, res, next) => {
  const address = Joi.object({
    street_address: Joi.string().required(),
    locality: Joi.string().required(),
    region: Joi.string().allow('', null),
    postal_code: Joi.string(),
    country: Joi.string().required(),
  });

  const schema = Joi.object({
    given_name: Joi.string().required(),
    family_name: Joi.string().required(),
    company: Joi.string().allow('', null),
    website: Joi.string().allow('', null),
    password: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    phone: Joi.string().allow('', null),
    address,
  });

  validateSchema(req, res, next, schema);
};

/**
 * Set up joi validation schema for login data and call validate function.
 * @param  {Object} req The request object
 * @param  {Object} res The response object
 * @param  {Function} next The function to proceed
 */
exports.loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  validateSchema(req, res, next, schema);
};

/**
 * Set up joi validation schema for change password data and call validate function.
 * @param  {Object} req The request object
 * @param  {Object} res The response object
 * @param  {Function} next The function to proceed
 */
exports.changePasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    old_password: Joi.string().min(6).required(),
    new_password: Joi.string().min(6).required(),
  });

  validateSchema(req, res, next, schema);
};

/**
 * Set up joi validation schema for recover password data and call validate function.
 * @param  {Object} req The request object
 * @param  {Object} res The response object
 * @param  {Function} next The function to proceed
 */
exports.recoverPasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    family_name: Joi.string().required(),
  });

  validateSchema(req, res, next, schema);
};
