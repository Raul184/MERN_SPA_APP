//express
const express = require('express');
const morgan = require('morgan');
const app = express();

//Middlewares 
app.use( morgan('dev'));
// req/res cycle
app.use(express.json());


const PORT = process.env.PORT || 4000; 
//homepage
app.get('/' , (req , res) => {
  res.status(200)
     .send({
       msg: 'Server running..'
     })
});


// ROUTES
app.use('/api/v1/tours' , require('./routes/tours.js'));


app.listen(PORT , () => console.log('Server running..'))