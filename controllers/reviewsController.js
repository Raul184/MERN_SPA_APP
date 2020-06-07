const ReviewModel = require('../models/reviews');

exports.getAllReviews = async (req , res, next) => {
  try {
    const reviews = await ReviewModel.find()

    return res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: {
        reviews
      }
    })  
  } 
  catch (error) {
    return res.status(500).json({
      status: 'failed',
      message: error.message
    })
  }
}


exports.createReview = async (req , res, next) => {
  try {
    const newReview = await ReviewModel.create(req.body)

    return res.status(201).json({
      status: 'success',
      data: {
        review: newReview
      }
    })  
  } 
  catch (error) {
    return res.status(500).json({
      status: 'failed',
      message: error.message
    })
  }
}