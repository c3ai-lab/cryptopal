/**
 * Middleware to validate the request body object with a given
 * Joi validation schema. Procceeds on success and sends validation error
 * with information about the fiel, if it occurs.
 * @param  {Object} req The request object
 * @param  {Object} res The response object
 * @param  {Function} next The function to proceed
 * @param  {Object} schema The join schema to validate req body object with
 */
exports.validateSchema = (req, res, next, schema) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
