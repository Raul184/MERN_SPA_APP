const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const enforce = require('express-sslify');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/stripe.js');
// Start express app
const app = express();

app.enable('trust proxy');
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());
app.options('*', cors());
// Set security HTTP headers
app.use(helmet());
// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
// Req => access as a json file
// app.use( bodyParser.json() );
app.use(express.json({ limit: '10kb' }));
// urls strings properly formatted
app.use( bodyParser.urlencoded({ extended: true }) )
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
// Data sanitization 
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());
// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);
// On Hk Server
if( process.env.NODE_ENV === 'production'){
  app.use( compression() );
  app.use( enforce.HTTPS({ trustProtoHeader: true }));
  app.use( express.static(path.join(__dirname , 'client/build')));
  app.get( '*' , function(req , res ){
    res.sendFile( path.join( __dirname , 'client/build'))
  })
}
// PWA
app.get( 
  './client/src/serviceWorker.js' , 
  ( req , res ) => {
    res.sendFile( 
      path.resolve( __dirname , 'client' , 'build' , 'service-worker.js' )
    )
  }
)

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
