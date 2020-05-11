//express
const path = require( 'path' );
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});
// Security 
const rateLimit = require('express-rate-limit');
const helmet= require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss= require('xss-clean');
const hpp = require('hpp');
// Routers
const tourRouter = require('./routes/tourRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const reviewRouter = require('./routes/reviewRoutes.js');
// Errors 
const AppError = require('./utils/ErrorHandler');
const globalErrorHandler = require('./controllers/errorController');
// Server
const app = express();
app.set( 'view engine' , 'pug');
app.set( 'views' , path.join( __dirname , 'views'))


const PORT = process.env.PORT || 5000; 
// 
// GLOBAL Middlewares  
//==========================================
app.use( express.static(path.join( __dirname , 'public') ))
// 4 
app.use(helmet())

// 1 
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}
// 2 Rate limiting 
const limiter = rateLimit({
  max: 100 ,
  windowMs: 60 * 60 * 1000 ,
  message: 'Too many requests incoming, please try again after'
})
app.use( '/api' , limiter ) 

// 3 req/res => {} data limit
app.use(express.json({ limit: '10kb' }));

// 5 Data Sanitazitation vs NOSQL query injections
app.use(mongoSanitize());

// 6 Data Sanitazitation vs XSS (Cross-site scripting attack)
app.use(xss());

// 7 Parameter Pollutions
app.use(hpp({ 
  whitelist: [
    'duration',
    'ratingsQuantity' ,
    'ratingsAverage' ,
    'maxGroupSize' ,
    'difficulty' ,
    'price'
  ]
}));


// 
//DB Connection  
//==========================================
mongoose.connect( process.env.MONGO_URI , {
  useNewUrlParser: true ,
  useUnifiedTopology: true ,
  useCreateIndex: true ,
  useFindAndModify: false
}).then(
  () => console.log('DB plugged')
)

// 
//ROUTES  
//==========================================
app.get('/' , (req , res) => {
  res.status(200).render('base')
});

app.use('/api/v1/tours' , tourRouter );
app.use('/api/v1/users' , userRouter );
app.use('/api/v1/reviews' , reviewRouter );
// Invalid Routes => Response
app.all( '*' , (req , res , next) => {
    next( new AppError(`Can't find ${req.originalUrl} here!` , 404));
  } 
)

// 
// Global Errors Handler Middleware
//==========================================
app.use( globalErrorHandler )






// init
app.listen(PORT , () => console.log(`Server running at port: ${PORT}`)) 