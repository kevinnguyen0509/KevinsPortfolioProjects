const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const groceryRoute = require('./routes/groceryRoute');
const app = express();

app.use(cors());

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/grocery', groceryRoute);

module.exports = app;
