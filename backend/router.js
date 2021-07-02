// ================================================================================================
//  File Name: router.js
//  Description:
//  This file holds the the main routes of the backend. All routes are categorized in seven
//  different modules. All these modules have their own child routes defined in /routes folder.
// ================================================================================================
const express = require('express');

const app = express();

app.use('/auth', require('./routes/authentication'));

app.use('/identity', require('./routes/identity'));

app.use('/products', require('./routes/product'));

app.use('/orders', require('./routes/order'));

app.use('/wallet', require('./routes/intern/wallet'));

app.use('/transaction', require('./routes/intern/transaction'));

app.use(
  '/payments/authorizations',
  require('./routes/payments/authorizations')
);

app.use('/payments/captures', require('./routes/payments/captures'));

app.use('/payments/refund', require('./routes/payments/refund'));

module.exports = app;
