//express
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
// To work With Node Environmnet Vars => process.env.NODE_ENV
dotenv.config({ path: './config.env'});
const app = express();
const AppError = require('./utils/ErrorHandler');
const globalErrorHandler = require('./controllers/errorController');

//Middlewares =====================
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}


// req/res cycle
app.use(express.json());
// // static Files
// app.use(express.static(`${__dirname}/public`))


// DB
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


//homepage
app.get('/' , (req , res) => {
  res.status(200)
     .send({
       msg: 'Server running..'
     })
});
// ROUTES
app.use('/api/v1/tours' , require('./routes/tourRoutes.js'));
app.use('/api/v1/users' , require('./routes/userRoutes.js'))
// Invalid Routes
app.all( '*' , (req , res , next) => {
    next( new AppError(`Can't find ${req.originalUrl} here!` , 404));
  } 
)

// Global Errors Handler Middleware
app.use( globalErrorHandler )

app.listen(PORT , () => console.log(`Server running at port: ${PORT}`))