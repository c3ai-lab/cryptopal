/*
 * Validation of send authentification data before
 * interacting with database.
 */
const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  // set up joi validation of registration data
  const schema = Joi.object({
    givenName: Joi.string().required(),
    familyName: Joi.string().required(),
    company: Joi.string(),
    website: Joi.string(),
    password: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    streetAddress: Joi.string().required(),
    locality: Joi.string().required(),
    region: Joi.string().allow('', null),
    postalCode: Joi.string(),
    country: Joi.string().required(),
    phone: Joi.string(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  // set up joi validation of login data
  const schema = Joi.object({
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
