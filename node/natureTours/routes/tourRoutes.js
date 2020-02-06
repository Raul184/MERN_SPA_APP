//Router
const express = require('express');
const router= express.Router();
//controllers
const tourController = require('../controllers/tourController');
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



// @Description     Get all tours
// @Access          Public
router.get( '/' , getAllTours )


// @Description     GET + demanded Tours
// @Access          Public
router.get( '/top-5-cheap' , getTop , getAllTours )


// @Description     GET Stats 
// @Access          Public
router.get('/tourStats' , getTourStats )


// @Description     GET Montlhy Stats on tours 
// @Access
router.get('/monthlyPlan/:year' , getMonthlyPlan )


// @Description     Get 1 tour
// @Access          Public
router.get( '/:id' , getATour );
 

// @Description     Add a new tour
// @Access          Private
router.post( '/:tour' , addTour);
 

// @Description     Update a tour
// @Access          Private
router.put( '/:id' , updateTour )


// @Description     DELETE a  tour
// @Access          Private
router.delete( '/:id' , deleteTour )



module.exports = router;


