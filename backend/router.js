const express = require('express');

const app = express();

// define routes for different modules
app.use('/auth', require('./routes/authentication'));

module.exports = app;
