const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();

// add middleware
app.use(bodyParser.json());
app.use(cors());

// use router
app.use('/api', require('./router'));

// connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  () => {
    console.log('connected to db');
  }
);

// start server
const port = 4000;
app.listen(port, () => console.log(`Server is running on Port ${port}`));
