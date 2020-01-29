const mongoose = require('mongoose');


const tour = new mongoose.Schema({
  name: {
    type: String ,
    trim: true ,
    required: [ true , `Please , don't forget to name the tour`] ,
    unique: true
  },
  durations: {
    type: Number ,
    required: [true , `Please don't forget to state how long it takes`] 
  },
  maxGroupSize: {
    type: Number ,
    required: [ true , `Max number of travellers`]
  },
  dificulty: {
    type: String ,
    required: [ true , `Physical conditions demanded for this tour`]
  },
  ratingsAverage: {
    type: Number ,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number ,
    default: 0
  },
  price: {
    type: Number ,
    required: [ true , `Please don't forget to price the your`]
  },
  priceDiscount: Number ,
  summary: {
    type: String ,
    trim: true ,
    required: [ true , `A tour must have a brief description` ]
  },
  description: {
    type: String ,
    trim: true
  },
  imageCover: {
    type: String ,
    required: [ true, ` Image required for every tour`]
  },
  images: [ String ] ,
  createdAt: {
    type: Date ,
    default: Date.now()
  },
  startDates: [ Date ]
});


const TourModel = mongoose.model( 'Tour' , tour );

module.exports = TourModel;