const express = require('express');

const app = express();

// define routes for different modules
app.use('/auth', require('./routes/authentication'));

app.use('/identity', require('./routes/identity'));

module.exports = app;
