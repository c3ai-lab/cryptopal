const jwt = require('jsonwebtoken');

// middleware to verify the users token
module.exports = (req, res, next) => {
  const token = req.header('cp-auth-token');
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET_AUTH);
    req.token = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};
