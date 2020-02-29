//express
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
// To work With Node Environmnet Vars => process.env.NODE_ENV
dotenv.config({ path: './config.env'});
const app = express();
//Global Error Handler middleware
const globalErrors = require('./GlobalErrorHandler/ErrorHandler');

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
app.all(
  '*' , 
  (req , res , next) => res.status(404).json({ msg: 'Undefined url bro' })
)

// Global Errors Handler Middleware
app.use( globalErrors )


app.listen(PORT , () => console.log(`Server running at port: ${PORT}`))