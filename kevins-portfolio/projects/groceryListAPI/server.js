const mongoose = require('mongoose');
const app = require('./apps.js');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('db connection successful'));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port 3000 dude!');
});
