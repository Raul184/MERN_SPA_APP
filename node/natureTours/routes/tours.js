//Router
const express = require('express');
const router= express.Router();
//controllers
const tourController = require('../controllers/tourController');
const { 
  getATour , 
  getAllTours , 
  updateTour , 
  deleteTour , 
  addTour , checkID , checkBody } = tourController;

//Middleware
router.param('id' , checkID);


router.get( '/' , getAllTours )
router.get( '/:id' , getATour );
router.post( '/:tour' , checkBody , addTour);
router.put( '/:id' , updateTour )
router.delete( '/:id' , deleteTour )
  
  

module.exports = router;


