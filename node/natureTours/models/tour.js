const mongoose = require('mongoose');
const slugify = require('slugify');
// PLUS validations dope for Mongoose
const validator = require('validator');
// User
const User = require('./user')

const tour = new mongoose.Schema({
  name: {
    type: String ,
    required: [ true , `Please , don't forget to name the tour`] ,
    unique: true ,
    trim: true ,
    maxlength: [ 40 , `The name can't contain + 40 characters`] ,
    minlength: [ 10 , `The name can't contain + 10 characters`] ,
    // validate: [ validator.isAlpha , 'Please use just characters']
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
    required: [ true , `Physical conditions demanded for this tour`] ,
    enum: {
      values: [ 'easy' , 'medium' , 'difficult'] ,
      message: 'Please name a valid value: easy / medium / difficult'
    }
  },
  ratingsAverage: {
    type: Number ,
    default: 4.5 ,
    min: [ 1 , 'Please rate above 1'] ,
    max: [ 5 , 'Please the best score is 5']
  },
  ratingsQuantity: {
    type: Number ,
    default: 0
  },
  price: {
    type: Number ,
    required: [ true , `Please don't forget to price the your`]
  },
  priceDiscount: {
    type: Number ,
    // Custom 
    validate: {
      validator: function( val ){
        return val < this.price  // 100 < 200
      },
      message: 'Discount price error , please check amount ({VALUE})' 
    }
  } ,
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
  },
  // Locations from Tours to be included in the Tours model
  // Embbedded || Denormalized ==> Data Modelling
  //GeoSpaceData on MongoDB
  startLocation: {
    type: {
      type: String ,
      default: 'Point' ,
      enum: ['Point']
    } ,
    // Longitude - Latitude
    coordinates: [Number] ,
    address: String ,
    description: String
  },
  locations: [
    {
      type: {
        type: String ,
        default: 'Point' ,
        enum: ['Point']
      },
      coordinates: [Number],
      address: String ,
      description: String,
      date: Number
    }
  ] ,
  guides: []
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

// Mongoose DOCUMENT Middleware 
//        runs ==> .save() .create()
tour.pre( 'save' , function( next ){
  this.slug = slugify(this.name , { lower: true });
  next();
})

// Attach guides to a tour when created
tour.pre( 'save' , async function(next) {
  const guidesPromises = this.guides.map( async id => await User.findById(id))
  this.guides = await Promise.all(guidesPromises)
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

// Mongoose AGREGATION Middleware
tour.pre( 'aggregate' , function( next ){
  this.pipeline().unshift({ $match: { secretTours: { $ne: true } } })
  next();
})

const TourModel = mongoose.model( 'tours' , tour );

module.exports = TourModel;