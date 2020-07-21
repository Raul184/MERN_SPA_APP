const express = require('express');
const { getCheckoutSession, getMyTours } = require('../controllers/stripeController');
const { protect , restrictTo} = require('../controllers/authController');

const router = express.Router()

router.use(protect)
router.get('/checkout-session/:tourID', getCheckoutSession)

router.get('/my-bookings', getMyTours )

router.use(restrictTo('admin'))


module.exports = router;