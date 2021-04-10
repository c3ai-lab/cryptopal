/*
 * Validation of send authentification data to reject
 * requests with wrong formated data
 */
const Joi = require('@hapi/joi');

// set up joi validation of registration data
exports.registerValidation = (data) => {
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

  return schema.validate(data);
};

// set up joi validation of login data
exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

// set up joi validation of login data
exports.changePasswordValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    old_password: Joi.string().min(6).required(),
    new_password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

// set up joi validation of login data
exports.recoverPasswordValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    family_name: Joi.string().required(),
  });

  return schema.validate(data);
};
