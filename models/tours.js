const mongoose = require('mongoose');
const slugify = require('slugify');


const tourSchema = new mongoose.Schema({
  name: {
    type: String ,
    required: [ true , 'Please provide a name' ] ,
    unique: true ,
    trim: true
  } ,
  slug: String ,
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
  startDates: [ Date ] ,
  secretTour: {
    type: Boolean ,
    default: false 
  }
}, 
{ // Schema Options => Virtual Prop
  toJSON: { virtuals: true } ,
  toObject: { virtuals: true }
}
)
// Virtual Property 
tourSchema.virtual( 'durationWeeks' ).get( function() {
  return this.duration / 7
})

// // DOCUMENT Middleware ( Before / After  => event )
tourSchema.pre( 'save' , function( next ) {
  this.slug = slugify( this.name , { lower: true })
  next();
})


// QUERY Middleware ( Before any Query  => executed )
tourSchema.pre( /^find/ , function(next){
  this.find({ secretTour: { $ne: true } })
  next()
})


const TourModel = mongoose.model('tours' , tourSchema );


module.exports = TourModel;