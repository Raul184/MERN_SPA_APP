const fs = require('fs');
//Router
const express = require('express');
const router= express.Router();
// const morgan = require('morgan');


const tours= JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// @Route           / 
// @Description     Get all tours
// @Access          Public
const getAllTours = (req , res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours
    }
  })
} 


// @Route           /:id 
// @Description     Get 1 tour
// @Access          Public
const getATour = (req , res) => {
  const idTour = tours.find( el => el.id === JSON.parse(req.params.id) )
  
  // First check for any malicious code
  // then
  if(!idTour){
    return res.status(404).json({
      msg: `Sorry , we couldn't find a tour under this id`
    })
  }
  res.status(200).json({
    status: 'Success',
    data: {
      idTour
    }
  });
}



// @Route           /:id 
// @Description     Update 1 tour
// @Access          Private
const updateTour = (req , res) => {
  const updatedTour = tours.find( el => el.id === JSON.parse(req.params.id) )
  // First check for any malicious code
  // then
  if(!updatedTour){
    return res.status(404).json({
      msg: `Sorry , we couldn't find a tour`
    })
  }
  const { 
    name , duration , maxGroupSize , difficulty , ratingsAverage , ratingsQuantity , price , 
    summary , description , imageCover , images , startDates
  } = req.body; 
  
  //first check for any malicious code
  // then
  if(name) { updatedTour.name = name}
  if(duration) { updatedTour.duration = duration}
  if(maxGroupSize) { updatedTour.maxGroupSize = maxGroupSize}
  if(difficulty) { updatedTour.difficulty = difficulty}
  if(ratingsAverage) { updatedTour.ratingsAverage = ratingsAverage}
  if(ratingsQuantity) { updatedTour.ratingsQuantity = ratingsQuantity}
  if(price) { updatedTour.price = price}
  if(summary) { updatedTour.summary = summary}
  if(description) { updatedTour.description = description}
  if(imageCover) { updatedTour.imageCover = imageCover}
  if(images) { updatedTour.images = images}
  if(startDates) { updatedTour.startDates = startDates}
  
  tours.map( (el , i) => {
    if( el.id === JSON.parse(req.params.id) ){
      tours[i] = updatedTour;
    } 
  })

  res.status(200).json({
    status: 'Success',
    msg: 'Tour updated'
  });
}


// @Route           /:id
// @Description     DELETE a  tour
// @Access          Private

const deleteTour = ( req , res ) => {
  if(req.params.id * 1 > tours.length ){
    res.status(404).json({
      msg: 'Invalid Id'
    })
  }
  tours = tours.filter(el => el.id !== JSON.parse(req.params.id) )
  fs.writeFile( 
    `${__dirname}/../dev-data/data/tours-simple.json` , 
    JSON.parse(tours) ,
    err => {
      res.status(200).json({ msg: "Tour deleted" })
    }
  )
}

// @Route           /:tour 
// @Description     Add a new tour
// @Access          Private
const addTour = (req , res) => {
  const nueId = tours[tours.length - 1].id + 1;
  const nueTour = Object.assign({ id: nueId} , req.body);
  tours.push(nueTour);
  
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json` , 
    JSON.parse(tours) , 
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: nueTour
        }
      })
    } 
  )
}
  
router.get( '/' , getAllTours )
router.get( '/:id' , getATour );
router.put( '/:id' , updateTour )
router.delete( '/:id' , deleteTour )
router.post( '/:tour' , addTour);
  
  

module.exports = router;