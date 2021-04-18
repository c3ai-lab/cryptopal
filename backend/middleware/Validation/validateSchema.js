// validate given schema as a middleware. Returns found errror or call next
exports.validateSchema = (req, res, next, schema) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
