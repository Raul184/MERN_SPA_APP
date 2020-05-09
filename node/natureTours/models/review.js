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

// Mongoose Query Obj Middlewares ================
// Step *2
review.pre(/^find/ , function(next){
  this.populate({
    path: 'userWhoReviewed',
    select: 'name'
  })
  // .populate({ 
  //   path: 'tourReviewed' ,
  //   select: 'name photo'
  // })

  next();
})

// static method => For the model
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

  await TourModel.findByIdAndUpdate( tourId , {
    ratingsQuantity: stats[0].nRatings ,
    ratingsAverage: stats[0].avgRating 
  })
}

review.post( 'save' , function(){
  // points to revie Before get saved
  this.constructor.calcAvgRatings( this.tourReviewed );
})


const Reviews = mongoose.model( 'Reviews' , review )
module.exports = Reviews;