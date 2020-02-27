const mongoose = require('mongoose');
const slugify = require('slugify');

const tour = new mongoose.Schema({
  name: {
    type: String ,
    trim: true ,
    required: [ true , `Please , don't forget to name the tour`] ,
    unique: true
  },
  slug: String ,
  duration: {
    type: Number ,
    required: [true , `Please don't forget to state how long it takes`] 
  },
  maxGroupSize: {
    type: Number ,
    required: [ true , `Max number of travellers`]
  },
  difficulty: {
    type: String ,
    required: [ true , `Physical conditions demanded for this tour`]
  },
  ratingsAverage: {
    type: Number ,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number ,
    default: 0
  },
  price: {
    type: Number ,
    required: [ true , `Please don't forget to price the your`]
  },
  priceDiscount: Number ,
  summary: {
    type: String ,
    trim: true ,
    required: [ true , `A tour must have a brief description` ]
  },
  description: {
    type: String ,
    trim: true
  },
  imageCover: {
    type: String ,
    required: [ true, ` Image required for every tour`]
  },
  images: [ String ] ,
  createdAt: {
    type: Date ,
    default: Date.now() ,
    select: false
  },
  startDates: [ Date ] ,
  secretTours: {
    type: Boolean ,
    default: false
  }
},
 {
  toJSON: { virtuals: true } ,
  toObject: { virtuals: true }
 }
);

// Virtual Field
tour.virtual('durationWeeks').get(
  function(){
    return this.duration/7
  }
)

// Mongoose DOCUMENT Midleware 
//        runs ==> .save() .create()
tour.pre( 'save' , function( next ){
  this.slug = slugify(this.name , { lower: true });
  next();
})

// Mongoose QUERY Middleware
tour.pre( /^find/ , function(next){
  this.find({ secretTours: { $ne: true } });
  //Execution time
  this.start = Date.now();
  next();
})

tour.post( /^find/ , function(docs , next){
  console.log(`Query took ${Date.now() - this.start} miliseconds`);
  // console.log(docs);
  next();
})
const TourModel = mongoose.model( 'tours' , tour );

module.exports = TourModel;