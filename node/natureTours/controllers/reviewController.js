const Reviews = require('../models/review');



exports.getAllReviews = async ( req , res ) => {
  try {
    const allReviews = await Reviews.find()

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


exports.createReview = async ( req , res ) => {
  try {
    const reviewSaved = await Reviews.create({
      review: req.body.review ,
      rating: req.body.rating ,
      userWhoReviewed: req.body.userWhoReviewed ,
      tourReviewed: req.body.tourReviewed
    })

    return res.status(200).json({
      status: 'success' ,
      data: reviewSaved
    })
  } 
  catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}






