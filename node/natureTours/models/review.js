const mongoose = require('mongoose');
const TourModel = require('./tour');


const review = new mongoose.Schema({
  review: {
    type: String ,
    required: [ true , 'Please leave an honest review']
  },
  rating: {
    type: Number ,
    min: 1 ,
    max: 5
  },
  createdAt: {
    type: Date ,
    default: Date.now()
  },
  // Referenced *1
  userWhoReviewed: [
    {
      type: mongoose.Schema.ObjectId ,
      ref: 'User' ,
      required: [ true , 'Who is reviewing?']
    }
  ],
  // Referenced *1
  tourReviewed: {
    type: mongoose.Schema.ObjectId ,
    ref: 'Tours' ,
    required: [ true , 'Please select a tour this review belongs to']
  }
},
  { // Virtual properties => Show Up if there's an Output
    toJSON: { virtuals: true } ,
    toObject: { virtuals: true }
  }
)

// Mongoose QUERY Obj Middlewares ================
// Step *2
review.pre( /^find/ , function(next){
  this.populate({
    path: 'userWhoReviewed',
    select: 'name'
  })
  next();
})

// Avoid duplicate reviews from same user
review.index({ tour: 1 , user: 1} , { unique: true });


// MONGOOSE STATIC f() ________________________
// Calculating Avg for Ratings & Total n Ratings when +
// static method => this => points to the model
review.statics.calcAvgRatings = async function(tourId){
  const stats = await this.aggregate([
    // stage 1
    {
      $match: { tourReviewed: tourId } 
    } ,
    {
      $group: {
        _id: '$tourReviewed' ,
        nRatings: { $sum: 1 } ,
        avgRating: { $avg: '$rating' } 
      }
    }
  ]);
  
  stats.length > 0 ? await TourModel.findByIdAndUpdate( 
    tourId , {
    ratingsQuantity: stats[0].nRatings ,
    ratingsAverage: stats[0].avgRating 
    }) 
    : 
    await TourModel.findByIdAndUpdate( 
    tourId , {
    ratingsQuantity: 0 ,
    ratingsAverage: 4.5 
    })
}

review.post( 'save' , function(){
  // points to revie Before get saved
  this.constructor.calcAvgRatings( this.tourReviewed );
})


// Calculating Avg for Ratings when Deleting || Updating 
// 1
review.pre( /^findOneAnd/ , async function( next ){
  this.r = await this.findOne()
  next();
})
// Calculating Avg for Ratings when Deleting || Updating
// 2
review.post( /^findOneAnd/ , async function(){
  await this.r.constructor.calcAvgRatings(this.r.tourReviewed)
})
 

const Reviews = mongoose.model( 'Reviews' , review )
module.exports = Reviews;