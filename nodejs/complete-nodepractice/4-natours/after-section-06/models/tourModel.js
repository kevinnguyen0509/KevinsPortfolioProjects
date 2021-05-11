const mongoose = require('mongoose');

/*
 Creating a Schema/outline of inserting a tour
*/
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A tour must have a name'],
    unique: true
  },
  duration: {
    type: Number,
    require: [true, 'A Tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    require: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A Tour requires a difficulty']
  },
  ratingAverage: {
    type: Number,
    default: 4.5
  },

  ratingQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    require: [true, 'A tour must have a price']
  },
  priceDiscount: {
    type: Number,
    summary: {
      type: String,
      trim: true
    }
  },

  description: {
    type: String,
    trim: true,
    require: [true, 'A Tour must have a description']
  },
  imageCover: {
    type: String,
    require: [true, 'A tour must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
