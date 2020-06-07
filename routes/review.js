const express = require('express');
const router = express.Router();
const { 
  getAllReviews , 
  createReview
} = require('../controllers/reviewsController');

// GET all tours
router.get('/', getAllReviews );

router.post('/addReview', createReview )



module.exports = router;