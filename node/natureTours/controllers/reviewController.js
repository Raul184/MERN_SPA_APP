const Reviews = require('../models/review');
const factory = require('./factory');


exports.getAllReviews = async ( req , res ) => {

  // if a tour Id is provided ==> bring back review for that tour
  let filter = {}
  if(req.params.tourId) filter = { tour: req.params.tourId }

  try {
    // If tour Id is not provided => Bring all reviews
    const allReviews = await Reviews.find(filter)

    if(allReviews.length === 0 ) {
      return res.status(404).json({
        msg: `There are not reviews at this moment , come back later`
      })
    }  

    return res.status(200).json({
      status: 'success' ,
      data: allReviews
    })
  } 
  catch (error) {
    return res.status(500).json({ msg: error.message })
  }  
} 

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

// U
exports.updateReview = factory.updateOne(Reviews)
// D
exports.deleteReview = factory.deleteOne(Reviews)


 