//Router
const express = require('express');
const router= express.Router();
//controllers
const stripeControllers = require('../controllers/stripe');

const {
  payStripe
} = stripeControllers;


// Payments through Stripe
router.post('/' , payStripe );


module.exports = router;