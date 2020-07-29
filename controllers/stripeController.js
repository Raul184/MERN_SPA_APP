const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
// const User = require('../models/userModel');
const BookingModel = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
// const factory = require('./handlerFactory');
// const AppError = require('../utils/appError')

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findOne({slug: req.params.tourID});

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: req.user.email,
    client_reference_id: req.params.tourID,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [
          `${req.protocol}://${req.get('host')}../src/assets/imgs/tours/${tour.imageCover}`
        ],
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1
      }
    ],
    mode:'payment',
    success_url: `${req.protocol}://localhost:3000/`,
    cancel_url: `${req.protocol}://localhost:3000/tour/${tour.slug}`
  });

  // 3) Create session as response
  return res.status(200).json({
    status: 'success',
    session
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  //temporary 
  const {tour,price,user} = req.query
  if(!tour && !user && !price) return next();

  // await Booking.create({tour,user,price})

  next();
  res.redirect(`${req.protocol}://${req.get('host')}/`)
})



exports.getMyTours = catchAsync(async (req,res,next) => {
  const bookings = await BookingModel.find({ user: req.user.id })
  const toursId = bookings.map(el => el.tour._id) 
  const tours = await Tour.find({ _id: { $in: toursId }})
  return res.status(200).json({
    status:'success',
    tours
  })
})