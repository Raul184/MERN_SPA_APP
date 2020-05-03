//Router
const express = require('express');
// Controllers
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router= express.Router({ mergeParams: true });

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
router.post( '/' , protect , restrictTo('user') , createReview )


module.exports = router;