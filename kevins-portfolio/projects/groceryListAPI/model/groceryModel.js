const mongoose = require('mongoose');

const grocerySchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A Grocery Item must have a name.'],
    unique: true,
  },
  image: {
    type: String,
    require: [true, 'An image needs to be filled'],
  },
  isBought: {
    type: Boolean,
  },
});

const grocery = mongoose.model('Grocery', grocerySchema);

module.exports = grocery;
