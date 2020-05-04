const Reviews = require('../models/review');
const factory = require('./factory');


exports.getAllReviews = factory.getAllOnes( Reviews );
  // ***End point created for this functionality
  // // if a tour Id is provided ==> bring back review for that tour
  // let filter = {}
  // if(req.params.tourId) filter = { tour: req.params.tourId }


// C
exports.createReview = async ( req , res ) => {
  try {
    // Pass in tour id 
    if(!req.body.tourReviewed) req.body.tourReviewed = req.params.tourId;
    if(!req.body.userWhoReviewed) req.body.userWhoReviewed = req.user._id;

    const reviewSaved = await Reviews.create(req.body);

    return res.status(200).json({
      status: 'success' ,
      data: reviewSaved
    })
  } 
  catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}
// R
exports.getAReview = factory.getOne(Reviews);
// U
exports.updateReview = factory.updateOne(Reviews);
// D
exports.deleteReview = factory.deleteOne(Reviews);


 