//express
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
// Security 
const rateLimit = require('express-rate-limit');
const helmet= require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss= require('xss-clean');
const hpp = require('hpp');


// To work With Node Environmnet Vars => process.env.NODE_ENV
dotenv.config({ path: './config.env'});
const app = express();
const AppError = require('./utils/ErrorHandler');
const globalErrorHandler = require('./controllers/errorController');

// GLOBAL Middlewares =====================

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
  message: 'Too many requests from this Ip, please try again after'
})
app.use( '/api' , limiter ) 

// 3 req/res => {}
app.use(express.json({ limit: '10kb' }));

// 4 Data Sanitazitation vs NOSQL query injections
app.use(mongoSanitize());

// 5 Data Sanitazitation vs XSS (Cross-site scripting attack)
app.use(xss());

// 6 Parameter Pollutions
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


// DB  ==========================================
mongoose.connect( process.env.MONGO_URI , {
  useNewUrlParser: true ,
  useUnifiedTopology: true ,
  useCreateIndex: true ,
  useFindAndModify: false
}).then(
  () => console.log('DB plugged')
)

// PORT
const PORT = process.env.PORT || 5000; 

// root
app.get('/' , (req , res) => {
  res.status(200)
     .send({
       msg: 'Server running..'
     })
});


// ROUTES  ==========================================
app.use('/api/v1/tours' , require('./routes/tourRoutes.js'));
app.use('/api/v1/users' , require('./routes/userRoutes.js'));
app.use('/api/v1/reviews' , require('./routes/reviewRoutes.js'));

// Invalid 
app.all( '*' , (req , res , next) => {
    next( new AppError(`Can't find ${req.originalUrl} here!` , 404));
  } 
)


// Global Errors Handler Middleware
app.use( globalErrorHandler )

app.listen(PORT , () => console.log(`Server running at port: ${PORT}`))