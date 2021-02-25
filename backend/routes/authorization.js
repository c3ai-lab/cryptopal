const express = require('express');

const router = express.Router();

router.post('/testRouting', (req, res) => {
  console.log(req.body);
  res.send('Routing works');
});

module.exports = router;
