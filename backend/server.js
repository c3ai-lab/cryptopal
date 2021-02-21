const express = require('express');
require('dotenv/config');

const app = express();

// start server
const port = 4000;
app.listen(port, () => console.log(`Server is running on Port ${port}`));
