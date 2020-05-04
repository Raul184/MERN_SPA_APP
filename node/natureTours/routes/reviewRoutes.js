//Router
const express = require('express');
// Controllers
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router= express.Router({ mergeParams: true });

const {
  createReview ,
  getAllReviews ,
  updateReview ,
  deleteReview
} = reviewController;
const {
  protect ,
  restrictTo
} = authController;


// @Description     Get all reviews
// @Access          Public
router.get( '/' , getAllReviews )


// @Description     Create 1 review
// @Access          Private
router.post( '/' , protect , restrictTo('user') , createReview )


// @Description     Delete 1 review
// @Access          Private
router.delete( '/:id' , protect , deleteReview )


// @Description     Update 1 review
// @Access          Private
router.patch( '/:id' , protect , updateReview )



module.exports = router;