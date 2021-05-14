//const fs = require('fs');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require(`./routes/tourRoutes`);
const userRouter = require(`./routes/userRoutes`);

const app = express(); //handles routing

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
app.get('/test', function(req, res) {
  res.sendfile(`${__dirname}/public/overview.html`);
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use(express.static(`${__dirname}/public`));

module.exports = app;
