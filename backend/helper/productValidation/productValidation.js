/*
 * Validation of send authentification data to reject
 * requests with wrong formated data
 */
const Joi = require('@hapi/joi');

// set up joi validation of registration data
exports.addProductValidation = (data) => {
  const link = Joi.object().keys({
    href: Joi.string().required(),
    method: Joi.string().required(),
  });

  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().max(1024),
    type: Joi.string().required(),
    category: Joi.string(),
    img_url: Joi.string().max(255),
    home_url: Joi.string().max(255),
    links: Joi.array().items(link),
  });

  return schema.validate(data);
};
