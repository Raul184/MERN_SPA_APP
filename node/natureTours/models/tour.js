const mongoose = require('mongoose');


const tour = new mongoose.Schema({
  name: {
    type: String ,
    required: [ true , `Please , don't forget to name the tour`] ,
    unique: true
  },
  rating: {
    type: Number ,
    default: 4.5
  },
  price: {
    type: Number ,
    required: [ true , `Please don't forget to price the your`]
  }
});


const TourModel = mongoose.model( 'Tour' , tour );

module.exports = TourModel;