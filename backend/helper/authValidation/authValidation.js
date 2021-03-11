/*
 * Validation of send authentification data to reject
 * requests with wrong formated data
 */
const Joi = require('@hapi/joi');

// set up joi validation of registration data
exports.registerValidation = (data) => {
  const schema = Joi.object({
    givenName: Joi.string().required(),
    familyName: Joi.string().required(),
    company: Joi.string().allow('', null),
    website: Joi.string().allow('', null),
    password: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    streetAddress: Joi.string().required(),
    locality: Joi.string().required(),
    region: Joi.string().allow('', null),
    postalCode: Joi.string(),
    country: Joi.string().required(),
    phone: Joi.string().allow('', null),
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
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
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
