//express
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();
const db = require('./config/db');

//Middlewares =====================
if(process.env.NODE_ENV === 'development'){
  app.use( morgan('dev'));
}
// req/res cycle
app.use(express.json());
// static Files
app.use(express.static(`${__dirname}/public`))
//            ============
db();
// Node Environmnet Vars
// console.log(process.env.NODE_ENV);
dotenv.config({ path: './config.env'});

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