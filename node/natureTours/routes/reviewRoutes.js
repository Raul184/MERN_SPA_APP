//Router
const express = require('express');
const router= express.Router();
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const {
  createReview ,
  getAllReviews
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
router.post( '/createReview' , protect , restrictTo('user') , createReview )


module.exports = router;