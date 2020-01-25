//express
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

//Middlewares =====================
if(process.env.NODE_ENV === 'development'){
  app.use( morgan('dev'));
}
// req/res cycle
app.use(express.json());
// static Files
app.use(express.static(`${__dirname}/public`))

// To work With Node Environmnet Vars => process.env.NODE_ENV
dotenv.config({ path: './config.env'});

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
app.use('/api/v1/tours' , require('./routes/tours.js'));
app.use('/api/v1/users' , require('./routes/users.js'))


app.listen(PORT , () => console.log(`Server running at port: ${PORT}`))