//Router
const express = require('express');
// Controllers
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router= express.Router({ mergeParams: true });

const {
  createReview ,
  getAllReviews ,
  getAReview ,
  updateReview ,
  deleteReview
} = reviewController;
const {
  protect ,
  restrictTo
} = authController;

router.use( protect );


// @Description     Get all reviews
// @Access          Public
router.get( '/' , getAllReviews )

// @Description     Get a review
// @Access          Public
router.get( '/:id' , getAReview )

// @Description     Create 1 review
// @Access          Private
router.post( '/' , restrictTo('user') , createReview )


// @Description     Delete 1 review
// @Access          Private
router.delete( '/:id' , deleteReview )


// @Description     Update 1 review
// @Access          Private
router.patch( '/:id' , restrictTo( 'user' , 'admin' ) , updateReview )



module.exports = router;