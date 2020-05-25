const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String ,
    required: [ true , 'Please provide a name' ] ,
    unique: true ,
    trim: true
  } ,
  duration: {
    type: Number ,
    required: [ true , 'How long does it take?' ]
  },
  maxGroupSize: {
    type: Number ,
    required: [ true , 'Please provide number of people' ]
  },
  difficulty: {
    type: String ,
    required: [ true , 'Please provide level of difficulty for our customers' ]
  },
  ratingsAverage: {
    type: Number ,
    default: 4.5 ,
  },
  ratingsQuantity: {
    type: Number ,
    default: 0
  },
  price: {
    type: Number ,
    required: [ true , 'Please provide a price' ]
  },
  priceDiscount: Number ,
  summary: {
    type: String ,
    trim: true
  },
  description: {
    type: String ,
    trim: true
  },
  imageCover: {
    type: String ,
    required: [ true , 'Please provide an image for the tour']
  },
  images: [ String ] ,
  createdAt: {
    type: Date ,
    default: Date.now() ,
    select: false
  },
  startDates: [ Date ],

}, // Schema Options => Virtual Prop.
{
  toJSON: { virtuals: true } ,
  toObject: { virtuals: true }
}
)
// Virtual Property 
tourSchema.virtual( 'durationWeeks' ).get( function() {
  return this.duration / 7
})



// PARAMS. Middleware
// router.param('id' , ( req , res , next , paramVal ) => {
//   console.log(`Tour id is: ${paramVal}`);
//   next();
// })



const TourModel = mongoose.model('Tour' , tourSchema );
module.exports = TourModel;