const mongoose = require('mongoose');
const slugify = require('slugify');
/*
 Creating a Schema/outline of inserting a tour
*/
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'A tour must have a name'],
      unique: true
    },
    slug: String,
    duration: {
      type: Number
      //require: [true, 'A Tour must have a duration']
    },
    maxGroupSize: {
      type: Number
      //require: [true, 'A tour must have a group size']
    },
    difficulty: {
      type: String
      //required: [true, 'A Tour requires a difficulty']
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
      type: Number
      //require: [true, 'A tour must have a price']
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
      trim: true
      //require: [true, 'A Tour must have a description']
    },
    imageCover: {
      type: String
      //require: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now()
    },
    startDates: [Date]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//Document Middelware: runs before the .save() command and .create()
tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// tourSchema.pre('save', function(next) {
//   //can act BEFORE POST commmand completes
//   //Install slugify
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
