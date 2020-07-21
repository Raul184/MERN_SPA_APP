const express = require('express');
const {
  getTourStats,
  aliasTopTours,
  getAllTours,
  getTour,
  getMyTours,
  updateTour,
  createTour,
  deleteTour,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
  uploadTourPics,
  resizeTourPics
} = require('./../controllers/tourController');
const { restrictTo, protect} = require('./../controllers/authController');
const { createBookingCheckout } = require('../controllers/stripeController');
const reviewRouter = require('./../routes/reviewRoutes');
const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

// STATS
router.get('/top-5-cheap', aliasTopTours, getAllTours);
router.get('/tour-stats', getTourStats);
router.get('/monthly-plan/:year',protect,restrictTo('admin', 'lead-guide'),getMonthlyPlan);

router.get('/tours-within/:distance/center/:latlng/unit/:unit', getToursWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi
router.get('/distances/:latlng/unit/:unit', getDistances);

// TOURS
router.get('/', createBookingCheckout, getAllTours);
router.get('/:id', getTour);
// USER
router.use(protect);
router.get('/my-tours', getMyTours )
// ADMINS
router.use(restrictTo('admin', 'lead-guide'));
router.post('/', createTour);
router.patch('/:id', uploadTourPics, resizeTourPics, updateTour);
router.delete('/:id', deleteTour);


module.exports = router;
