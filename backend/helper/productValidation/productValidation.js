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
    description: Joi.string().max(1024).allow('', null),
    type: Joi.string().required(),
    category: Joi.string().allow('', null),
    img_url: Joi.string().min(6).required(),
    home_url: Joi.string().min(6).required().email(),
    create_time: Joi.string().required(),
    update_time: Joi.string().required(),
    links: Joi.array().items(link),
  });

  return schema.validate(data);
};
