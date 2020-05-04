//Router
const express = require('express');
const router= express.Router();
//controllers
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
// Routes
const reviewRouter = require('./../routes/reviewRoutes');

const { 
  getATour , 
  getTop ,
  getAllTours , 
  updateTour , 
  deleteTour , 
  addTour ,
  getTourStats ,
  getMonthlyPlan
} = tourController;
const { protect , restrictTo } = authController;


// Nested Route for reviews
// router.post('/:tourId/reviews' , protect , restrictTo('user') , createReview )
router.use('/:tourId/reviews' , reviewRouter )


// @Description     Get all tours
// @Access          Access to everyone in the world
router.get( '/' , getAllTours )


// @Description     GET + demanded Tours
// @Access          Public
router.get( '/top-5-cheap' , getTop , getAllTours )


// @Description     GET Stats 
// @Access          Public
router.get('/tourStats' , getTourStats )


// @Description     GET Montlhy Stats on tours 
// @Access
router.get(
  '/monthlyPlan/:year' , 
  protect , 
  restrictTo('adming' , 'lead-guide' , 'guide') , 
  getMonthlyPlan 
)


// @Description     Get 1 tour
// @Access          Public
router.get( '/:id' , getATour );
 

// @Description     Add a new tour
// @Access          Private
router.post( '/' , protect , restrictTo('admin' , 'lead-guide') , addTour);
 

// @Description     Update a tour
// @Access          Private
router.put( '/:id' , protect , restrictTo('admin' , 'lead-guide') , updateTour )


// @Description     DELETE a  tour
// @Access          Private
router.delete( '/:id' , protect , restrictTo('admin' , 'lead-guide') , deleteTour )



module.exports = router;


