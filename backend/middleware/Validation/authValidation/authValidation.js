/*
 * Validation of send authentification data to reject
 * requests with wrong formated data
 */
const Joi = require('@hapi/joi');
const { validateSchema } = require('../validateSchema');

// set up joi validation of registration data
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

// set up joi validation of login data
exports.loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  validateSchema(req, res, next, schema);
};

// set up joi validation of login data
exports.changePasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    old_password: Joi.string().min(6).required(),
    new_password: Joi.string().min(6).required(),
  });

  validateSchema(req, res, next, schema);
};

// set up joi validation of login data
exports.recoverPasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    family_name: Joi.string().required(),
  });

  validateSchema(req, res, next, schema);
};
